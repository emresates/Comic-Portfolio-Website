# Installation

Get the Comic Portfolio template running locally in a few minutes.

## Requirements

| Tool | Minimum version |
| --- | --- |
| Node.js | 18.18+ (20 LTS recommended) |
| npm | 9+ (or pnpm / yarn / bun) |

Check your versions:

```bash
node -v
npm -v
```

## 1. Install dependencies

From the project root:

```bash
npm install
```

This installs Next.js 16, React 19, next-intl, Tailwind CSS 4 and TypeScript.

## 2. Start the dev server

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)**. You will be redirected to the default locale (`/tr`).

The dev server uses Turbopack and supports hot reload — edits to components, `messages/*.json` and `src/config/site.ts` appear instantly.

## 3. Available scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm start` | Serve the production build (run `build` first) |
| `npm run lint` | Run ESLint |

## 4. Verify the build

Before deploying, always confirm a clean production build:

```bash
npm run build
```

You should see all locale routes (`/tr`, `/en`) and project/blog pages generated with no TypeScript errors.

## Next steps

- **[customization.md](./customization.md)** — brand name, colors, text
- **[projects.md](./projects.md)** — add/edit projects and case studies
- **[blog.md](./blog.md)** — write blog "issues"
- **[contact-form.md](./contact-form.md)** — connect the contact form to email
- **[deployment.md](./deployment.md)** — ship to production
