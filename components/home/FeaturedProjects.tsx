"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { VideoModal } from "@/components/ui/VideoModal";
import { Project } from "@/types";
import { ArrowRight, Sparkles } from "lucide-react";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeVideo, setActiveVideo] = useState<{
    url: string;
    title: string;
    category: string;
  } | null>(null);

  const categories = ["All", "AI Short Film", "AI Documentary", "AI Video & Film"];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section className="py-16 sm:py-24 relative" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-6 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Works &amp; Technical Breakdowns</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Featured Flagship Projects
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Exploring cutting-edge AI film trailers, interactive software, and modern web applications.
            </p>
          </div>

          {/* Category Filter — horizontally scrollable on mobile */}
          <div className="overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-2 glass-panel p-1.5 rounded-2xl bg-slate-900/60 border border-white/10 w-max sm:w-auto sm:flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${selectedCategory === cat
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onPlayVideo={(url, title, category) =>
                setActiveVideo({ url, title, category })
              }
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 sm:mt-14 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl glass-panel bg-slate-900 text-white font-semibold text-sm border border-white/10 hover:border-cyan-500/40 hover:bg-slate-800 transition-all shadow-lg"
          >
            <span>View Complete Project Archive</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </Link>
        </div>
      </div>

      {activeVideo && (
        <VideoModal
          isOpen={!!activeVideo}
          onClose={() => setActiveVideo(null)}
          videoUrl={activeVideo.url}
          title={activeVideo.title}
          category={activeVideo.category}
        />
      )}
    </section>
  );
}
