"use client";

import Link from "next/link";
import { getBlogPosts, type BlogPost } from "@/lib/blog";
import { getContent, type Lang } from "@/lib/content";
import { usePersistedLang } from "@/hooks/usePersistedLang";
import { SiteNav } from "./SiteNav";

type BlogPostViewProps = {
  post: BlogPost;
  defaultLang?: Lang;
};

const storyLinkBtn =
  "inline-block rounded-[10px] border-[3px] border-ink bg-comic-yellow px-4 py-2 font-display text-base tracking-wide text-ink no-underline shadow-[3px_3px_0_#1a1a2e] transition-[transform,box-shadow,background,color] duration-[120ms] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-white hover:text-comic-red hover:shadow-[5px_5px_0_#1a1a2e]";

export function BlogPostView({ post, defaultLang = "tr" }: BlogPostViewProps) {
  const { lang, setLang } = usePersistedLang(defaultLang);
  const content = getContent(lang);
  const localized =
    getBlogPosts(lang).find((p) => p.issue === post.issue) ?? post;

  return (
    <div className="min-h-screen bg-cream font-body text-ink">
      <SiteNav
        brandHref={`/?lang=${lang}`}
        langButton={content.langButton}
        onToggleLang={() => setLang((p) => (p === "tr" ? "en" : "tr"))}
        items={[
          { label: content.blogBack, href: `/blog?lang=${lang}` },
          { label: content.backBtn, href: `/?lang=${lang}` },
        ]}
      />

      <header
        className="relative overflow-hidden border-b-[6px] border-ink px-6 py-14 pb-12 text-center max-[760px]:px-4 max-[760px]:py-10 max-[760px]:pb-9"
        style={{ background: localized.coverBg }}
      >
        <div className="pointer-events-none absolute inset-0 bg-halftone-dark" aria-hidden />
        <div className="relative z-1">
          <span className="mb-3 inline-block rounded-md bg-ink px-3 py-1 font-display tracking-wide text-comic-yellow">
            {content.issueLabel} #{localized.issue}
          </span>
          <div className="text-[72px] drop-shadow-[4px_4px_0_#1a1a2e]">
            {localized.emoji}
          </div>
          <p className="my-2 inline-block -rotate-[4deg] rounded-[10px] border-[3px] border-ink bg-comic-yellow px-3 py-1 font-stamp text-2xl text-comic-red shadow-[3px_3px_0_#1a1a2e]">
            {localized.bang}
          </p>
          <h1 className="my-2 font-display text-[clamp(36px,7vw,64px)] tracking-[2px] text-comic-yellow text-stroke-ink [text-shadow:4px_4px_0_#1a1a2e]">
            {localized.title}
          </h1>
          <p className="m-0 font-bold text-white [text-shadow:2px_2px_0_#1a1a2e]">
            {localized.date}
          </p>
        </div>
      </header>

      <article className="mx-auto max-w-[720px] px-6 py-12 pb-18 max-[760px]:px-4 max-[760px]:py-8 max-[760px]:pb-14">
        {localized.body.map((para) => (
          <div
            key={para}
            className="mb-4 rounded border-4 border-ink bg-white px-[22px] py-5 shadow-[5px_5px_0_#1a1a2e]"
          >
            <p className="m-0 text-[17px] font-bold leading-[1.55]">{para}</p>
          </div>
        ))}
        <div className="my-2 mb-6 flex flex-wrap gap-2">
          {localized.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-2xl border-2 border-ink bg-comic-yellow px-3 py-0.5 text-[13px] font-bold"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link href={`/blog?lang=${lang}`} className={storyLinkBtn}>
          {content.blogBack}
        </Link>
      </article>

      <footer className="bg-ink px-5 py-5 text-center font-display text-lg tracking-[2px] text-comic-yellow">
        {content.footerText}
      </footer>
    </div>
  );
}
