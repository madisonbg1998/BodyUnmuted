'use client';

// Wires the ported ClientBar (pure UI, see ClientBar.tsx) to the coach roster
// Server Actions and to client-selection via the `?client=` URL param.
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { ClientBar } from './ClientBar';
import { createClientAction, renameClientAction, deleteClientAction } from '@/app/dashboard/roadmaps/actions';

const IDLE_STATE = { error: null, success: false };

export function RosterBar({
  clients,
  activeClientId,
}: {
  clients: { id: string; name: string }[];
  activeClientId: string;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  return (
    <ClientBar
      clients={clients}
      activeClientId={activeClientId}
      onSelect={(id) => router.push(`/dashboard/roadmaps?client=${id}`)}
      onAdd={(name) => {
        const formData = new FormData();
        formData.set('name', name);
        startTransition(async () => {
          const result = await createClientAction(IDLE_STATE, formData);
          if (result?.error) alert(result.error);
        });
      }}
      onRename={(id, name) => {
        const formData = new FormData();
        formData.set('name', name);
        startTransition(async () => {
          const result = await renameClientAction(id, IDLE_STATE, formData);
          if (result.error) alert(result.error);
          router.refresh();
        });
      }}
      onDelete={(id) => {
        startTransition(async () => {
          const result = await deleteClientAction(id, IDLE_STATE, new FormData());
          if (result?.error) alert(result.error);
        });
      }}
    />
  );
}
