import Link from 'next/link';
import { getSessionToken } from '@/app/lib/adhara-auth';
import { fetchCourses, fetchMyEnrollments } from '@/app/lib/adhara-portal';
import { verifySession } from '@/app/lib/dal';
import DashboardPanel from '@/components/DashboardPanel';
import EmptyState from '@/components/EmptyState';

const eyebrowStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ibm-plex-sans), sans-serif',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#ce965a',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#faf9f5',
  border: '1px solid rgba(206,150,90,0.28)',
  borderRadius: '12px',
  padding: '20px',
  boxShadow: '0 4px 24px rgba(45,21,6,0.05)',
  textDecoration: 'none',
  display: 'block',
};

function BookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 6.5C10.5 5.3 8 4.5 4 4.5v13c4 0 6.5.8 8 2 1.5-1.2 4-2 8-2v-13c-4 0-6.5.8-8 2Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 6.5v13" strokeLinecap="round" />
    </svg>
  );
}

export default async function CoursesPage() {
  await verifySession();
  const sessionToken = await getSessionToken();
  const [enrollments, courses] = sessionToken
    ? await Promise.all([fetchMyEnrollments(sessionToken), fetchCourses(sessionToken)])
    : [[], []];

  const enrolledCourseIds = new Set(enrollments.map((e) => e.course_id));
  const browseCourses = courses.filter((c) => !enrolledCourseIds.has(c.id));

  return (
    <div style={{ padding: '48px 48px 64px' }}>
      <div style={{ marginBottom: '40px' }}>
        <p style={eyebrowStyle}>Learning</p>
        <h1
          style={{
            fontFamily: 'var(--font-instrument-serif), serif',
            color: '#2d1506',
            fontSize: 'clamp(32px, 5vw, 48px)',
            lineHeight: '1',
            fontWeight: 400,
          }}
        >
          My Courses
        </h1>
      </div>

      {enrollments.length === 0 && browseCourses.length === 0 ? (
        <div style={{ maxWidth: '700px' }}>
          <DashboardPanel>
            <EmptyState icon={<BookIcon />} title="No courses available yet" description="Check back soon — new courses will show up here." />
          </DashboardPanel>
        </div>
      ) : (
        <>
          {enrollments.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: '20px', marginBottom: '16px' }}>Continue Learning</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', maxWidth: '1100px' }}>
                {enrollments.map((enrollment) => (
                  <Link key={enrollment.id} href={`/dashboard/courses/${enrollment.course.slug}`} style={cardStyle}>
                    <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: '18px', marginBottom: '8px' }}>
                      {enrollment.course.title}
                    </p>
                    <div style={{ height: '6px', borderRadius: '3px', backgroundColor: 'rgba(45,21,6,0.1)', overflow: 'hidden', marginBottom: '8px' }}>
                      <div style={{ height: '100%', width: `${enrollment.progress_percent}%`, backgroundColor: '#525421', borderRadius: '3px' }} />
                    </div>
                    <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: 'rgba(45,21,6,0.55)', fontSize: '13px' }}>
                      {enrollment.completed_lessons} of {enrollment.course.lesson_count} lessons complete
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {browseCourses.length > 0 && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: '20px', marginBottom: '16px' }}>Browse Courses</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', maxWidth: '1100px' }}>
                {browseCourses.map((course) => (
                  <Link key={course.id} href={`/dashboard/courses/${course.slug}`} style={cardStyle}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(82,84,33,0.12)',
                        color: '#525421',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '14px',
                      }}
                    >
                      <BookIcon />
                    </div>
                    <p style={{ fontFamily: 'var(--font-instrument-serif), serif', color: '#2d1506', fontSize: '18px', marginBottom: '4px' }}>{course.title}</p>
                    {course.description && (
                      <p style={{ fontFamily: 'var(--font-inter-sans), sans-serif', color: 'rgba(45,21,6,0.6)', fontSize: '13px', lineHeight: '1.5' }}>
                        {course.description}
                      </p>
                    )}
                    <p style={{ fontFamily: 'var(--font-ibm-plex-sans), sans-serif', color: 'rgba(45,21,6,0.5)', fontSize: '12px', marginTop: '10px' }}>
                      {course.lesson_count} lessons
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
