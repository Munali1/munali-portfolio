# AGENTS.md

Quick navigation guide for this repo.

## Overview
- Framework: Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion
- Contact form: `src/app/api/contact/route.ts` (SMTP via Nodemailer)

## Key paths
- Home page content: `src/app/page.tsx`
- Contact form component: `src/components/ContactForm.tsx`
- Contact API route: `src/app/api/contact/route.ts`
- Public assets (CV, images): `public/`
- Styles/config: `postcss.config.mjs`, `tailwind.config.*` (if present)

## Environment
Set in `.env`:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_FROM`
- `CONTACT_TO`

## Common commands
```bash
npm install
npm run dev
```
