'use server';

import { revalidatePath } from 'next/cache';
import { getSessionToken } from '@/app/lib/adhara-auth';
import {
  addReaction,
  createCommunityPost,
  createCommunityReply,
  removeReaction,
  type ReactionType,
} from '@/app/lib/adhara-portal';

export interface CommunityActionState {
  error: string | null;
  // Set to Date.now() on a successful submit, otherwise unchanged. Lets a
  // form derive a fresh `key` straight from this state during render (to
  // remount and clear itself) without a useEffect+setState round-trip.
  submittedAt: number | null;
}

const EXPIRED_SESSION: CommunityActionState = {
  error: 'Your session has expired. Please log in again.',
  submittedAt: null,
};

export async function createPostAction(
  spaceId: string,
  prevState: CommunityActionState,
  formData: FormData
): Promise<CommunityActionState> {
  const sessionToken = await getSessionToken();
  if (!sessionToken) return EXPIRED_SESSION;

  const content = String(formData.get('content') || '').trim();
  if (!content) return { error: 'Write something before posting.', submittedAt: prevState.submittedAt };

  try {
    await createCommunityPost(sessionToken, spaceId, content, String(formData.get('title') || '').trim() || undefined);
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Could not post.', submittedAt: prevState.submittedAt };
  }

  revalidatePath('/dashboard/community');
  return { error: null, submittedAt: Date.now() };
}

export async function createReplyAction(
  postId: string,
  prevState: CommunityActionState,
  formData: FormData
): Promise<CommunityActionState> {
  const sessionToken = await getSessionToken();
  if (!sessionToken) return EXPIRED_SESSION;

  const content = String(formData.get('content') || '').trim();
  if (!content) return { error: 'Write a reply first.', submittedAt: prevState.submittedAt };

  try {
    await createCommunityReply(sessionToken, postId, content);
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Could not reply.', submittedAt: prevState.submittedAt };
  }

  revalidatePath(`/dashboard/community/posts/${postId}`);
  revalidatePath('/dashboard/community');
  return { error: null, submittedAt: Date.now() };
}

export async function addReactionAction(postId: string, reactionType: ReactionType): Promise<void> {
  const sessionToken = await getSessionToken();
  if (!sessionToken) return;
  await addReaction(sessionToken, postId, reactionType);
  revalidatePath('/dashboard/community');
  revalidatePath(`/dashboard/community/posts/${postId}`);
}

export async function removeReactionAction(postId: string): Promise<void> {
  const sessionToken = await getSessionToken();
  if (!sessionToken) return;
  await removeReaction(sessionToken, postId);
  revalidatePath('/dashboard/community');
  revalidatePath(`/dashboard/community/posts/${postId}`);
}
