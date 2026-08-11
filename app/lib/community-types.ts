// Pure constants/types shared between client components (e.g. ReactionPicker)
// and the server-only adhara-portal.ts — deliberately has no 'server-only'
// import so client bundles can pull it in directly.
export const REACTION_TYPES = ['like', 'love', 'celebrate', 'insightful', 'support', 'funny'] as const;
export type ReactionType = (typeof REACTION_TYPES)[number];
