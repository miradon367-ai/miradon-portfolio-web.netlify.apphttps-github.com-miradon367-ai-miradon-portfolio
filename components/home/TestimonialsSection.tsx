import React from "react";
import Image from "next/image";
import testimonialsData from "@/data/testimonials.json";
import { Star, Quote, Sparkles } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Client Feedback & Proof Points
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Trusted by filmmakers, engineering leads, and brands for exceptional creative direction and software execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-3xl glass-panel bg-slate-900/50 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between relative group hover:shadow-[0_0_25px_rgba(6,182,212,0.1)]"
            >
              <Quote className="w-10 h-10 text-cyan-500/20 absolute top-6 right-6 pointer-events-none group-hover:text-cyan-500/40 transition-colors" />

              <div>
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-300 text-sm italic leading-relaxed mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author & Reference */}
              <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-cyan-500/30">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <p className="text-xs text-slate-400">{item.role}</p>
                  <span className="text-[10px] font-mono text-cyan-400">
                    Ref: {item.projectReferenced}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
