'use client';

import { useState } from 'react';

export default function ToggleSwitch({
  defaultChecked = false,
  label,
  name,
  onChange,
}: {
  defaultChecked?: boolean;
  label: string;
  /** When given, a hidden input mirrors the checked state as "on"/"off" so this participates in a <form action>. */
  name?: string;
  onChange?: (checked: boolean) => void;
}) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <>
      {name && <input type="hidden" name={name} value={checked ? 'on' : 'off'} />}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() =>
          setChecked((c) => {
            const next = !c;
            onChange?.(next);
            return next;
          })
        }
        style={{
          width: '42px',
          height: '24px',
          borderRadius: '999px',
          border: 'none',
          padding: '3px',
          cursor: 'pointer',
          backgroundColor: checked ? '#525421' : 'rgba(45,21,6,0.2)',
          transition: 'background-color 0.2s',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: checked ? 'flex-end' : 'flex-start',
        }}
      >
        <span
          style={{
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            display: 'block',
            transition: 'transform 0.2s',
          }}
        />
      </button>
    </>
  );
}
