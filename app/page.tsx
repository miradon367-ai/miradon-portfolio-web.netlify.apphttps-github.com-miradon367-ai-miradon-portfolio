"use client";

import React, { useState, useEffect } from "react";
import { getFeaturedProjects } from "@/lib/data";
import { SplitHero } from "@/components/home/SplitHero";
import { MetricsBanner } from "@/components/home/MetricsBanner";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProcessSummary } from "@/components/home/ProcessSummary";
import { ToolStack } from "@/components/home/ToolStack";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Project } from "@/types";

export default function HomePage() {
  const initialFeatured = getFeaturedProjects();
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>(initialFeatured);

  useEffect(() => {
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then((data) => {
        if (data.projects && Array.isArray(data.projects)) {
          setFeaturedProjects(data.projects.filter((p: Project) => p.featured));
        }
      })
      .catch((err) => console.error("Could not refresh home projects:", err));
  }, []);

  return (
    <div className="flex flex-col">
      <SplitHero />
      <MetricsBanner />
      <FeaturedProjects projects={featuredProjects} />
      <ServicesSection />
      <ProcessSummary />
      <ToolStack />
      <TestimonialsSection />
      <CtaBanner />
    </div>
  );
}
