# Projects & Case Studies

Projects appear on the home page as cards (with a category filter and a detail modal) and each one has a dedicated case-study page at `/[locale]/projects/[slug]`.

A project is defined in **two coordinated places**:

1. **`src/lib/projects.ts`** — language-independent data: `slug`, links, category, and the case study.
2. **`messages/tr.json` & `messages/en.json`** — translatable text under the `projects.items` array.

> Order matters. The card text in `messages` is matched to the links in `projects.ts` **by array index**, so both lists must have the same length and the same order.

## 1. Links & category — `PROJECT_LINKS`

In `src/lib/projects.ts`:

```ts
export const PROJECT_LINKS: ProjectLinks[] = [
  {
    slug: "hizli-market",                              // URL slug (unique)
    demoUrl: "https://example.com/hizli-market",       // "Live demo" link ("#" to disable)
    githubUrl: "https://github.com/yourusername/...",  // "Code" link ("#" to disable)
    category: "ACTION",                                 // "ACTION" | "TECH" | "FUN"
  },
  // …
];
```

`category` powers the filter buttons on the projects section.

## 2. Card text — `messages/*.json`

Under the `projects` namespace, the `items` array holds the per-project text. Each entry (by index) corresponds to a `PROJECT_LINKS` entry:

```json
"projects": {
  "items": [
    {
      "slug": "hizli-market",
      "title": "Hızlı Market",
      "emoji": "🛒",
      "bg": "#D62828",
      "blurb": "Short one-line description shown on the card.",
      "detail": "Longer text shown in the modal / used for SEO description.",
      "tags": ["React", "Zustand"]
    }
  ]
}
```

Keep the `slug` identical to the one in `PROJECT_LINKS`, and add the matching entry to **both** `tr.json` and `en.json`.

## 3. Case study pages — `caseStudiesTr` / `caseStudiesEn`

Also in `src/lib/projects.ts`, each project can have a full case study keyed by slug:

```ts
const caseStudiesTr: Record<string, CaseStudy> = {
  "hizli-market": {
    bang: "KAPOW!",            // comic sound badge
    role: "Lead Frontend",
    year: "2023",
    summary: "One-paragraph overview of the project.",
    panels: [
      {
        label: "PROBLEM",       // panel category label
        title: "…",
        text: "…",
        bg: "#FF9F5A",          // panel background color
        rot: -1.2,              // slight rotation in degrees for the comic look
      },
      // typically 3 panels: Problem → Solution → Result
    ],
  },
};
```

Add the same slug to `caseStudiesEn` with translated text.

## Adding a new project

1. Append an entry to `PROJECT_LINKS` in `src/lib/projects.ts`.
2. Append a matching `items` entry (same index/slug) to **both** `messages/tr.json` and `messages/en.json`.
3. (Optional) Add a case study for the slug in `caseStudiesTr` and `caseStudiesEn`.
4. Run `npm run build` — the new `/[locale]/projects/<slug>` page is generated automatically via `generateStaticParams`.

## Removing a project

Delete its entry from `PROJECT_LINKS`, the `projects.items` arrays in both message files, and (if present) its case-study entries. Keep the arrays aligned by index.
