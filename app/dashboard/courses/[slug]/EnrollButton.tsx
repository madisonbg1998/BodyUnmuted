'use client';

import { useActionState } from 'react';
import { enrollInCourseAction, type CourseActionState } from '../actions';

const initialState: CourseActionState = { error: null, success: false };

export default function EnrollButton({ courseId, slug }: { courseId: string; slug: string }) {
  const boundAction = enrollInCourseAction.bind(null, courseId, slug);
  const [state, formAction, isPending] = useActionState(boundAction, initialState);

  return (
    <form action={formAction}>
      <button type="submit" className="btn-primary" disabled={isPending} style={{ opacity: isPending ? 0.6 : 1, cursor: isPending ? 'not-allowed' : 'pointer' }}>
        {isPending ? 'Enrolling…' : 'Enroll in Course'}
      </button>
      {state.error && <p style={{ color: '#b3261e', fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '13px', marginTop: '8px' }}>{state.error}</p>}
    </form>
  );
}
