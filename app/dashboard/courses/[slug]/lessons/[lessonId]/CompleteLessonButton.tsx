'use client';

import { useActionState } from 'react';
import { completeLessonAction, type CourseActionState } from '@/app/dashboard/courses/actions';

const initialState: CourseActionState = { error: null, success: false };

export default function CompleteLessonButton({
  enrollmentId,
  lessonId,
  slug,
}: {
  enrollmentId: string;
  lessonId: string;
  slug: string;
}) {
  const boundAction = completeLessonAction.bind(null, enrollmentId, lessonId, slug);
  const [state, formAction, isPending] = useActionState(boundAction, initialState);

  return (
    <form action={formAction}>
      <button type="submit" className="btn-primary" disabled={isPending} style={{ opacity: isPending ? 0.6 : 1, cursor: isPending ? 'not-allowed' : 'pointer' }}>
        {isPending ? 'Saving…' : 'Mark Complete'}
      </button>
      {state.error && <p style={{ color: '#b3261e', fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '13px', marginTop: '8px' }}>{state.error}</p>}
    </form>
  );
}
