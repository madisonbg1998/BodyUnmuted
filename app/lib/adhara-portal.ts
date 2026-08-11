import 'server-only';
import { cache } from 'react';
import { portalAuthUrl, portalUrl, portalWorkspaceUrl } from './adhara-auth';
import { REACTION_TYPES, type ReactionType } from './community-types';

export { REACTION_TYPES };
export type { ReactionType };

// ============================================================================
// Fetch helpers
//
// Reads degrade gracefully (empty result + console.error) so one broken
// section never crashes a whole page. Detail lookups return null on 404 so
// callers can `notFound()`. Mutations throw with a message pulled from
// Adhara's `detail` field, for Server Actions to catch and surface.
// ============================================================================

async function getJSON<T>(url: string, sessionToken: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${sessionToken}` },
      cache: 'no-store',
    });
    if (!response.ok) return fallback;
    return await response.json();
  } catch (error) {
    console.error(`Adhara portal fetch failed: ${url}`, error);
    return fallback;
  }
}

async function getJSONOrNull<T>(url: string, sessionToken: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${sessionToken}` },
      cache: 'no-store',
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error(`Adhara portal fetch failed: ${url}`, error);
    return null;
  }
}

async function mutateJSON<T>(
  url: string,
  method: 'POST' | 'PATCH' | 'DELETE',
  opts: { sessionToken?: string; body?: unknown } = {}
): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (opts.sessionToken) headers.Authorization = `Bearer ${opts.sessionToken}`;

  const response = await fetch(url, {
    method,
    headers,
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorText = await response.text();
    let detail = '';
    try {
      detail = JSON.parse(errorText)?.detail ?? '';
    } catch {
      // Non-JSON error body — fall through to the generic message.
    }
    throw new Error(detail || `Request failed (${response.status})`);
  }

  if (response.status === 204) return undefined as T;
  return response.json();
}

// ============================================================================
// Feature flags (public, no auth) — the same map Adhara itself uses to decide
// what's on for this workspace. Defaults to everything enabled on fetch
// failure (no live credentials, dev/bypass mode) so local work isn't blocked.
// ============================================================================

export interface PortalFeatures {
  learning_center: boolean;
  certificates: boolean;
  quizzes: boolean;
  community: boolean;
  member_directory: boolean;
  direct_messages: boolean;
  live_events: boolean;
  leaderboards: boolean;
  gamification: boolean;
  resource_library: boolean;
  blog: boolean;
  podcast: boolean;
  video_libraries: boolean;
  shop: boolean;
  notes: boolean;
  bookmarks: boolean;
  search: boolean;
}

const DEFAULT_FEATURES: PortalFeatures = {
  learning_center: true,
  certificates: true,
  quizzes: true,
  community: true,
  member_directory: true,
  direct_messages: true,
  live_events: true,
  leaderboards: true,
  gamification: true,
  resource_library: true,
  blog: true,
  podcast: true,
  video_libraries: true,
  shop: true,
  notes: true,
  bookmarks: true,
  search: true,
};

export const fetchPortalFeatures = cache(async (): Promise<PortalFeatures> => {
  try {
    const response = await fetch(portalWorkspaceUrl('/settings'), { cache: 'no-store' });
    if (!response.ok) return DEFAULT_FEATURES;
    const data = await response.json();
    return { ...DEFAULT_FEATURES, ...(data.available_features ?? {}) };
  } catch (error) {
    console.error('Adhara portal features fetch failed', error);
    return DEFAULT_FEATURES;
  }
});

// ============================================================================
// Courses
// ============================================================================

export interface PortalCourseSummary {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  thumbnail_url?: string | null;
  instructor_name?: string | null;
  instructor_avatar_url?: string | null;
  access_type: string;
  progression_type: string;
  estimated_duration_minutes?: number | null;
  lesson_count: number;
  is_featured: boolean;
  published_at?: string | null;
}

export interface PortalLessonSummary {
  id: string;
  title: string;
  order: number;
  description?: string | null;
  estimated_duration_minutes?: number | null;
  video_type?: string | null;
  completion_type: string;
  is_preview: boolean;
}

export interface PortalCourseDetail extends PortalCourseSummary {
  instructor_bio?: string | null;
  lessons: PortalLessonSummary[];
}

export interface PortalLessonDetail {
  id: string;
  course_id: string;
  title: string;
  order: number;
  description?: string | null;
  content?: string | null;
  video_type?: string | null;
  video_url?: string | null;
  video_duration_seconds?: number | null;
  estimated_duration_minutes?: number | null;
  completion_type: string;
  completion_threshold: number;
  action_button_type?: string | null;
  action_button_label?: string | null;
  action_button_url?: string | null;
  is_preview: boolean;
}

