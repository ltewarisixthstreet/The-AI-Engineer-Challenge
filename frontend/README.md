# Mental Coach — Frontend

A Next.js 14 (App Router) + TailwindCSS chat UI that talks to the FastAPI backend in `../api/` and renders a "supportive mental coach" conversation.

## Prerequisites

- Node.js 18+ (you have v26 — `brew install node`)
- The backend running somewhere (locally or deployed). See `../api/README.md`.

## Local development

1. From this `frontend/` folder, install deps (already done if you followed the root setup):

   ```bash
   npm install
   ```

2. Copy the env example and point at your backend:

   ```bash
   cp .env.local.example .env.local
   # default value works if backend is on http://localhost:8000
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

   App runs at <http://localhost:3000>. The backend must be reachable at whatever `NEXT_PUBLIC_API_URL` is set to (default `http://localhost:8000`). The backend already has CORS open (`allow_origins=["*"]`) so this just works.

4. Production build (sanity check before deploy):

   ```bash
   npm run build && npm start
   ```

## Configuration

| Env var               | Purpose                                          | Default                  |
|-----------------------|--------------------------------------------------|--------------------------|
| `NEXT_PUBLIC_API_URL` | Base URL of the FastAPI backend (no trailing /). | `http://localhost:8000`  |

The frontend calls `${NEXT_PUBLIC_API_URL}/api/chat` with `POST { "message": string }` and expects `{ "reply": string }` — matching `../api/index.py`.

## Deploying to Vercel

The repo intentionally ships frontend and backend as **two separate Vercel projects** because the Python serverless function lives in `/api` at the repo root and Next.js lives in `/frontend`.

1. **Deploy the backend** (Python serverless):
   - From repo root: `vercel` (first time) then `vercel --prod`.
   - Set the `OPENAI_API_KEY` env var in the Vercel project settings.
   - Note the production URL, e.g. `https://your-api.vercel.app`.

2. **Deploy the frontend** (this folder):
   - From `frontend/`: `vercel` then `vercel --prod`.
   - In the Vercel project settings, add env var `NEXT_PUBLIC_API_URL=https://your-api.vercel.app`.
   - Redeploy so the env var is baked in.

## Notes / known issues

- `next@14.2.x` still shows the Dec 2025 advisory warning from npm; the fix landed on the 15.x line. Bumping to Next 15 is a fine follow-up but not required for the challenge.
- The chat is stateless — each turn is sent to the API as a single `message` field. Adding multi-turn memory or streaming are great follow-ups.