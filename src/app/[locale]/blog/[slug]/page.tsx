import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { BlogPostView } from "@/components/BlogPostView";
import { routing, type Locale } from "@/i18n/routing";
import { getBlogPost, getBlogPosts } from "@/lib/blog";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getBlogPosts(locale).map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return { title: "Issue not found — EMRE" };
  }
  const post = getBlogPost(slug, locale);
  if (!post) return { title: "Issue not found — EMRE" };
  return {
    title: `${post.title} — Issue #${post.issue} | EMRE`,
    description: post.blurb,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const post = getBlogPost(slug, locale as Locale);
  if (!post) notFound();

  return <BlogPostView post={post} />;
}
