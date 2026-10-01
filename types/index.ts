export interface Profile {
  name: string;
  alias: string;
  shortName: string;
  email: string;
  phone: string;
  primaryRole: string;
  tagline: string;
  bio: string;
  location: string;
  availability: string;
  image?: string;
  socials: {
    linkedin: string;
    github: string;
    twitter: string;
    youtube: string;
  };
  ctaText: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface TechnicalBreakdown {
  overview: string;
  pipeline: string[];
  aiToolsUsed: string[];
  techStack: string[];
  keyChallenges: string[];
  outcomes: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  type: string;
  client: string;
  role: string;
  year: string;
  featured: boolean;
  videoUrl?: string;
  thumbnailUrl: string;
  bannerUrl: string;
  summary: string;
  description: string;
  technicalBreakdown: TechnicalBreakdown;
  metrics: ProjectMetric[];
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  tagline: string;
  description: string;
  deliverables: string[];
  tools: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  projectReferenced: string;
  rating: number;
}

export interface Metric {
  id: string;
  value: string;
  label: string;
  context: string;
}

export interface ToolItem {
  name: string;
  role: string;
  badge: string;
}

export interface ToolCategory {
  category: string;
  items: ToolItem[];
}
