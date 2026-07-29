---
name: adhara-assistant
description: Build with the Adhara platform. Use this skill whenever the user asks to create, read, or manage Adhara content — blog posts, CRM leads/contacts, forms, commerce products, scheduling, media, and more. It teaches you to ask the Adhara Assistant how to do something, then perform it against the Adhara API with the user's API key.
---

# Building with Adhara

You can build features on the user's [Adhara](https://adhara.example.com) workspace over its REST API. This skill tells you how.

## Setup (one time)

The user must have these in their environment (e.g. a `.env` file loaded into the shell):

```bash
ADHARA_API_KEY=adhara_pk_xxxxxxxxxxxxxxxxxxxxxxxx   # create at Dashboard → Settings → API Keys
ADHARA_WORKSPACE_ID=your-workspace-id
ADHARA_BASE_URL=https://api.adharaweb.com
```

- The API key carries **scopes** — it can only do what those scopes allow. If a call returns `403`, the key is missing a scope; ask the user to add it.
- **Never** hard-code the key. Always read it from the environment. Never print it.

## The workflow: ask, then act

Adhara has a built-in **Assistant** that knows the whole API. Prefer asking it over guessing endpoints.

### Step 1 — Ask the Assistant *how*

```bash
curl -sS -X POST "$ADHARA_BASE_URL/api/v1/assistant/ask" \
  -H "X-API-Key: $ADHARA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"question": "How do I create a blog post with a cover image?"}'
```

It replies with the exact endpoint, the required scope, and an example request. (Each question uses a small amount of the workspace's AI credits.)

### Step 2 — Act on the answer

Take the endpoint + example from Step 1 and make the real call, e.g.:

```bash
curl -sS -X POST "$ADHARA_BASE_URL/api/v1/blog/posts" \
  -H "X-API-Key: $ADHARA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"title": "Hello", "content": "<p>...</p>", "status": "draft"}'
```

Then report what you did and link the created resource.

## What you can build

Blog posts · CRM contacts/leads · custom forms · commerce products & orders · scheduling links & bookings · media/assets · email templates & broadcasts · automations & webhooks · events · documents. When unsure whether something is possible or how it maps to the API, **ask the Assistant** (Step 1).

## Rules

- Ask the Assistant before inventing endpoints or fields — it's authoritative; your guesses aren't.
- Use the **smallest scope** that does the job.
- Confirm with the user before creating, updating, or deleting anything on their live workspace.
- Keep `ADHARA_API_KEY` in the environment; never commit or echo it.
