import 'server-only';
import { and, eq } from 'drizzle-orm';
import { db } from './db/client';
import { appUsers, clientSnapshots, clients, lifeEvents, monthNotes, phases, roadmaps, trainingBounds } from './db/schema';
import type { ClientData, Duration, LifeEvent, Phase, RoadmapsByDuration, RosterClient } from './roadmap/types';

const DURATIONS: Duration[] = [3, 6, 12];

function isoFirstOfCurrentMonth(): string {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
}

function toRosterClient(row: typeof clients.$inferSelect): RosterClient {
  return { id: row.id, name: row.name, email: row.email, linked: row.memberUserId !== null };
}

async function assertOwnsClient(coachId: string, clientId: string): Promise<void> {
  const [row] = await db
    .select({ id: clients.id })
    .from(clients)
    .where(and(eq(clients.id, clientId), eq(clients.coachId, coachId)));
  if (!row) throw new Error('Client not found');
}

async function assembleClientData(clientId: string): Promise<ClientData> {
  const [snapshotRow] = await db.select().from(clientSnapshots).where(eq(clientSnapshots.clientId, clientId));
  const [boundsRow] = await db.select().from(trainingBounds).where(eq(trainingBounds.clientId, clientId));
  const roadmapRows = await db.select().from(roadmaps).where(eq(roadmaps.clientId, clientId));
  const lifeEventRows = await db.select().from(lifeEvents).where(eq(lifeEvents.clientId, clientId));

  const roadmapsByDuration = {} as RoadmapsByDuration;
  for (const duration of DURATIONS) {
    const roadmapRow = roadmapRows.find((r) => r.duration === duration);
    if (!roadmapRow) {
      roadmapsByDuration[duration] = { startDate: isoFirstOfCurrentMonth(), phases: [], monthNotes: {} };
      continue;
    }
    const [phaseRows, monthNoteRows] = await Promise.all([
      db.select().from(phases).where(eq(phases.roadmapId, roadmapRow.id)),
      db.select().from(monthNotes).where(eq(monthNotes.roadmapId, roadmapRow.id)),
    ]);
    const monthNotesRecord: Record<number, { goal: string }> = {};
    for (const note of monthNoteRows) monthNotesRecord[note.monthIndex] = { goal: note.goal };
    roadmapsByDuration[duration] = {
      startDate: roadmapRow.startDate,
      phases: phaseRows.map((p) => ({
        id: p.id,
        typeId: p.typeId as Phase['typeId'],
        label: p.label,
        color: p.color,
        border: p.border,
        text: p.textClass,
        startMonth: p.startMonth,
        endMonth: p.endMonth,
      })),
      monthNotes: monthNotesRecord,
    };
  }

  return {
    roadmaps: roadmapsByDuration,
    lifeEvents: lifeEventRows.map((e) => ({
      id: e.id,
      typeId: e.typeId as LifeEvent['typeId'],
      title: e.title,
      startDate: e.startDate,
      endDate: e.endDate,
      notes: e.notes,
    })),
    snapshot: { goals: snapshotRow?.goals ?? '', startingPoint: snapshotRow?.startingPoint ?? '' },
    trainingBounds: {
      ceiling: {
        daysPerWeek: boundsRow?.ceilingDaysPerWeek ?? '',
        sessionLength: boundsRow?.ceilingSessionLength ?? '',
      },
      floor: {
        daysPerWeek: boundsRow?.floorDaysPerWeek ?? '',
        sessionLength: boundsRow?.floorSessionLength ?? '',
      },
    },
  };
}

export async function getClientsForCoach(coachId: string): Promise<RosterClient[]> {
  const rows = await db.select().from(clients).where(eq(clients.coachId, coachId)).orderBy(clients.createdAt);
  return rows.map(toRosterClient);
}

export async function getClientWithData(
  coachId: string,
  clientId: string
): Promise<{ client: RosterClient; data: ClientData } | null> {
  const [row] = await db.select().from(clients).where(and(eq(clients.id, clientId), eq(clients.coachId, coachId)));
  if (!row) return null;
  return { client: toRosterClient(row), data: await assembleClientData(clientId) };
}

export async function getClientForMember(
  memberUserId: string
): Promise<{ client: RosterClient; data: ClientData } | null> {
  const [row] = await db.select().from(clients).where(eq(clients.memberUserId, memberUserId));
  if (!row) return null;
  return { client: toRosterClient(row), data: await assembleClientData(row.id) };
}

