import React from "react";
import Link from "next/link";
import { Video, Layout, Cpu, PenTool, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import servicesData from "@/data/services.json";

const iconMap: Record<string, any> = {
  Video,
  Layout,
  Cpu,
  PenTool,
};

export function ServicesSection() {
  return (
    <section className="py-14 sm:py-24 relative bg-slate-950/80 border-t border-white/5" id="services">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Specialized Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            End-to-End Creative & Technical Services
          </h2>
          <p className="text-slate-400 text-base mt-3">
            From generative video directing to full-stack application development, turning complex creative ideas into production-ready digital deliverables.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((service) => {
            const Icon = iconMap[service.icon] || Video;
            return (
              <div
                key={service.id}
                className="p-8 rounded-3xl glass-panel bg-slate-900/50 border border-white/10 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.12)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:text-white transition-all">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-mono text-cyan-400/80 px-3 py-1 rounded-full bg-cyan-500/5 border border-cyan-500/20">
                      Production Ready
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400 mt-1 mb-3">
                    {service.tagline}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Deliverables List */}
                  <div className="mt-6 pt-6 border-t border-white/5 space-y-2.5">
                    <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
                      Key Deliverables
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.deliverables.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Tools */}
                <div className="mt-8 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {service.tools.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group/btn"
                  >
                    Inquire Service
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
