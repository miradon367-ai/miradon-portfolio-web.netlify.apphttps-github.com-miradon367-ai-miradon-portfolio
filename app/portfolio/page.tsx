"use client";

import React, { useState, useEffect } from "react";
import { getProjects } from "@/lib/data";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { VideoModal } from "@/components/ui/VideoModal";
import { Sparkles, Layers, Search, Plus } from "lucide-react";
import { Project } from "@/types";
import Link from "next/link";

export default function PortfolioPage() {
  const initialProjects = getProjects();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeVideo, setActiveVideo] = useState<{
    url: string;
    title: string;
    category: string;
  } | null>(null);

  useEffect(() => {
    // Fetch live projects from disk API
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then((data) => {
        if (data.projects && Array.isArray(data.projects)) {
          setProjects(data.projects);
        }
      })
      .catch((err) => console.error("Could not refresh projects:", err));
  }, []);

  const categories = [
    "All",
    "AI Short Film",
    "AI Documentary",
    "AI Video & Film",
    "Software & Games",
    "Web Design & Dev",
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complete Project Archive</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Cinematic AI Works & Full-Stack Systems
            </h1>
            <p className="text-slate-400 text-lg mt-3">
              Explore detailed case studies across generative AI film trailers, interactive software loops, and luxury web design.
            </p>
          </div>

          <Link
            href="/admin"
            className="px-4 py-2.5 rounded-xl glass-panel bg-slate-900 border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 text-xs font-mono flex items-center gap-2 shrink-0 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" /> Add / Manage Projects
          </Link>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 pb-6 border-b border-white/5">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${selectedCategory === cat
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                  : "glass-panel bg-slate-900/60 text-slate-400 hover:text-white border border-white/5"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects & tools..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        ) : (
          <div className="text-center py-24 glass-panel rounded-3xl p-8 border border-white/5">
            <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No projects found</h3>
            <p className="text-slate-400 text-sm mt-1">
              Try adjusting your search query or filter category.
            </p>
          </div>
        )}
      </div>

      {/* Video Modal Instance */}
      {activeVideo && (
        <VideoModal
          isOpen={!!activeVideo}
          onClose={() => setActiveVideo(null)}
          videoUrl={activeVideo.url}
          title={activeVideo.title}
          category={activeVideo.category}
        />
      )}
    </div>
  );
}
