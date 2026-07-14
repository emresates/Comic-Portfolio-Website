# Comic Portfolio — Next.js Developer Portfolio Template

A bold, comic-book styled developer portfolio built with **Next.js 16**, **next-intl**, **Tailwind CSS 4** and **TypeScript**. Fully bilingual (TR / EN) out of the box, animated, responsive, and ready to make your own.

## Features

- Comic / halftone visual style with hand-crafted CSS art
- Bilingual routing (`/tr`, `/en`) powered by `next-intl` — add more languages easily
- Animated language switch (wipe transition) and page loader
- Sticky navigation with scroll-spy
- Sections: Hero, About, Projects (with case-study pages + modal), Skills, Experience, Contact
- Blog with comic-cover issue pages
- Interactive "Bug Squasher" mini-game with high-score persistence
- Working contact form with API route (honeypot + validation) ready to connect to any email provider
- SEO metadata + Open Graph, fully typed content

## Tech Stack

| Tool | Version |
| --- | --- |
| Next.js (App Router) | 16 |
| React | 19 |
| next-intl | 4 |
| Tailwind CSS | 4 |
| TypeScript | 5 |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # run the production server
```

## Make It Yours

Everything you need to rebrand lives in a couple of places.

### 1. Brand, contact & social links

Edit **`src/config/site.ts`** — this is the single source of truth for personal info:

```ts
export const siteConfig = {
  brand: "YOUR NAME",          // hero title + nav logo
  role: "Frontend Developer",  // hero subtitle
  authorName: "Your Name",     // copyright line
  copyrightYear: new Date().getFullYear(),
  email: "hello@example.com",  // contact button
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
  },
  seo: {
    title: "YOUR NAME — Frontend Developer",
    description: "…",
    url: "https://example.com",
  },
};
```

Leave a social link empty (`""`) to hide that button.

### 2. Section copy (all text)

All translatable copy lives in **`messages/tr.json`** and **`messages/en.json`**, organized by section (`hero`, `about`, `projects`, `skills`, `experience`, `contact`, `blog`, `game`, …). Edit both files to keep languages in sync.

### 3. Projects, case studies & blog

- Project links and categories: **`src/lib/projects.ts`** (`PROJECT_LINKS`), plus case-study content in the same file.
- Project text (titles, descriptions): the `projects` namespace in the message files.
- Blog posts: **`src/lib/blog.ts`**.

### 4. Colors & fonts

Theme colors and comic utility classes are defined in the Tailwind setup under **`src/app/globals.css`**.

## Adding a Language

1. Add the locale to `src/i18n/routing.ts` (`locales` array).
2. Create `messages/<locale>.json` (copy an existing file and translate).

`next-intl` handles the routing and message loading automatically.

## Contact Form

The form posts to `src/app/api/contact/route.ts`, which validates input and includes a honeypot. It currently logs submissions to the server console — swap the `console.info` block for your provider of choice (Resend, Formspree, Nodemailer, etc.).

## Project Structure

```
src/
├─ app/
│  ├─ [locale]/         # localized routes (home, blog, projects)
│  ├─ api/contact/      # contact form endpoint
│  └─ layout.tsx        # root layout + SEO metadata
├─ components/
│  └─ sections/         # Hero, About, Projects, Skills, Experience, Contact
├─ config/site.ts       # ← your brand config
├─ i18n/                # next-intl routing / navigation / request
├─ lib/                 # content, projects, blog data helpers
messages/               # tr.json / en.json translations
```

## License

Released under the MIT License — see [LICENSE](./LICENSE).
