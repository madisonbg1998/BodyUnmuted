'use server';

import { revalidatePath } from 'next/cache';
import { getSessionToken } from '@/app/lib/adhara-auth';
import { completeLesson, enrollInCourse } from '@/app/lib/adhara-portal';

export interface CourseActionState {
  error: string | null;
  success: boolean;
}

const EXPIRED_SESSION: CourseActionState = { error: 'Your session has expired. Please log in again.', success: false };

export async function enrollInCourseAction(
  courseId: string,
  slug: string,
  _prevState: CourseActionState,
  _formData: FormData
): Promise<CourseActionState> {
  const sessionToken = await getSessionToken();
  if (!sessionToken) return EXPIRED_SESSION;

  try {
    await enrollInCourse(sessionToken, courseId);
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Could not enroll in this course.', success: false };
  }

  revalidatePath(`/dashboard/courses/${slug}`);
  revalidatePath('/dashboard/courses');
  revalidatePath('/dashboard');
  return { error: null, success: true };
}

export async function completeLessonAction(
  enrollmentId: string,
  lessonId: string,
  slug: string,
  _prevState: CourseActionState,
  _formData: FormData
): Promise<CourseActionState> {
  const sessionToken = await getSessionToken();
  if (!sessionToken) return EXPIRED_SESSION;

  try {
    await completeLesson(sessionToken, enrollmentId, lessonId);
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Could not mark this lesson complete.', success: false };
  }

  revalidatePath(`/dashboard/courses/${slug}`);
  revalidatePath(`/dashboard/courses/${slug}/lessons/${lessonId}`);
  revalidatePath('/dashboard');
  return { error: null, success: true };
}
