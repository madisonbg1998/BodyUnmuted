'use client';

import { useActionState } from 'react';
import { createReplyAction, type CommunityActionState } from '@/app/dashboard/community/actions';

const initialState: CommunityActionState = { error: null, submittedAt: null };

export default function ReplyForm({ postId }: { postId: string }) {
  const boundAction = createReplyAction.bind(null, postId);
  const [state, formAction, isPending] = useActionState(boundAction, initialState);

  return (
    // Keying on submittedAt remounts the form (clearing the uncontrolled
    // textarea) each time a reply successfully lands, no effect required.
    <form
      key={state.submittedAt ?? 'idle'}
      action={formAction}
      style={{ backgroundColor: '#faf9f5', border: '1px solid rgba(206,150,90,0.28)', borderRadius: '12px', padding: '16px', marginTop: '16px' }}
    >
      <textarea
        name="content"
        rows={2}
        placeholder="Write a reply…"
        required
        style={{
          width: '100%',
          backgroundColor: '#fff',
          border: '1px solid rgba(45,21,6,0.2)',
          borderRadius: '4px',
          padding: '10px 14px',
          color: '#2d1506',
          fontFamily: 'var(--font-inter-sans), sans-serif',
          fontSize: '14px',
          resize: 'vertical',
          marginBottom: '10px',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button type="submit" className="btn-primary" disabled={isPending} style={{ opacity: isPending ? 0.6 : 1, cursor: isPending ? 'not-allowed' : 'pointer' }}>
          {isPending ? 'Replying…' : 'Reply'}
        </button>
        {state.error && <p style={{ color: '#b3261e', fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '13px' }}>{state.error}</p>}
      </div>
    </form>
  );
}
