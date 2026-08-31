import { NextRequest, NextResponse } from 'next/server';
import { validateEmail } from '@/app/lib/adhara-forms';
import { subscribeToConvertKit, subscribeToConvertKitSequence } from '@/app/lib/convertkit';
import { RESULT_TYPES } from '@/app/lib/ffa/types';
import type { ResultType } from '@/app/lib/ffa/types';

/**
 * Server-side landing point for the Freedom Fitness Audit's real lead
 * capture (see app/lib/ffa/adapters/convertkitLeadAdapter.ts, the client-side
 * caller).
 *
 * Two things happen on submit:
 *   1. Subscribe to one shared Kit form, with the quiz result sent as a
 *      custom field (`quiz_result`, and `quiz_secondary_result` when set) —
 *      create matching custom fields in the Kit account first, or Kit will
 *      silently ignore unrecognized field keys.
 *   2. Enroll directly into the Kit sequence matching her primary result, if
 *      one is configured (CONVERTKIT_FFA_SEQUENCE_ID_A/B/C/D). Kit's API has
 *      no endpoint to create/configure a visual automation, so this is how
 *      per-result email content actually gets sent — one sequence per
 *      result type, enrolled directly by this route, no automation needed.
 *      Results without a configured sequence ID are skipped (not an error)
 *      so this works incrementally as each sequence gets built.
 */
const SEQUENCE_ID_ENV_VAR: Record<ResultType, string> = {
  A: 'CONVERTKIT_FFA_SEQUENCE_ID_A',
  B: 'CONVERTKIT_FFA_SEQUENCE_ID_B',
  C: 'CONVERTKIT_FFA_SEQUENCE_ID_C',
  D: 'CONVERTKIT_FFA_SEQUENCE_ID_D',
};
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (typeof body.firstName !== 'string' || body.firstName.trim() === '') {
      return NextResponse.json({ error: 'Missing first name' }, { status: 400 });
    }
    if (typeof body.email !== 'string' || !validateEmail(body.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }
    if (!RESULT_TYPES.includes(body.primaryResult)) {
      return NextResponse.json({ error: 'Invalid primaryResult' }, { status: 400 });
    }
    if (body.secondaryResult !== undefined && !RESULT_TYPES.includes(body.secondaryResult)) {
      return NextResponse.json({ error: 'Invalid secondaryResult' }, { status: 400 });
    }

    const formId = process.env.CONVERTKIT_FFA_FORM_ID;
    if (!formId) {
      console.error('Missing CONVERTKIT_FFA_FORM_ID');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const fields: Record<string, string> = {
      quiz_result: body.primaryResult,
    };
    if (body.secondaryResult) fields.quiz_secondary_result = body.secondaryResult;

    const result = await subscribeToConvertKit(body.email, body.firstName, formId, fields);

    if (!result.ok) {
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 502 });
    }

    const primaryResult = body.primaryResult as ResultType;
    const sequenceId = process.env[SEQUENCE_ID_ENV_VAR[primaryResult]];
    if (sequenceId) {
      const sequenceResult = await subscribeToConvertKitSequence(body.email, body.firstName, sequenceId);
      if (!sequenceResult.ok) {
        console.error(`Failed to enroll in sequence for result ${primaryResult}`);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('FFA lead submission error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
