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
          { label: content.backBtn, href: `/?lang=${lang}` },
          { label: content.blogNav, href: `/blog?lang=${lang}`, isActive: true },
        ]}
      />

      <header className="blog-hero">
        <p className="font-luckiest blog-hero__bang">{content.blogBang}</p>
        <h1 className="font-bangers blog-hero__title">{content.blogTitle}</h1>
        <p className="blog-hero__sub">{content.blogSub}</p>
      </header>

      <section className="blog-grid-wrap">
        <div className="blog-grid">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}?lang=${lang}`}
              className="blog-cover"
              style={{ background: post.coverBg }}
            >
              <span className="blog-cover__issue font-bangers">
                {content.issueLabel} #{post.issue}
              </span>
              <span className="blog-cover__emoji">{post.emoji}</span>
              <span className="blog-cover__bang font-luckiest">{post.bang}</span>
              <h2 className="font-bangers blog-cover__title">{post.title}</h2>
              <p className="blog-cover__blurb">{post.blurb}</p>
              <div className="blog-cover__tags">
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

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
