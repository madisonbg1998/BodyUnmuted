import 'server-only';
import { sql } from 'drizzle-orm';
import type { AdharaCustomer } from '../adhara-auth';
import { getDb } from './client';
import { appUsers, clients } from './schema';

export type AppUser = typeof appUsers.$inferSelect;

const PREVIEW_CUSTOMER_ID = 'preview-user';

function coachEmailAllowlist(): Set<string> {
  return new Set(
    (process.env.ADHARA_COACH_EMAILS ?? '')
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  );
}

function resolveRole(customer: AdharaCustomer, email: string): 'coach' | 'member' {
  // The AUTH_BYPASS preview user always gets the coach view locally, even
  // before ADHARA_COACH_EMAILS is configured, so `npm run dev` exercises the
  // full coach flow out of the box.
  if (customer.id === PREVIEW_CUSTOMER_ID) return 'coach';
  return coachEmailAllowlist().has(email) ? 'coach' : 'member';
}

/**
 * Upserts the local app_users row for whoever verifySession() just resolved.
 * For real (non-preview) logins, also links any roster `clients` row whose
 * email matches this user's email — self-healing, works whether the coach
 * added the roster entry or the member signed up first.
 */
export async function getOrCreateAppUser(customer: AdharaCustomer): Promise<AppUser> {
  const db = getDb();
  const email = customer.email.trim().toLowerCase();
  const role = resolveRole(customer, email);

  const [user] = await db
    .insert(appUsers)
    .values({ adharaCustomerId: customer.id, email, name: customer.name, role })
    .onConflictDoUpdate({
      target: appUsers.adharaCustomerId,
      set: { email, name: customer.name, role, updatedAt: new Date() },
    })
    .returning();

  if (customer.id !== PREVIEW_CUSTOMER_ID) {
    await db
      .update(clients)
      .set({ memberUserId: user.id, updatedAt: new Date() })
      .where(sql`lower(${clients.email}) = ${email} and ${clients.memberUserId} is null`);
  }

  return user;
}
