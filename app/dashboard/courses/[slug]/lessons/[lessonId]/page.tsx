import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSessionToken } from '@/app/lib/adhara-auth';
import { fetchCourseDetail, fetchEnrollmentByCourse, fetchLessonDetail } from '@/app/lib/adhara-portal';
import { verifySession } from '@/app/lib/dal';
import CompleteLessonButton from './CompleteLessonButton';

export default async function LessonPage({ params }: { params: Promise<{ slug: string; lessonId: string }> }) {
  await verifySession();
  const { slug, lessonId } = await params;
  const sessionToken = await getSessionToken();

  const lesson = sessionToken ? await fetchLessonDetail(sessionToken, slug, lessonId) : null;
  if (!lesson) notFound();

  const [course, enrollment] = sessionToken
    ? await Promise.all([fetchCourseDetail(sessionToken, slug), fetchEnrollmentByCourse(sessionToken, lesson.course_id)])
    : [null, null];

  const sortedLessons = (course?.lessons ?? []).slice().sort((a, b) => a.order - b.order);
  const currentIndex = sortedLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? sortedLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < sortedLessons.length - 1 ? sortedLessons[currentIndex + 1] : null;

  const isComplete = (enrollment?.lesson_progress ?? []).some(
    (p) => p.lesson_id === lesson.id && (p.status === 'completed' || p.completed_at)
  );

  const navLinkStyle: React.CSSProperties = { color: '#45220d', borderColor: '#45220d', textDecoration: 'none' };

  return (
    <div style={{ padding: '48px 48px 64px' }}>
      <Link
        href={`/dashboard/courses/${slug}`}
        style={{ fontFamily: 'var(--font-ibm-plex-sans), sans-serif', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ce965a', textDecoration: 'none' }}
      >
        ← {course?.title ?? 'Course'}
      </Link>

      <div style={{ maxWidth: '760px', marginTop: '20px' }}>
        <h1 style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: 'clamp(28px, 4vw, 38px)', lineHeight: '1.15', marginBottom: '12px' }}>
          {lesson.title}
        </h1>
        {lesson.description && (
          <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: 'rgba(45,21,6,0.6)', fontSize: '14px', marginBottom: '24px' }}>{lesson.description}</p>
        )}

        {lesson.video_url && (
          <video controls src={lesson.video_url} style={{ width: '100%', display: 'block', borderRadius: '12px', backgroundColor: '#000', marginBottom: '24px' }} />
        )}

        {lesson.content && (
          <p style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-inter-sans), sans-serif', color: '#45220d', fontSize: '15px', lineHeight: '1.7' }}>
            {lesson.content}
          </p>
        )}

        {lesson.action_button_url && lesson.action_button_label && (
          <a
            href={lesson.action_button_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-copper"
            style={{ textDecoration: 'none', display: 'inline-block', marginTop: '16px' }}
          >
            {lesson.action_button_label}
          </a>
        )}

        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid rgba(45,21,6,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            {prevLesson && (
              <Link href={`/dashboard/courses/${slug}/lessons/${prevLesson.id}`} className="btn-secondary" style={navLinkStyle}>
                ← Previous
              </Link>
            )}
            {nextLesson && (
              <Link href={`/dashboard/courses/${slug}/lessons/${nextLesson.id}`} className="btn-secondary" style={navLinkStyle}>
                Next →
              </Link>
            )}
          </div>

          {enrollment ? (
            isComplete ? (
              <p style={{ color: '#525421', fontFamily: 'var(--font-inter-sans), sans-serif', fontSize: '14px', fontWeight: 500 }}>✓ Completed</p>
            ) : (
              <CompleteLessonButton enrollmentId={enrollment.id} lessonId={lesson.id} slug={slug} />
            )
          ) : (
            <Link href={`/dashboard/courses/${slug}`} className="btn-primary" style={{ textDecoration: 'none' }}>
              Enroll to track progress
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
