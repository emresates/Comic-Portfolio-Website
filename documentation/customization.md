# Customization

Everything you need to make the template yours lives in three places:

1. **`src/config/site.ts`** — brand, contact, social links, SEO
2. **`messages/tr.json` / `messages/en.json`** — all on-page text
3. **`src/app/globals.css`** — colors, fonts, comic styles

## 1. Brand, contact & SEO

Open **`src/config/site.ts`**. This is the single source of truth for personal info:

```ts
export const siteConfig = {
  brand: "YOUR NAME",          // hero title + nav logo ("YOUR NAME!")
  role: "Frontend Developer",  // hero subtitle

  authorName: "Your Name",     // used in the footer copyright line
  copyrightYear: new Date().getFullYear(),

  email: "hello@example.com",  // the "Email" contact button

  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
  },

  seo: {
    title: "YOUR NAME — Frontend Developer",
    description: "…",
    url: "https://example.com",  // used for canonical / Open Graph
  },
};
```

Tips:

- Leave a social link empty (`""`) to **hide** that button automatically.
- `brand` is shown big in the hero and as the nav logo. `authorName` is used in the footer copyright.
- Set `seo.url` to your real domain so Open Graph / canonical URLs are correct.

## 2. On-page text (all languages)

All translatable copy lives in **`messages/tr.json`** and **`messages/en.json`**, grouped by section:

| Namespace | Section |
| --- | --- |
| `common` | footer, loader, language button, shared labels |
| `hero` | greeting bubble, intro text, CTA |
| `nav` | navigation menu items |
| `about` | about panels |
| `projects` | project cards + filters |
| `skills` | skill bars |
| `experience` | timeline items |
| `contact` | contact section + form labels |
| `blog` | blog index labels |
| `game` | Bug Squasher mini-game |

**Always edit both `tr.json` and `en.json`** so the two languages stay in sync (they must have the same keys).

### Placeholders

Some strings use placeholders that are filled at runtime — keep them intact:

- `hero.bubble`: `"Hi! I'm {name} 👋"` → `{name}` becomes `siteConfig.brand`
- `common.footerText`: `"© {year} {brand} — All rights reserved."` → filled from config

## 3. Colors & fonts

Theme colors and comic utility classes are defined in **`src/app/globals.css`** (Tailwind 4 `@theme`). Look for the custom color tokens such as `comic-red`, `comic-yellow`, `comic-teal`, `ink`, and the halftone/background utilities. Change the hex values there to re-skin the whole site.

Per-item colors (project card backgrounds, timeline dots, blog covers) are set in the data files — see **[projects.md](./projects.md)** and **[blog.md](./blog.md)**.

## 4. Adding a language

1. Add the locale code to `locales` in **`src/i18n/routing.ts`**.
2. Copy an existing message file to `messages/<locale>.json` and translate it.

`next-intl` handles routing (`/de`, `/fr`, …) and message loading automatically. To change the default language, update `defaultLocale` in the same file.

## 5. Favicon & static assets

Replace the files in `src/app/` (e.g. `favicon.ico`) and anything under `public/` with your own assets.