export async function fetchCourses(sessionToken: string): Promise<PortalCourseSummary[]> {
  const data = await getJSON(portalUrl('/courses'), sessionToken, {
    courses: [] as PortalCourseSummary[],
    total: 0,
  });
  return data.courses;
}

export async function fetchCourseDetail(sessionToken: string, slug: string): Promise<PortalCourseDetail | null> {
  return getJSONOrNull(portalUrl(`/courses/${encodeURIComponent(slug)}`), sessionToken);
}

export async function fetchLessonDetail(
  sessionToken: string,
  slug: string,
  lessonId: string
): Promise<PortalLessonDetail | null> {
  return getJSONOrNull(
    portalUrl(`/courses/${encodeURIComponent(slug)}/lessons/${encodeURIComponent(lessonId)}`),
    sessionToken
  );
}

// ============================================================================
// Enrollments
// ============================================================================

export interface PortalLessonProgress {
  lesson_id: string;
  status: string;
  video_timestamp_seconds: number;
  video_percent_watched: number;
  time_spent_seconds: number;
  started_at?: string | null;
  completed_at?: string | null;
}

export interface PortalEnrollment {
  id: string;
  course_id: string;
  course: PortalCourseSummary;
  enrolled_at: string;
  started_at?: string | null;
  completed_at?: string | null;
  last_accessed_at?: string | null;
  progress_percent: number;
  completed_lessons: number;
  current_lesson_id?: string | null;
  enrollment_source: string;
  lesson_progress: PortalLessonProgress[];
}

export async function fetchMyEnrollments(sessionToken: string): Promise<PortalEnrollment[]> {
  const data = await getJSON(portalUrl('/enrollments'), sessionToken, {
    enrollments: [] as PortalEnrollment[],
    total: 0,
  });
  return data.enrollments;
}

export async function fetchEnrollmentByCourse(sessionToken: string, courseId: string): Promise<PortalEnrollment | null> {
  return getJSONOrNull(portalUrl(`/enrollments/course/${encodeURIComponent(courseId)}`), sessionToken);
}

export async function enrollInCourse(sessionToken: string, courseId: string): Promise<PortalEnrollment> {
  return mutateJSON(portalUrl('/enrollments'), 'POST', { sessionToken, body: { course_id: courseId } });
}

// Note: Adhara also exposes a PATCH endpoint on /enrollments/{id} for granular
// video-position/percent-watched autosave, but its exact path wasn't verified
// during research, so it's deliberately not used here — lessons are marked
// complete via the endpoint below instead of continuously autosaving position.
export async function completeLesson(sessionToken: string, enrollmentId: string, lessonId: string): Promise<void> {
  await mutateJSON(
    portalUrl(`/enrollments/${encodeURIComponent(enrollmentId)}/lessons/${encodeURIComponent(lessonId)}/complete`),
    'POST',
    { sessionToken }
  );
}

// ============================================================================
// Onboarding
// ============================================================================

export interface OnboardingStatus {
  customer_id: string;
  onboarding_completed: boolean;
  skipped: boolean;
  current_step: string;
  steps_completed: Record<string, boolean>;
  progress_percentage: number;
  next_step?: string | null;
  collected_data: Record<string, unknown>;
  started_at?: string | null;
  completed_at?: string | null;
}

export interface OnboardingStepResult {
  step_completed: string;
  next_step?: string | null;
  progress_percentage: number;
  onboarding_completed: boolean;
}

export async function fetchOnboardingStatus(sessionToken: string): Promise<OnboardingStatus | null> {
  return getJSONOrNull(portalUrl('/onboarding/status'), sessionToken);
}

export async function submitWelcomeStep(
  sessionToken: string,
  data: { name?: string; avatar_url?: string; headline?: string }
): Promise<OnboardingStepResult> {
  return mutateJSON(portalUrl('/onboarding/welcome'), 'POST', { sessionToken, body: data });
}

export async function submitAboutStep(
  sessionToken: string,
  data: { bio?: string; location?: string; timezone?: string }
): Promise<OnboardingStepResult> {
  return mutateJSON(portalUrl('/onboarding/about'), 'POST', { sessionToken, body: data });
}

export async function submitSocialStep(
  sessionToken: string,
  socialLinks: Record<string, string>
): Promise<OnboardingStepResult> {
  return mutateJSON(portalUrl('/onboarding/social'), 'POST', { sessionToken, body: { social_links: socialLinks } });
}

