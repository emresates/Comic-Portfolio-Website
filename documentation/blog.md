# Blog

The blog is styled like a series of comic-book "issues". Posts are listed at `/[locale]/blog` and each one has its own page at `/[locale]/blog/[slug]`.

All blog content lives in **`src/lib/blog.ts`** — there are separate arrays for Turkish (`postsTr`) and English (`postsEn`).

## Post shape

```ts
export type BlogPost = {
  slug: string;      // URL slug (unique per language)
  issue: number;     // "issue #" — shared between TR/EN versions of a post
  date: string;      // ISO date, e.g. "2026-03-04"
  coverBg: string;   // cover background color (hex)
  emoji: string;     // big cover emoji
  tags: string[];    // topic tags
  title: string;     // post title
  blurb: string;     // one-line summary (list + SEO description)
  bang: string;      // comic sound badge, e.g. "THWIP!"
  body: string[];    // each string is a paragraph
};
```

## Adding a post

Add an entry to **both** `postsTr` and `postsEn` in `src/lib/blog.ts`:

```ts
const postsTr: BlogPost[] = [
  {
    slug: "yeni-yazi",
    issue: 13,
    date: "2026-04-01",
    coverBg: "#D62828",
    emoji: "✨",
    tags: ["CSS", "Animasyon"],
    title: "Yeni Yazı",
    blurb: "Kısa özet.",
    bang: "POW!",
    body: [
      "Birinci paragraf.",
      "İkinci paragraf.",
    ],
  },
  // …
];
```

Add the English version to `postsEn` with a **matching `issue` number** (this links the two language versions together).

## Linking TR ↔ EN versions

Because TR and EN posts have different slugs, the template maps them via `SLUG_PAIRS`:

```ts
const SLUG_PAIRS: [string, string][] = [
  ["css-orumbercek-hissi", "css-spider-sense"],
  // ["turkish-slug", "english-slug"],
];
```

Add a `[trSlug, enSlug]` pair for every post so the language switcher jumps to the correct translated article (via `getAltLangSlug`). If a pair is missing, switching language falls back to the blog index.

## How the pages are built

- `getBlogPosts(lang)` returns the list for a language.
- `getBlogPost(slug, lang)` fetches a single post.
- `getAllBlogSlugs()` feeds `generateStaticParams`, so every post is statically generated at build time.

After adding posts, run `npm run build` to generate the new pages.

## Removing a post

Delete the entry from `postsTr` and `postsEn`, and remove its pair from `SLUG_PAIRS`.
