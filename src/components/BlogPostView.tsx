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

export function BlogPostView({ post, defaultLang = "tr" }: BlogPostViewProps) {
  const { lang, setLang } = usePersistedLang(defaultLang);
  const content = getContent(lang);
  const localized =
    getBlogPosts(lang).find((p) => p.issue === post.issue) ?? post;

  return (
    <div
      className="font-comic"
      style={{
        background: "#F9E9C8",
        color: "#1A1A2E",
        minHeight: "100vh",
      }}
    >
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
        className="blog-post-cover"
        style={{ background: localized.coverBg }}
      >
        <div className="comic-cover__halftone" aria-hidden />
        <div style={{ position: "relative", zIndex: 1 }}>
          <span className="font-bangers blog-post-cover__issue">
            {content.issueLabel} #{localized.issue}
          </span>
          <div className="blog-post-cover__emoji">{localized.emoji}</div>
          <p className="font-luckiest blog-post-cover__bang">
            {localized.bang}
          </p>
          <h1 className="font-bangers blog-post-cover__title">
            {localized.title}
          </h1>
          <p className="blog-post-cover__date">{localized.date}</p>
        </div>
      </header>

      <article className="blog-post-body">
        {localized.body.map((para) => (
          <div key={para} className="blog-panel">
            <p>{para}</p>
          </div>
        ))}
        <div className="blog-post-tags">
          {localized.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <Link
          href={`/blog?lang=${lang}`}
          className="project-link-btn project-link-story"
        >
          {content.blogBack}
        </Link>
      </article>

      <footer
        className="font-bangers"
        style={{
          background: "#1A1A2E",
          color: "#FFD23F",
          textAlign: "center",
          padding: 20,
          fontSize: 18,
          letterSpacing: 2,
        }}
      >
        {content.footerText}
      </footer>
    </div>
  );
}
