# InHouseOS Website

Production-ready public website package for InHouseOS, positioned as a restaurant back office operating system for restaurants and food service companies.

## Included

- Next.js public website
- Heavy animation and 3D interaction using Framer Motion and CSS transforms
- Real InHouseOS logo wired into the header, footer, favicon, app icons, and Open Graph image
- Single-page public flow: Platform, Modules, AI Briefs, Pricing, Contact
- `/admin` CRM login screen
- Inquiry API routes
- Supabase-ready CRM persistence
- Local demo fallback when Supabase is not configured
- Smoke tests for routing, favicon setup, module nav formatting, pricing copy, and screenshot-name exclusion

## Quick start

```bash
npm install
npm run dev
```

Open:

- Public site: `http://localhost:3000`
- Admin CRM: `http://localhost:3000/admin`

Default local admin password:

```txt
change-this-before-launch
```

Change this before launch by setting `ADMIN_PASSWORD`.

## Environment variables

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Set these before production:

```env
ADMIN_PASSWORD=replace-with-a-long-password
ADMIN_SESSION_SECRET=replace-with-a-long-random-secret
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Optional CRM persistence:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=replace-with-service-role-key
```

Without Supabase, the public inquiry form and admin CRM run in demo mode. With Supabase, inquiries persist through the API routes.

## Supabase CRM setup

1. Create a Supabase project.
2. Run `database/supabase-schema.sql` in the Supabase SQL editor.
3. Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to Vercel environment variables.
4. Redeploy.

The public form can create inquiries. Admin reads and updates inquiries through the protected Next.js API routes using the service role key.

## Deploy to Vercel

```bash
npm install
npm run test
npm run build
```

Then deploy the folder to Vercel. Add the environment variables above. Connect the custom domain from Vercel project settings.

## Notes

- Pricing intentionally says `Coming soon` / `Launching Soon` because the app is not launch-ready.
- The app UI is recreated with made-up operator names. It does not use names from the screenshots.
- The `/admin` page is functional as a password-protected CRM interface. For a hardened production admin, use a full auth provider when the product launches.
