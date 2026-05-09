# FinanceTracker

A personal finance tracking web app — landing page, login, and sign-up screens cloned from the user's own Vercel deployment at v0-financial-tracking-app-psi.vercel.app.

## Run & Operate

- `pnpm --filter @workspace/finance-tracker run dev` — run the frontend (port 19051, preview path `/finance-tracker/`)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, wouter (routing), lucide-react icons
- API: Express 5
- DB: PostgreSQL + Drizzle ORM (not yet used by frontend)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/finance-tracker/src/pages/Landing.tsx` — landing page
- `artifacts/finance-tracker/src/pages/Login.tsx` — login page
- `artifacts/finance-tracker/src/pages/SignUp.tsx` — sign-up page
- `artifacts/finance-tracker/src/index.css` — Tailwind + CSS variables (blue primary theme)
- `artifacts/api-server/src/` — Express API server

## Architecture decisions

- Frontend-only for now; no API calls are wired up yet (auth forms navigate locally)
- Uses Tailwind CSS with shadcn-style CSS variables for theming
- Blue primary color (`221.2 83.2% 53.3%`) matches the original v0 app
- Routing via wouter with `BASE_URL` prefix for Replit proxy compatibility

## Product

FinanceTracker lets users track income, expenses, savings, and investments across multiple bank and demat accounts with monthly/yearly analytics.

Pages:
- `/` — Landing page with hero, 6 feature cards, CTA
- `/auth/login` — Login form
- `/auth/sign-up` — Sign-up form

## User preferences

- User owns the original site at v0-financial-tracking-app-psi.vercel.app
- Goal: push code to GitHub — use Replit's built-in Git panel (left sidebar)

## Gotchas

- Frontend preview path is `/finance-tracker/` (not `/`)
- API server preview path is `/api`
