/**
 * Central theme configuration.
 *
 * This is the ONLY file you need to edit to make the template your own:
 * brand name, role, contact email and social links are all read from here.
 * Section copy (hero text, projects, blog posts, ...) lives in `messages/*.json`.
 */
export const siteConfig = {
  /** Shown as the big hero title and (with a "!") as the nav logo. */
  brand: "YOUR NAME",
  /** Job title / tagline shown under the hero title. */
  role: "Frontend Developer",

  /** Name used in the copyright line. */
  authorName: "Your Name",
  /** Copyright year shown in the footer. */
  copyrightYear: new Date().getFullYear(),

  /** Primary contact email (used by the "Email" button). */
  email: "hello@example.com",

  /** Social links. Leave a value empty ("") to hide that button. */
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
  },

  /** SEO defaults. */
  seo: {
    title: "YOUR NAME — Frontend Developer",
    description:
      "A comic-book styled developer portfolio template built with Next.js, next-intl and Tailwind CSS.",
    /** Public site URL, used for canonical/OG metadata. */
    url: "https://example.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;