export async function createClient(coachId: string, name: string, email?: string | null): Promise<RosterClient> {
  const normalizedEmail = email?.trim().toLowerCase() || null;

  return db.transaction(async (tx) => {
    const [client] = await tx.insert(clients).values({ coachId, name: name.trim(), email: normalizedEmail }).returning();

    await tx.insert(clientSnapshots).values({ clientId: client.id });
    await tx.insert(trainingBounds).values({ clientId: client.id });

    const startDate = isoFirstOfCurrentMonth();
    await tx.insert(roadmaps).values(DURATIONS.map((duration) => ({ clientId: client.id, duration, startDate })));

    // If a member with this email already logged in before this roster row
    // existed, link immediately instead of waiting for their next login.
    if (normalizedEmail) {
      const [existingMember] = await tx.select().from(appUsers).where(eq(appUsers.email, normalizedEmail));
      if (existingMember) {
        await tx.update(clients).set({ memberUserId: existingMember.id }).where(eq(clients.id, client.id));
        client.memberUserId = existingMember.id;
      }
    }

    return toRosterClient(client);
  });
}

export async function renameClient(coachId: string, clientId: string, name: string): Promise<void> {
  await db
    .update(clients)
    .set({ name: name.trim(), updatedAt: new Date() })
    .where(and(eq(clients.id, clientId), eq(clients.coachId, coachId)));
}

export async function updateClientEmail(coachId: string, clientId: string, email: string | null): Promise<void> {
  const normalizedEmail = email?.trim().toLowerCase() || null;
  await db
    .update(clients)
    .set({ email: normalizedEmail, updatedAt: new Date() })
    .where(and(eq(clients.id, clientId), eq(clients.coachId, coachId)));
}

export async function deleteClient(coachId: string, clientId: string): Promise<void> {
  await db.delete(clients).where(and(eq(clients.id, clientId), eq(clients.coachId, coachId)));
}

/**
 * Persists an entire client's roadmap tool state (snapshot, training bounds,
 * all 3 roadmap durations' phases/notes, life events) in one transaction.
 * Mirrors BU APP's own architecture, where the whole ClientData tree was
 * written as a single blob on every debounced save — the UI here still holds
 * one in-memory ClientData and calls this once per debounce tick, it's just
 * spread across normalized tables instead of a jsonb column. Phase/life-event
 * rows are always deleted and reinserted rather than diffed: the Timeline and
 * LifeEventsTab UI always recompute their full arrays via pure functions, so
 * a full replace is simpler and safer than tracking per-row edits, and since
 * nothing re-fetches mid-session the fresh DB-generated ids never surface
 * until the next page load.
 */
export async function saveClientData(coachId: string, clientId: string, data: ClientData): Promise<void> {
  await assertOwnsClient(coachId, clientId);

  await db.transaction(async (tx) => {
    await tx
      .insert(clientSnapshots)
      .values({ clientId, ...data.snapshot })
      .onConflictDoUpdate({ target: clientSnapshots.clientId, set: data.snapshot });

    const boundsValues = {
      clientId,
      ceilingDaysPerWeek: data.trainingBounds.ceiling.daysPerWeek,
      ceilingSessionLength: data.trainingBounds.ceiling.sessionLength,
      floorDaysPerWeek: data.trainingBounds.floor.daysPerWeek,
      floorSessionLength: data.trainingBounds.floor.sessionLength,
    };
    await tx
      .insert(trainingBounds)
      .values(boundsValues)
      .onConflictDoUpdate({ target: trainingBounds.clientId, set: boundsValues });

    for (const duration of DURATIONS) {
      const roadmapData = data.roadmaps[duration];
      const [existingRoadmap] = await tx
        .select()
        .from(roadmaps)
        .where(and(eq(roadmaps.clientId, clientId), eq(roadmaps.duration, duration)));

      const roadmapId = existingRoadmap
        ? existingRoadmap.id
        : (await tx.insert(roadmaps).values({ clientId, duration, startDate: roadmapData.startDate }).returning())[0].id;

      if (existingRoadmap && existingRoadmap.startDate !== roadmapData.startDate) {
        await tx.update(roadmaps).set({ startDate: roadmapData.startDate }).where(eq(roadmaps.id, roadmapId));
      }

      await tx.delete(phases).where(eq(phases.roadmapId, roadmapId));
      if (roadmapData.phases.length > 0) {
        await tx.insert(phases).values(
          roadmapData.phases.map((p) => ({
            roadmapId,
            typeId: p.typeId,
            label: p.label,
            color: p.color,
            border: p.border,
            textClass: p.text,
            startMonth: p.startMonth,
            endMonth: p.endMonth,
          }))
        );
      }

      await tx.delete(monthNotes).where(eq(monthNotes.roadmapId, roadmapId));
      const noteEntries = Object.entries(roadmapData.monthNotes);
      if (noteEntries.length > 0) {
        await tx
          .insert(monthNotes)
          .values(noteEntries.map(([monthIndex, note]) => ({ roadmapId, monthIndex: Number(monthIndex), goal: note.goal })));
      }
    }

    await tx.delete(lifeEvents).where(eq(lifeEvents.clientId, clientId));
    if (data.lifeEvents.length > 0) {
      await tx.insert(lifeEvents).values(
        data.lifeEvents.map((e) => ({
          clientId,
          typeId: e.typeId,
          title: e.title,
          startDate: e.startDate,
          endDate: e.endDate,
          notes: e.notes,
        }))
      );
    }
  });
}
