"use client";

import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";
import { getContent, type Lang } from "@/lib/content";
import { usePersistedLang } from "@/hooks/usePersistedLang";

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
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "12px 20px",
          background: "#FFD23F",
          borderBottom: "4px solid #1A1A2E",
          boxShadow: "0 4px 0 rgba(26,26,46,0.25)",
          flexWrap: "wrap",
        }}
      >
        <Link
          href={`/?lang=${lang}`}
          className="font-bangers"
          style={{
            fontSize: 28,
            letterSpacing: 2,
            background: "#D62828",
            color: "#fff",
            padding: "4px 14px",
            border: "3px solid #1A1A2E",
            borderRadius: 8,
            transform: "rotate(-2deg)",
            boxShadow: "3px 3px 0 #1A1A2E",
            textDecoration: "none",
          }}
        >
          EMRE!
        </Link>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <Link href={`/?lang=${lang}`} className="nav-link">
            {content.backBtn}
          </Link>
          <button
            type="button"
            className="lang-btn"
            onClick={() => setLang((p) => (p === "tr" ? "en" : "tr"))}
          >
            {content.langButton}
          </button>
        </div>
      </nav>

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
