'use client';

import { useActionState } from 'react';
import { createPostAction, type CommunityActionState } from './actions';

const initialState: CommunityActionState = { error: null, submittedAt: null };

export default function CreatePostForm({ spaceId }: { spaceId: string }) {
  const boundAction = createPostAction.bind(null, spaceId);
  const [state, formAction, isPending] = useActionState(boundAction, initialState);

  return (
    // Keying on submittedAt remounts the form (clearing the uncontrolled
    // textarea) each time a post successfully lands, no effect required.
    <form
      key={state.submittedAt ?? 'idle'}
      action={formAction}
      style={{
        backgroundColor: '#faf9f5',
        border: '1px solid rgba(206,150,90,0.28)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px',
      }}
    >
      <textarea
        name="content"
        rows={3}
        placeholder="Share something with the community…"
        required
        style={{
          width: '100%',
          backgroundColor: '#fff',
          border: '1px solid rgba(45,21,6,0.2)',
          borderRadius: '4px',
          padding: '12px 14px',
          color: '#2d1506',
          fontFamily: 'var(--font-inter-sans), sans-serif',
          fontSize: '14px',
          resize: 'vertical',
          marginBottom: '12px',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button type="submit" className="btn-primary" disabled={isPending} style={{ opacity: isPending ? 0.6 : 1, cursor: isPending ? 'not-allowed' : 'pointer' }}>
          {isPending ? 'Posting…' : 'Post'}
        </button>
        {state.error && <p style={{ color: '#b3261e', fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '13px' }}>{state.error}</p>}
      </div>
    </form>
  );
}
