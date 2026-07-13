"use client";

import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";
import { getContent, type Lang } from "@/lib/content";
import { usePersistedLang } from "@/hooks/usePersistedLang";
import { SiteNav } from "./SiteNav";

type BlogIndexProps = {
  defaultLang?: Lang;
};

export function BlogIndex({ defaultLang = "tr" }: BlogIndexProps) {
  const { lang, setLang } = usePersistedLang(defaultLang);
  const content = getContent(lang);
  const posts = getBlogPosts(lang);

  return (
    <div className="min-h-screen bg-cream font-body text-ink">
      <SiteNav
        brandHref={`/?lang=${lang}`}
        langButton={content.langButton}
        onToggleLang={() => setLang((p) => (p === "tr" ? "en" : "tr"))}
        items={[
          { label: content.backBtn, href: `/?lang=${lang}` },
          { label: content.blogNav, href: `/blog?lang=${lang}`, isActive: true },
        ]}
      />

      <header className="border-b-[6px] border-ink bg-comic-teal bg-halftone-red px-6 py-16 text-center max-[760px]:px-4 max-[760px]:py-12">
        <p className="m-0 mb-3 inline-block -rotate-[3deg] rounded-[10px] border-[3px] border-ink bg-comic-yellow px-3.5 py-1.5 font-stamp text-2xl text-comic-red shadow-[3px_3px_0_#1a1a2e]">
          {content.blogBang}
        </p>
        <h1 className="m-0 mb-2.5 font-display text-[clamp(42px,8vw,72px)] tracking-[3px] text-comic-yellow text-stroke-ink-lg [text-shadow:5px_5px_0_#1a1a2e]">
          {content.blogTitle}
        </h1>
        <p className="mx-auto m-0 max-w-[480px] text-lg font-bold text-white [text-shadow:2px_2px_0_#1a1a2e]">
          {content.blogSub}
        </p>
      </header>

      <section className="mx-auto max-w-[1100px] px-6 py-12 pb-18 max-[760px]:px-4 max-[760px]:py-8 max-[760px]:pb-14">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}?lang=${lang}`}
              className="relative flex min-h-[340px] flex-col overflow-hidden rounded-lg border-[5px] border-ink p-[18px] text-white no-underline shadow-[8px_8px_0_#1a1a2e] transition-[transform,box-shadow] duration-[120ms] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:-rotate-1 hover:text-white hover:shadow-[12px_12px_0_#1a1a2e] max-[760px]:min-h-[300px]"
              style={{ background: post.coverBg }}
            >
              <span className="self-start rounded-md bg-ink px-2.5 py-0.5 font-display text-sm tracking-wide text-comic-yellow">
                {content.issueLabel} #{post.issue}
              </span>
              <span className="my-[18px] mb-2 text-center text-[64px] drop-shadow-[3px_3px_0_#1a1a2e]">
                {post.emoji}
              </span>
              <span className="absolute right-3 top-14 rotate-[8deg] rounded-lg border-[3px] border-ink bg-comic-yellow px-2.5 py-1 font-stamp text-lg text-comic-red shadow-[3px_3px_0_#1a1a2e]">
                {post.bang}
              </span>
              <h2 className="m-0 mb-2 font-display text-[28px] tracking-[1.5px] text-comic-yellow text-stroke-ink [text-shadow:3px_3px_0_#1a1a2e]">
                {post.title}
              </h2>
              <p className="m-0 mb-auto text-[15px] font-bold leading-snug text-white [text-shadow:1px_1px_0_#1a1a2e]">
                {post.blurb}
              </p>
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-2xl border-2 border-ink bg-comic-yellow px-2.5 py-0.5 text-xs font-bold text-ink"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="bg-ink px-5 py-5 text-center font-display text-lg tracking-[2px] text-comic-yellow">
        {content.footerText}
      </footer>
    </div>
  );
}
