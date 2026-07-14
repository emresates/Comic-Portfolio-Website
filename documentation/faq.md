# FAQ

Common questions about the Comic Portfolio template.

## General

**Q: What tech stack does this use?**
Next.js 16 (App Router), React 19, next-intl 4, Tailwind CSS 4, TypeScript 5.

**Q: Do I need to know React to customize it?**
No — for text and branding you only edit `src/config/site.ts` and the `messages/*.json` files. React knowledge helps for deeper layout changes.

**Q: Is it responsive / mobile-friendly?**
Yes. All sections and the navigation adapt down to small screens.

## Languages / i18n

**Q: Which languages are included?**
Turkish (`tr`, default) and English (`en`).

**Q: How do I change the default language?**
Set `defaultLocale` in `src/i18n/routing.ts`.

**Q: How do I add another language?**
Add the code to `locales` in `src/i18n/routing.ts`, then create `messages/<locale>.json` (copy an existing file and translate). See **[customization.md](./customization.md)**.

**Q: Can I make it single-language?**
Yes — keep only one locale in `routing.ts`. Because routing is path-based (`/tr`, `/en`), a single locale still works, or you can adjust `localePrefix` in the routing config.

## Content

**Q: Where do I change my name, email and social links?**
`src/config/site.ts`. Empty a social link (`""`) to hide its button.

**Q: Where is the on-page text?**
`messages/tr.json` and `messages/en.json`. Edit both to keep languages in sync.

**Q: How do I add/remove projects?**
See **[projects.md](./projects.md)** — projects are defined in `src/lib/projects.ts` plus the `projects.items` array in the message files (matched by index).

**Q: How do I add blog posts?**
See **[blog.md](./blog.md)** — posts live in `src/lib/blog.ts`.

## Styling

**Q: How do I change the colors?**
Global theme colors are in `src/app/globals.css` (Tailwind `@theme`). Per-item colors (cards, timeline, blog covers) are in the data files.

**Q: Can I remove the comic style / animations?**
Yes, but it requires editing the components and `globals.css`. The comic look is the template's core identity.

**Q: How do I turn off the sound effects or the mini-game?**
Sound effects have a mute toggle in the nav. To remove the Bug Squasher game, delete the `<BugSquasher />` usage in `src/components/ComicPortfolio.tsx`.

## Contact form

**Q: Does the contact form actually send emails?**
By default it validates and logs to the server console. Connect a provider (Resend, Formspree, SMTP) — see **[contact-form.md](./contact-form.md)**.

**Q: Is there spam protection?**
Yes, a honeypot field plus server-side validation.

## Deployment

**Q: Where can I host it?**
Anywhere Next.js runs — Vercel (easiest), Netlify, or a self-hosted Node/Docker server. See **[deployment.md](./deployment.md)**.

**Q: The build fails — what should I check?**
Run `npm run build` locally, ensure Node 18.18+ / 20 LTS, and make sure `tr.json` and `en.json` have the same keys.

## Licensing

**Q: What license is the code under?**
MIT — see the `LICENSE` file. You are free to use it for personal and commercial projects.

**Q: Can I use it for client work?**
Yes.