export async function submitPreferencesStep(
  sessionToken: string,
  data: { theme?: string; email_notifications?: boolean; push_notifications?: boolean; digest_frequency?: string }
): Promise<OnboardingStepResult> {
  return mutateJSON(portalUrl('/onboarding/preferences'), 'POST', { sessionToken, body: data });
}

export async function completeOnboarding(sessionToken: string): Promise<OnboardingStepResult> {
  return mutateJSON(portalUrl('/onboarding/complete'), 'POST', { sessionToken });
}

export async function skipOnboarding(sessionToken: string, reason?: string): Promise<OnboardingStepResult> {
  return mutateJSON(portalUrl('/onboarding/skip'), 'POST', { sessionToken, body: reason ? { reason } : {} });
}

// ============================================================================
// Community
// ============================================================================

export interface CommunityAuthor {
  id: string;
  name: string;
  avatar_url?: string | null;
  headline?: string | null;
  is_team_member: boolean;
  badge_label?: string | null;
  badge_color?: string | null;
}

export interface CommunityAttachment {
  type: 'image' | 'file' | 'video';
  url: string;
  name: string;
  size?: number | null;
  mime_type?: string | null;
}

export interface CommunityReactionSummary {
  total: number;
  by_type: Record<string, number>;
  user_reaction?: string | null;
}

export interface CommunityPost {
  id: string;
  workspace_id: string;
  space_id: string;
  parent_post_id?: string | null;
  author: CommunityAuthor;
  title?: string | null;
  content: string;
  content_html?: string | null;
  attachments: CommunityAttachment[];
  is_pinned: boolean;
  is_locked: boolean;
  is_hidden: boolean;
  is_edited: boolean;
  reply_count: number;
  reaction_count: number;
  view_count: number;
  reactions: CommunityReactionSummary;
  created_at: string;
  updated_at: string;
  last_activity_at: string;
  recent_replies: CommunityPost[];
}

export interface CommunityPostDetail extends CommunityPost {
  replies: CommunityPost[];
  total_replies: number;
}

export interface CommunitySpace {
  id: string;
  workspace_id: string;
  course_id?: string | null;
  name: string;
  slug: string;
  description?: string | null;
  emoji?: string | null;
  space_type: string;
  min_tier_level: number;
  order: number;
  is_active: boolean;
  is_pinned: boolean;
  post_count: number;
  member_count: number;
  last_post_at?: string | null;
  can_access: boolean;
  can_post: boolean;
  can_reply: boolean;
}

export async function fetchCommunitySpaces(sessionToken: string): Promise<CommunitySpace[]> {
  const data = await getJSON(portalWorkspaceUrl('/community/spaces'), sessionToken, {
    spaces: [] as CommunitySpace[],
    total: 0,
  });
  return data.spaces;
}

export async function fetchSpacePosts(
  sessionToken: string,
  spaceId: string,
  cursor?: string
): Promise<{ posts: CommunityPost[]; hasMore: boolean; nextCursor: string | null }> {
  const params = new URLSearchParams({ limit: '20' });
  if (cursor) params.set('cursor', cursor);
  const data = await getJSON(
    portalWorkspaceUrl(`/community/spaces/${encodeURIComponent(spaceId)}/posts?${params}`),
    sessionToken,
    { posts: [] as CommunityPost[], total: 0, has_more: false, next_cursor: null as string | null }
  );
  return { posts: data.posts, hasMore: data.has_more, nextCursor: data.next_cursor };
}

export async function fetchPostDetail(sessionToken: string, postId: string): Promise<CommunityPostDetail | null> {
  return getJSONOrNull(portalWorkspaceUrl(`/community/posts/${encodeURIComponent(postId)}`), sessionToken);
}

export async function createCommunityPost(
  sessionToken: string,
  spaceId: string,
  content: string,
  title?: string
): Promise<CommunityPost> {
  return mutateJSON(portalWorkspaceUrl(`/community/spaces/${encodeURIComponent(spaceId)}/posts`), 'POST', {
    sessionToken,
    body: { content, title, attachments: [] },
  });
}

export async function createCommunityReply(sessionToken: string, postId: string, content: string): Promise<CommunityPost> {
  return mutateJSON(portalWorkspaceUrl(`/community/posts/${encodeURIComponent(postId)}/replies`), 'POST', {
    sessionToken,
    body: { content, attachments: [] },
  });
}

