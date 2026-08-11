import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSessionToken } from '@/app/lib/adhara-auth';
import { fetchCourseDetail, fetchEnrollmentByCourse } from '@/app/lib/adhara-portal';
import { verifySession } from '@/app/lib/dal';
import DashboardPanel from '@/components/DashboardPanel';
import EnrollButton from './EnrollButton';

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M7 10V7a5 5 0 0 1 10 0v3" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  await verifySession();
  const { slug } = await params;
  const sessionToken = await getSessionToken();
  const course = sessionToken ? await fetchCourseDetail(sessionToken, slug) : null;

  if (!course) notFound();

  const enrollment = sessionToken ? await fetchEnrollmentByCourse(sessionToken, course.id) : null;
  const isEnrolled = !!enrollment;
  const completedLessonIds = new Set(
    (enrollment?.lesson_progress ?? [])
      .filter((p) => p.status === 'completed' || p.completed_at)
      .map((p) => p.lesson_id)
  );

  return (
    <div style={{ padding: '48px 48px 64px' }}>
      <Link
        href="/dashboard/courses"
        style={{ fontFamily: 'var(--font-ibm-plex-sans), sans-serif', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ce965a', textDecoration: 'none' }}
      >
        ← My Courses
      </Link>

      <div style={{ marginTop: '20px', marginBottom: '32px', maxWidth: '800px' }}>
        <h1 style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: 'clamp(30px, 4.5vw, 44px)', lineHeight: '1.1', marginBottom: '12px' }}>
          {course.title}
        </h1>
        {course.description && (
          <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#45220d', fontSize: '15px', lineHeight: '1.6', marginBottom: '16px' }}>
            {course.description}
          </p>
        )}
        <p style={{ fontFamily: 'var(--font-ibm-plex-sans), sans-serif', color: 'rgba(45,21,6,0.55)', fontSize: '13px' }}>
          {course.lesson_count} lessons
          {course.estimated_duration_minutes ? ` · ~${course.estimated_duration_minutes} min` : ''}
          {course.instructor_name ? ` · Taught by ${course.instructor_name}` : ''}
        </p>

        {!isEnrolled && (
          <div style={{ marginTop: '24px' }}>
            <EnrollButton courseId={course.id} slug={slug} />
          </div>
        )}

        {isEnrolled && (
          <div style={{ marginTop: '20px', maxWidth: '400px' }}>
            <div style={{ height: '8px', borderRadius: '4px', backgroundColor: 'rgba(45,21,6,0.1)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${enrollment.progress_percent}%`, backgroundColor: '#525421', borderRadius: '4px' }} />
            </div>
            <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: 'rgba(45,21,6,0.6)', fontSize: '12px', marginTop: '6px' }}>
              {enrollment.completed_lessons} of {course.lesson_count} lessons complete
            </p>
          </div>
        )}
      </div>

      <div style={{ maxWidth: '800px' }}>
        <DashboardPanel title="Lessons">
          {course.lessons
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((lesson, i, arr) => {
              const isAccessible = isEnrolled || lesson.is_preview;
              const isComplete = completedLessonIds.has(lesson.id);
              const rowContent = (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '18px 24px',
                    borderBottom: i < arr.length - 1 ? '1px solid rgba(45,21,6,0.08)' : 'none',
                    opacity: isAccessible ? 1 : 0.55,
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: isComplete ? '#e8eeba' : 'rgba(45,21,6,0.08)',
                      color: isComplete ? '#525421' : '#45220d',
                      fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    {isComplete ? <CheckIcon /> : isAccessible ? String(i + 1).padStart(2, '0') : <LockIcon />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: '16px', lineHeight: '1.3' }}>{lesson.title}</p>
                    {lesson.description && (
                      <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: '#45220d', fontSize: '13px', opacity: 0.75, marginTop: '2px' }}>
                        {lesson.description}
                      </p>
                    )}
                  </div>
                  {lesson.estimated_duration_minutes && (
                    <p style={{ fontFamily: 'var(--font-ibm-plex-sans), sans-serif', color: 'rgba(45,21,6,0.5)', fontSize: '12px', flexShrink: 0 }}>
                      {lesson.estimated_duration_minutes} min
                    </p>
                  )}
                </div>
              );

              return isAccessible ? (
                <Link key={lesson.id} href={`/dashboard/courses/${slug}/lessons/${lesson.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                  {rowContent}
                </Link>
              ) : (
                <div key={lesson.id}>{rowContent}</div>
              );
            })}
        </DashboardPanel>
      </div>
    </div>
  );
}
