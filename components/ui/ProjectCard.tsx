"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Layers, Maximize2 } from "lucide-react";
import { Project } from "@/types";
import { getValidImageUrl, formatVideoEmbedUrl } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  onPlayVideo?: (videoUrl: string, title: string, category: string) => void;
}

export function ProjectCard({ project, onPlayVideo }: ProjectCardProps) {
  const [imgSrc, setImgSrc] = useState(getValidImageUrl(project.thumbnailUrl));

  const aiTools = project.technicalBreakdown?.aiToolsUsed || [];
  const metrics = project.metrics || [];

  return (
    <div className="group relative rounded-2xl glass-panel bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 transition-all duration-500 overflow-hidden flex flex-col h-full hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
      {/* Video Container with Autoplay */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        {project.videoUrl ? (
          <iframe
            src={formatVideoEmbedUrl(project.videoUrl, { autoplay: true, mute: true, loop: true })}
            title={project.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="w-full h-full border-0"
          />
        ) : (
          <div className="relative w-full h-full">
            <Image
              src={imgSrc}
              alt={project.title}
              fill
              unoptimized
              onError={() =>
                setImgSrc("https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200")
              }
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Expand / Sound Button Overlay */}
        {project.videoUrl && onPlayVideo && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onPlayVideo(project.videoUrl!, project.title, project.category);
            }}
            title="Open in Fullscreen with Audio"
            className="absolute top-2.5 right-2.5 z-20 px-2 py-1 rounded-md text-[11px] font-mono font-medium flex items-center gap-1 bg-slate-950/80 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 border border-cyan-500/40 backdrop-blur-md transition-all shadow-md cursor-pointer"
          >
            <Maximize2 className="w-3 h-3" /> Full Sound
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] text-slate-400 font-mono mb-1 flex items-center gap-1.5 flex-wrap">
            <span>{project.role}</span>
            <span>•</span>
            <span className="truncate">{project.client}</span>
          </div>

          <h3 className="text-base sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors flex items-start justify-between gap-2">
            <span className="leading-snug">{project.title}</span>
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0 mt-0.5" />
          </h3>

          <p className="text-xs sm:text-sm text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Tools & Link */}
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/5 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {aiTools.slice(0, 2).map((tool, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5"
              >
                {tool}
              </span>
            ))}
          </div>

          <Link
            href={`/portfolio/${project.slug}`}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 shrink-0"
          >
            Details <Layers className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
