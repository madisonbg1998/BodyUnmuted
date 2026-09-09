'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { verifySession } from '@/app/lib/dal';
import { getOrCreateAppUser } from '@/app/lib/db/users';
import {
  createClient,
  deleteClient,
  renameClient,
  saveClientData,
  updateClientEmail,
} from '@/app/lib/roadmaps';
import type { ClientData } from '@/app/lib/roadmap/types';

export interface RoadmapActionState {
  error: string | null;
  success: boolean;
}

const NOT_COACH: RoadmapActionState = { error: 'Only the coach account can edit the roster.', success: false };

async function requireCoachId(): Promise<string | null> {
  const { user } = await verifySession();
  const appUser = await getOrCreateAppUser(user);
  return appUser.role === 'coach' ? appUser.id : null;
}

export async function createClientAction(
  _prevState: RoadmapActionState,
  formData: FormData
): Promise<RoadmapActionState> {
  const coachId = await requireCoachId();
  if (!coachId) return NOT_COACH;

  const name = String(formData.get('name') ?? '').trim();
  if (!name) return { error: 'Client name is required.', success: false };

  let clientId: string;
  try {
    clientId = (await createClient(coachId, name)).id;
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Could not add this client.', success: false };
  }

  revalidatePath('/dashboard/roadmaps');
  redirect(`/dashboard/roadmaps?client=${clientId}`);
}

export async function renameClientAction(
  clientId: string,
  _prevState: RoadmapActionState,
  formData: FormData
): Promise<RoadmapActionState> {
  const coachId = await requireCoachId();
  if (!coachId) return NOT_COACH;

  const name = String(formData.get('name') ?? '').trim();
  if (!name) return { error: 'Client name is required.', success: false };

  await renameClient(coachId, clientId, name);
  revalidatePath('/dashboard/roadmaps');
  return { error: null, success: true };
}

export async function updateClientEmailAction(
  clientId: string,
  _prevState: RoadmapActionState,
  formData: FormData
): Promise<RoadmapActionState> {
  const coachId = await requireCoachId();
  if (!coachId) return NOT_COACH;

  const email = String(formData.get('email') ?? '').trim();
  await updateClientEmail(coachId, clientId, email || null);
  revalidatePath('/dashboard/roadmaps');
  return { error: null, success: true };
}

export async function deleteClientAction(
  clientId: string,
  _prevState: RoadmapActionState,
  _formData: FormData
): Promise<RoadmapActionState> {
  const coachId = await requireCoachId();
  if (!coachId) return NOT_COACH;

  await deleteClient(coachId, clientId);
  revalidatePath('/dashboard/roadmaps');
  redirect('/dashboard/roadmaps');
}

/**
 * Direct (non-form) Server Action used for the debounced autosave — called
 * as a plain async function from the client, not via useActionState/<form>,
 * since it fires on a timer rather than a user submit.
 */
export async function saveClientDataAction(clientId: string, data: ClientData): Promise<{ ok: boolean; error?: string }> {
  const coachId = await requireCoachId();
  if (!coachId) return { ok: false, error: 'Only the coach account can edit roadmaps.' };

  try {
    await saveClientData(coachId, clientId, data);
    revalidatePath('/dashboard/roadmap');
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Could not save changes.' };
  }
}
