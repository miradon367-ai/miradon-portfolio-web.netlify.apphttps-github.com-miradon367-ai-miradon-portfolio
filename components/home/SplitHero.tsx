"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Sparkles, Calendar, ArrowRight, Video, Code, Layers } from "lucide-react";
import { VideoModal } from "@/components/ui/VideoModal";
import { AppointmentBookingModal } from "@/components/ui/AppointmentBookingModal";

export function SplitHero() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background Neon Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] sm:text-xs font-mono flex-wrap justify-center lg:justify-start max-w-full">
              <div className="relative w-5 h-5 rounded-full overflow-hidden border border-cyan-400 shrink-0">
                <Image
                  src="/images/profile.jpg"
                  alt="Miradon"
                  fill
                  className="object-cover"
                />
              </div>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse shrink-0" />
              <span className="leading-tight">AI Video Expert • Software & AI Developer • Website Designer</span>
            </div>

            {/* Impact Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Architecting <span className="text-gradient">Cinematic AI</span> Visuals &amp; High-Performance Digital Experiences
            </h1>

            {/* Sub-paragraph */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              I&apos;m <strong className="text-white font-semibold">Mira David don (Miradon)</strong>. I transform creative concepts into photorealistic AI videos, cinematic trailers, commercials, and scalable software applications.
            </p>

            {/* Quick Skills Badges */}
            <div className="flex flex-wrap gap-2 pt-1 justify-center lg:justify-start">
              <span className="text-xs px-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Multi-Scene AI Video &amp; Trailers
              </span>
              <span className="text-xs px-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Full-Stack Next.js &amp; AI Solutions
              </span>
              <span className="text-xs px-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-400 shrink-0" /> High-Converting Web Architecture
              </span>
            </div>

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center lg:justify-start">
              <button
                onClick={() => setBookingModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" /> Book Consultation
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/portfolio"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl glass-panel bg-slate-900/80 text-white font-semibold text-sm border border-white/10 hover:border-cyan-500/40 hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
              >
                Explore Projects
              </Link>
            </div>
          </div>

          {/* Right Column: Video Card */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative rounded-3xl p-1 bg-gradient-to-br from-cyan-500/40 via-purple-600/30 to-blue-500/40 shadow-2xl max-w-sm mx-auto lg:max-w-none">
              <div className="relative rounded-[22px] overflow-hidden bg-slate-950 aspect-[4/5] sm:aspect-[16/12] lg:aspect-[4/5] flex flex-col justify-between">
                {/* Background Image */}
                <Image
                  src="https://img.youtube.com/vi/tYjV2AAXPw4/hqdefault.jpg"
                  alt="THE DRUM OF THE ANCESTORS — Cinematic AI Showcase"
                  fill
                  unoptimized
                  priority
                  className="object-cover object-center brightness-75 hover:scale-105 transition-transform duration-700"
                />

                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30" />

                {/* Top Badge */}
                <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                    Featured AI Film
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Autoplay
                  </span>
                </div>

                {/* Center Play Button */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
                  <button
                    onClick={() => setVideoModalOpen(true)}
                    className="group w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 p-1 shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:scale-110 transition-transform cursor-pointer"
                    aria-label="Play Featured AI Trailer"
                  >
                    <div className="w-full h-full bg-slate-950/90 rounded-full flex items-center justify-center text-cyan-400 group-hover:text-white transition-colors">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 ml-1 fill-current" />
                    </div>
                  </button>
                  <p className="mt-3 text-xs font-mono uppercase tracking-widest text-cyan-300">
                    Click to Play 4K Reel
                  </p>
                </div>

                {/* Bottom Metadata Card */}
                <div className="relative z-10 p-3 sm:p-5 glass-panel bg-slate-950/90 border-t border-white/10 m-3 rounded-2xl">
                  <h3 className="text-white font-bold text-sm sm:text-base flex items-center justify-between">
                    <span>THE DRUM OF THE ANCESTORS</span>
                    <span className="text-xs font-mono text-cyan-400">4K UHD</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    A Cinematic Nigerian Fantasy Short Film exploring ancestral power, African mythology, and destiny.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoUrl="https://www.youtube.com/watch?v=tYjV2AAXPw4"
        title="THE DRUM OF THE ANCESTORS"
        category="Cinematic Nigerian Fantasy Short Film"
      />

      <AppointmentBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </section>
  );
}
