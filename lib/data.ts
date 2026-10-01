import profileData from "@/data/profile.json";
import projectsData from "@/data/projects.json";
import servicesData from "@/data/services.json";
import testimonialsData from "@/data/testimonials.json";
import metricsData from "@/data/metrics.json";
import toolsData from "@/data/tools.json";
import { Profile, Project, Service, Testimonial, Metric, ToolCategory } from "@/types";

export function getProfile(): Profile {
  return profileData as Profile;
}

export function getProjects(): Project[] {
  return projectsData as Project[];
}

export function getFeaturedProjects(): Project[] {
  return (projectsData as Project[]).filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return (projectsData as Project[]).find((p) => p.slug === slug);
}

export function getServices(): Service[] {
  return servicesData as Service[];
}

export function getTestimonials(): Testimonial[] {
  return testimonialsData as Testimonial[];
}

export function getMetrics(): Metric[] {
  return metricsData as Metric[];
}

export function getTools(): ToolCategory[] {
  return toolsData as ToolCategory[];
}
