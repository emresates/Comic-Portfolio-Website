import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { getProjectBySlug } from "@/lib/content";
import { PROJECT_SLUGS } from "@/lib/projects";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PROJECT_SLUGS.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return { title: `Not found — ${siteConfig.brand}` };
  }
  const project = getProjectBySlug(slug, locale as Locale);
  if (!project) {
    return { title: `Not found — ${siteConfig.brand}` };
  }
  return {
    title: `${project.title} — Case Study | ${siteConfig.brand}`,
    description: project.detail,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const project = getProjectBySlug(slug, locale as Locale);
  if (!project) notFound();

  return <ProjectCaseStudy project={project} />;
}
