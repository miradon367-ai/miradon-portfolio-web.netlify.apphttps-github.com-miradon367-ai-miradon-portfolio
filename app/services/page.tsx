"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getServices } from "@/lib/data";
import { AppointmentBookingModal } from "@/components/ui/AppointmentBookingModal";
import {
  Video,
  Layout,
  Cpu,
  PenTool,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";

const iconMap: Record<string, any> = {
  Video,
  Layout,
  Cpu,
  PenTool,
};

export default function ServicesPage() {
  const services = getServices();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div className="pt-32 pb-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Offerings & Deliverables</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            High-Impact <span className="text-gradient">AI Video</span> & Modern Software Services
          </h1>
          <p className="text-slate-300 text-lg mt-3 leading-relaxed">
            Specialized in end-to-end cinematic AI video creation, prompt engineering, custom software solutions, and high-converting web applications.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-12 mb-20">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Video;
            return (
              <div
                key={service.id}
                className="p-8 sm:p-12 rounded-3xl glass-panel bg-slate-900/40 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Icon & Service Title */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8" />
                      </div>
                      <span className="font-mono text-3xl font-black text-slate-700 group-hover:text-cyan-500/30 transition-colors">
                        0{index + 1}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-xs font-mono text-cyan-400">
                      {service.tagline}
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-2">
                      {service.tools.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-950 text-slate-300 border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Deliverables Checklist & CTA */}
                  <div className="lg:col-span-7 bg-slate-950/70 p-6 sm:p-8 rounded-2xl border border-white/5 space-y-6">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-cyan-400" /> Production Deliverables & Scope
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {service.deliverables.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 text-xs text-slate-200"
                        >
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <button
                        onClick={() => setBookingModalOpen(true)}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold flex items-center gap-2 hover:opacity-95 shadow-md shadow-cyan-500/20 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" /> Book Strategy Session
                      </button>

                      <Link
                        href="/contact"
                        className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        Direct Inquiry <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Booking Modal */}
      <AppointmentBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
}
