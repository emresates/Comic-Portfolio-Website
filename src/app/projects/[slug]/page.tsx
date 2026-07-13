import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";
import { getProjectBySlug } from "@/lib/content";
import { PROJECT_SLUGS } from "@/lib/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug, "tr");
  if (!project) {
    return { title: "Proje bulunamadı — EMRE" };
  }
  return {
    title: `${project.title} — Case Study | EMRE`,
    description: project.detail,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug, "tr");
  if (!project) notFound();

  return <ProjectCaseStudy project={project} defaultLang="tr" />;
}
