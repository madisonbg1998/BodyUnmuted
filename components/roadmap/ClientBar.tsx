'use client';

// Ported near-verbatim from BU APP's src/components/ClientBar.tsx — only the
// data source changed (roster rows from the DB instead of in-memory state).
import { useState } from 'react';

export function ClientBar({
  clients,
  activeClientId,
  onSelect,
  onAdd,
  onRename,
  onDelete,
}: {
  clients: { id: string; name: string }[];
  activeClientId: string;
  onSelect: (id: string) => void;
  onAdd: (name: string) => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border-warm pb-3">
      <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-stone">Client</span>
      {clients.map((c) =>
        renamingId === c.id ? (
          <input
            key={c.id}
            autoFocus
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onBlur={() => {
              if (renameValue.trim()) onRename(c.id, renameValue.trim());
              setRenamingId(null);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
              if (e.key === 'Escape') setRenamingId(null);
            }}
            className="rounded-[4px] border border-stone px-3 py-1 text-sm outline-none"
          />
        ) : (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            onDoubleClick={() => {
              setRenamingId(c.id);
              setRenameValue(c.name);
            }}
            className={`group relative rounded-[4px] px-3 py-1 text-sm font-medium transition ${
              activeClientId === c.id ? 'bg-olive text-cream' : 'bg-cream-soft/60 text-espresso-soft hover:bg-cream-soft'
            }`}
            title="Click to select, double-click to rename"
          >
            {c.name}
            {clients.length > 1 && activeClientId === c.id && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Remove ${c.name} and all their roadmap data?`)) onDelete(c.id);
                }}
                className="ml-2 text-cream/60 hover:text-cream"
              >
                ×
              </span>
            )}
          </button>
        )
      )}

      {adding ? (
        <input
          autoFocus
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={() => {
            if (newName.trim()) onAdd(newName.trim());
            setNewName('');
            setAdding(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur();
            if (e.key === 'Escape') setAdding(false);
          }}
          placeholder="Client name"
          className="rounded-[4px] border border-stone px-3 py-1 text-sm outline-none"
        />
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="rounded-[4px] border border-dashed border-border-warm px-3 py-1 text-sm text-stone hover:border-stone hover:text-espresso-soft"
        >
          + Add client
        </button>
      )}
    </div>
  );
}
