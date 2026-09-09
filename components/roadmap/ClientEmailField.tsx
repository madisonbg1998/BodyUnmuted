'use client';

// Lets the coach attach/edit the email a member will log in with so their
// roster row auto-links to that member's account (see getOrCreateAppUser in
// app/lib/db/users.ts, which runs the match on every login).
import { useState, useTransition } from 'react';
import { updateClientEmailAction } from '@/app/dashboard/roadmaps/actions';

const IDLE_STATE = { error: null, success: false };

// The coach page keys this component by clientId, so switching clients
// mounts a fresh instance seeded from the new `email` prop — no effect needed.
export function ClientEmailField({ clientId, email, linked }: { clientId: string; email: string | null; linked: boolean }) {
  const [value, setValue] = useState(email ?? '');
  const [, startTransition] = useTransition();

  function save() {
    const formData = new FormData();
    formData.set('email', value);
    startTransition(async () => {
      const result = await updateClientEmailAction(clientId, IDLE_STATE, formData);
      if (result.error) alert(result.error);
    });
  }

  return (
    <label className="flex flex-wrap items-center gap-2 text-xs text-stone-deep">
      <span className="font-semibold uppercase tracking-wide text-stone">Linked member email</span>
      <input
        type="email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={save}
        placeholder="client@example.com"
        className="rounded-[4px] border border-border-warm bg-paper px-2 py-1 text-sm text-espresso-soft outline-none focus:border-stone"
      />
      <span
        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
          linked ? 'bg-sage text-olive-deep' : 'bg-cream-soft text-stone-deep'
        }`}
      >
        {linked ? 'Linked' : 'Not linked yet'}
      </span>
    </label>
  );
}
