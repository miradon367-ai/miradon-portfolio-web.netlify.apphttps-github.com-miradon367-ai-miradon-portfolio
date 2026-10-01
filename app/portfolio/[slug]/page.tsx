"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug } from "@/lib/data";
import { VideoModal } from "@/components/ui/VideoModal";
import { AppointmentBookingModal } from "@/components/ui/AppointmentBookingModal";
import { Project } from "@/types";
import { getValidImageUrl, formatVideoEmbedUrl } from "@/lib/utils";
import {
  ArrowLeft,
  Play,
  Calendar,
  CheckCircle2,
  Sparkles,
  Layers,
  Wrench,
  AlertTriangle,
  Award,
  Terminal,
  Loader2,
} from "lucide-react";

export default function ProjectDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const initialProject = getProjectBySlug(slug);
  const [project, setProject] = useState<Project | undefined>(initialProject);
  const [loading, setLoading] = useState(!initialProject);
  const [imgSrc, setImgSrc] = useState<string>("");

  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then((data) => {
        if (data.projects && Array.isArray(data.projects)) {
          const match = data.projects.find((p: Project) => p.slug === slug);
          if (match) {
            setProject(match);
            setImgSrc(getValidImageUrl(match.bannerUrl || match.thumbnailUrl));
          }
        }
      })
      .catch((err) => console.error("Failed to fetch project:", err))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (project) {
      setImgSrc(getValidImageUrl(project.bannerUrl || project.thumbnailUrl));
    }
  }, [project]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 text-cyan-400">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-40 pb-24 text-center max-w-lg mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-2">Project Not Found</h2>
        <p className="text-slate-400 text-sm mb-6">
          The requested project could not be located in the portfolio archive.
        </p>
        <Link
          href="/portfolio"
          className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 relative">
      {/* Top Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Project Archive
        </Link>
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Project Header */}
        <div className="space-y-4 max-w-4xl mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              {project.category}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {project.type}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
            {project.summary}
          </p>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-y border-white/10 py-4 font-mono text-xs">
            <div>
              <span className="block text-slate-500 uppercase">Client / Brand</span>
              <span className="text-white font-semibold">{project.client}</span>
            </div>
            <div>
              <span className="block text-slate-500 uppercase">Role</span>
              <span className="text-cyan-400 font-semibold">{project.role}</span>
            </div>
            <div>
              <span className="block text-slate-500 uppercase">Year</span>
              <span className="text-white font-semibold">{project.year}</span>
            </div>
            <div>
              <span className="block text-slate-500 uppercase">Format</span>
              <span className="text-white font-semibold">4K UHD / Interactive</span>
            </div>
          </div>
        </div>

        {/* Media Player / Direct Video Embed */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-video w-full bg-slate-950 mb-12 sm:mb-16 border border-cyan-500/30 shadow-2xl shadow-cyan-950/30">
          {project.videoUrl ? (
            <iframe
              src={formatVideoEmbedUrl(project.videoUrl, { autoplay: true, mute: true, loop: true })}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={imgSrc || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200"}
                alt={project.title}
                fill
                unoptimized
                priority
                onError={() => setImgSrc("https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200")}
                className="object-cover object-center"
              />
            </div>
          )}
        </div>

        {/* Metrics Grid */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {project.metrics.map((metric, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl glass-panel bg-slate-900/40 border border-white/5 text-center"
              >
                <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-400 mb-1">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold text-slate-300">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Deep Breakdown Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Narrative Col */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview & Project Story */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" /> Executive Overview
              </h2>
              <p className="text-slate-300 text-base leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </section>

            {/* Production Pipeline */}
            {project.technicalBreakdown?.pipeline && project.technicalBreakdown.pipeline.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-cyan-400" /> Production & Engineering Pipeline
                </h2>
                <div className="space-y-3">
                  {project.technicalBreakdown.pipeline.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl glass-panel bg-slate-900/40 border border-white/5 flex items-start gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-xs flex items-center justify-center shrink-0 border border-cyan-500/30">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-slate-300 font-medium">{step}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Key Challenges & Solutions */}
            {project.technicalBreakdown?.keyChallenges && project.technicalBreakdown.keyChallenges.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-purple-400" /> Key Challenges & Technical Solutions
                </h2>
                <div className="space-y-3">
                  {project.technicalBreakdown.keyChallenges.map((challenge, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl glass-panel bg-slate-900/40 border border-purple-500/20 text-sm text-slate-300 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>{challenge}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Outcomes & Milestones */}
            {project.technicalBreakdown?.outcomes && project.technicalBreakdown.outcomes.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400" /> Verified Project Outcomes
                </h2>
                <div className="space-y-3">
                  {project.technicalBreakdown.outcomes.map((outcome, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl glass-panel bg-slate-900/40 border border-emerald-500/20 text-sm text-slate-300 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar / Tools & Booking CTA */}
          <div className="lg:col-span-4 space-y-6">
            {/* AI Tools Used */}
            {project.technicalBreakdown?.aiToolsUsed && project.technicalBreakdown.aiToolsUsed.length > 0 && (
              <div className="p-6 rounded-2xl glass-panel bg-slate-900/50 border border-white/10 space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-cyan-400" /> AI Tools Leveraged
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technicalBreakdown.aiToolsUsed.map((tool, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Code / Software Stack */}
            {project.technicalBreakdown?.techStack && project.technicalBreakdown.techStack.length > 0 && (
              <div className="p-6 rounded-2xl glass-panel bg-slate-900/50 border border-white/10 space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-purple-400" /> Engineering Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technicalBreakdown.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Book Strategy Call Card */}
            <div className="p-6 rounded-2xl glass-panel-glow bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/30 text-center space-y-4">
              <h3 className="text-lg font-bold text-white">
                Interested in a Similar Production?
              </h3>
              <p className="text-xs text-slate-300">
                Discuss custom AI video trailers, interactive web applications, or proprietary AI workflows.
              </p>
              <button
                onClick={() => setBookingModalOpen(true)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs flex items-center justify-center gap-2 hover:opacity-90 shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                <Calendar className="w-4 h-4" /> Book Project Consultation
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Video Modal Instance */}
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoUrl={project.videoUrl}
        title={project.title}
        category={project.category}
      />

      {/* Booking Modal Instance */}
      <AppointmentBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
}
