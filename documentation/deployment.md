# Deployment

This is a standard Next.js 16 (App Router) application and deploys anywhere Next.js is supported. Vercel is the simplest option.

## Before you deploy

1. Update **`src/config/site.ts`** with your real domain in `seo.url`.
2. Confirm a clean production build:

```bash
npm run build
```

3. Set any environment variables your contact form needs (see **[contact-form.md](./contact-form.md)**).

## Deploy to Vercel (recommended)

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Vercel auto-detects Next.js. Defaults are correct:
   - Build command: `next build`
   - Output: handled automatically
4. Add environment variables (e.g. `RESEND_API_KEY`) under **Settings → Environment Variables**.
5. Deploy. Vercel gives you a `*.vercel.app` URL; add your custom domain under **Settings → Domains**.

## Deploy to Netlify

1. Import the repo in Netlify.
2. Build command: `npm run build`.
3. Install the official Next.js runtime/plugin when prompted.
4. Add environment variables under **Site settings → Environment variables**.

## Self-hosting (Node server)

```bash
npm install
npm run build
npm start        # serves on port 3000
```

Put it behind a reverse proxy (Nginx, Caddy) and a process manager (PM2, systemd). Set `PORT` to change the port.

### Docker (optional)

A minimal Dockerfile:

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

For smaller images, enable Next.js `output: "standalone"` in `next.config.ts` and copy only the standalone output.

## Environment variables

Set these in your host's dashboard (not in the repo):

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Contact form email (if using Resend) |
| `FORM_WEBHOOK_URL` | Contact form webhook (alternative) |

## Post-deploy checklist

- [ ] `/tr` and `/en` both load and switch correctly
- [ ] Project and blog pages render
- [ ] Contact form sends a real message
- [ ] Open Graph preview looks right (test with the social share debuggers)
- [ ] `seo.url` matches the live domain