export async function addReaction(sessionToken: string, postId: string, reactionType: ReactionType): Promise<void> {
  await mutateJSON(portalWorkspaceUrl(`/community/posts/${encodeURIComponent(postId)}/reactions`), 'POST', {
    sessionToken,
    body: { reaction_type: reactionType },
  });
}

export async function removeReaction(sessionToken: string, postId: string): Promise<void> {
  await mutateJSON(portalWorkspaceUrl(`/community/posts/${encodeURIComponent(postId)}/reactions`), 'DELETE', {
    sessionToken,
  });
}

// ============================================================================
// Resources
// ============================================================================

export interface PortalResource {
  id: string;
  name: string;
  description?: string | null;
  file_type?: string | null;
  file_size?: number | null;
  thumbnail_url?: string | null;
  download_url: string;
  library_id?: string | null;
  library_name?: string | null;
}

export interface PortalResourceLibrary {
  id: string;
  name: string;
  description?: string | null;
  asset_count: number;
}

export async function fetchResources(
  sessionToken: string
): Promise<{ resources: PortalResource[]; libraries: PortalResourceLibrary[] }> {
  return getJSON(portalWorkspaceUrl('/resources?limit=50&offset=0'), sessionToken, {
    resources: [],
    libraries: [],
  });
}

export async function fetchResourceDownloadUrl(sessionToken: string, resourceId: string): Promise<string | null> {
  const data = await getJSONOrNull<{ download_url: string }>(
    portalWorkspaceUrl(`/resources/${encodeURIComponent(resourceId)}/download`),
    sessionToken
  );
  return data?.download_url ?? null;
}

// ============================================================================
// Certificates
// ============================================================================

export interface PortalCertificate {
  id: string;
  certificate_type: string;
  certificate_number: string;
  title: string;
  recipient_name: string;
  issued_by?: string | null;
  issued_at: string;
  completion_date: string;
  verification_url: string;
}

export interface PortalCertificateDetail extends PortalCertificate {
  background_image_url?: string | null;
  background_color: string;
  accent_color: string;
  title_text: string;
  subtitle_text?: string | null;
  body_text: string;
  footer_text?: string | null;
  signatory_name?: string | null;
  signatory_title?: string | null;
  signature_image_url?: string | null;
}

export async function fetchCertificates(sessionToken: string): Promise<PortalCertificate[]> {
  const data = await getJSON(portalUrl('/certificates'), sessionToken, {
    certificates: [] as PortalCertificate[],
    total: 0,
  });
  return data.certificates;
}

export async function fetchCertificateDetail(
  sessionToken: string,
  certificateId: string
): Promise<PortalCertificateDetail | null> {
  return getJSONOrNull(portalUrl(`/certificates/${encodeURIComponent(certificateId)}`), sessionToken);
}

// ============================================================================
// Memberships
// ============================================================================

export interface PortalTierSummary {
  id: string;
  name: string;
  slug: string;
  badge_label?: string | null;
  badge_color?: string | null;
  level: number;
}

export interface PortalMembership {
  id: string;
  tier: PortalTierSummary;
  status: string;
  started_at: string;
  expires_at?: string | null;
  is_trial: boolean;
  trial_ends_at?: string | null;
  trial_days_remaining?: number | null;
}

export async function fetchMemberships(
  sessionToken: string
): Promise<{ memberships: PortalMembership[]; currentTier: PortalTierSummary | null }> {
  const data = await getJSON(portalUrl('/me/memberships'), sessionToken, {
    memberships: [] as PortalMembership[],
    current_tier: null as PortalTierSummary | null,
  });
  return { memberships: data.memberships, currentTier: data.current_tier };
}

// ============================================================================
// Profile (extends the subset already covered by adhara-auth's AdharaCustomer)
// ============================================================================

export interface ProfileUpdateInput {
  name?: string;
  avatar_url?: string;
  headline?: string;
  bio?: string;
  location?: string;
  social_links?: Record<string, string>;
  profile_visibility?: string;
  show_in_directory?: boolean;
}

export async function updateProfile(sessionToken: string, data: ProfileUpdateInput): Promise<void> {
  await mutateJSON(portalUrl('/me'), 'PATCH', { sessionToken, body: data });
}

export async function deleteAccount(sessionToken: string): Promise<void> {
  await mutateJSON(portalUrl('/me'), 'DELETE', { sessionToken });
}

export async function requestPasswordReset(email: string): Promise<void> {
  await mutateJSON(portalAuthUrl('/forgot-password'), 'POST', { body: { email } });
}
