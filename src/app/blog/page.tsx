import { BlogIndex } from "@/components/BlogIndex";

export const metadata = {
  title: "Blog Issues — EMRE",
  description: "Comic-cover blog issues from Emre's frontend adventures.",
};

export default function BlogPage() {
  return <BlogIndex defaultLang="tr" />;
}
