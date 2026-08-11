'use client';

import { useTransition } from 'react';
import { REACTION_TYPES, type ReactionType } from '@/app/lib/community-types';
import { addReactionAction, removeReactionAction } from './actions';

const EMOJI: Record<ReactionType, string> = {
  like: '👍',
  love: '❤️',
  celebrate: '🎉',
  insightful: '💡',
  support: '🤝',
  funny: '😄',
};

export default function ReactionPicker({
  postId,
  currentReaction,
  total,
}: {
  postId: string;
  currentReaction: string | null | undefined;
  total: number;
}) {
  const [isPending, startTransition] = useTransition();

  const handleClick = (type: ReactionType) => {
    startTransition(async () => {
      if (currentReaction === type) {
        await removeReactionAction(postId);
      } else {
        await addReactionAction(postId, type);
      }
    });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {REACTION_TYPES.map((type) => {
        const isActive = currentReaction === type;
        return (
          <button
            key={type}
            type="button"
            disabled={isPending}
            onClick={() => handleClick(type)}
            title={type}
            style={{
              background: isActive ? 'rgba(206,150,90,0.2)' : 'none',
              border: 'none',
              borderRadius: '6px',
              padding: '4px 6px',
              fontSize: '15px',
              cursor: isPending ? 'not-allowed' : 'pointer',
              opacity: isPending ? 0.6 : 1,
              lineHeight: 1,
            }}
          >
            {EMOJI[type]}
          </button>
        );
      })}
      {total > 0 && (
        <span style={{ fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '12px', color: 'rgba(45,21,6,0.5)', marginLeft: '4px' }}>{total}</span>
      )}
    </div>
  );
}
