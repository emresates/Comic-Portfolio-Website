import type { ProjectLinks } from "@/lib/projects";

export type Lang = "tr" | "en";

export type AboutPanel = {
  icon: string;
  title: string;
  text: string;
  bg: string;
  rot: number;
};

export type ProjectBase = {
  title: string;
  emoji: string;
  bg: string;
  blurb: string;
  detail: string;
  tags: string[];
};

export type Project = ProjectBase & ProjectLinks;

export type Skill = {
  name: string;
  level: string;
  pct: string;
};

export type TimelineItem = {
  year: string;
  title: string;
  text: string;
  dotBg: string;
  rot: number;
};

export type NavItem = {
  label: string;
  href: string;
};

export type HeroContent = {
  heroBubble: string;
  heroRole: string;
  heroText: string;
  heroCta: string;
};

export type NavContent = {
  navItems: NavItem[];
  marqueeWords: string[];
};

export type AboutContent = {
  aboutTitle: string;
  aboutPanels: AboutPanel[];
};

export type ProjectsContent = {
  projectsTitle: string;
  projectsSub: string;
  projects: ProjectBase[];
  demoBtn: string;
  githubBtn: string;
  caseStudyBtn: string;
  backBtn: string;
  stripTitle: string;
  issueLabel: string;
  prevIssue: string;
  nextIssue: string;
  sequelCta: string;
  filterAll: string;
  filterAction: string;
  filterTech: string;
  filterFun: string;
};

export type SkillsContent = {
  skillsTitle: string;
  skills: Skill[];
};

export type TimelineContent = {
  timelineTitle: string;
  timeline: TimelineItem[];
};

export type ContactContent = {
  contactBang: string;
  contactTitle: string;
  contactText: string;
  formName: string;
  formEmail: string;
  formMessage: string;
  formSend: string;
  formSending: string;
  formSuccess: string;
  formError: string;
  formNamePh: string;
  formEmailPh: string;
  formMessagePh: string;
};

export type GameContent = {
  gameTitle: string;
  gameSub: string;
  gameStart: string;
  gameAgain: string;
  gameScore: string;
  gameHigh: string;
  gameTime: string;
  gameResult: string;
};

export type BlogContent = {
  blogTitle: string;
  blogSub: string;
  blogBang: string;
  blogBack: string;
  blogNav: string;
};

export type CommonContent = {
  langButton: string;
  footerText: string;
  loaderText: string;
  soundOnLabel: string;
  soundOffLabel: string;
  avatarHi: string;
};

export type Content = HeroContent &
  NavContent &
  AboutContent &
  ProjectsContent &
  SkillsContent &
  TimelineContent &
  ContactContent &
  GameContent &
  BlogContent &
  CommonContent;

export type ResolvedContent = Omit<Content, "projects"> & {
  projects: Project[];
};
