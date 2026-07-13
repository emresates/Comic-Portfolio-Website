import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostView } from "@/components/BlogPostView";
import {
  getAllBlogSlugs,
  getBlogPost,
} from "@/lib/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post =
    getBlogPost(slug, "tr") ?? getBlogPost(slug, "en");
  if (!post) return { title: "Issue not found — EMRE" };
  return {
    title: `${post.title} — Issue #${post.issue} | EMRE`,
    description: post.blurb,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const tr = getBlogPost(slug, "tr");
  const en = getBlogPost(slug, "en");
  const post = tr ?? en;
  if (!post) notFound();

  return (
    <BlogPostView post={post} defaultLang={tr ? "tr" : "en"} />
  );
}
