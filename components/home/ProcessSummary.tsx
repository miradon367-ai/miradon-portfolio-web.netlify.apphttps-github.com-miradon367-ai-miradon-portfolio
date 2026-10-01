import React from "react";
import { Sparkles, CheckCircle } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Concept & Narrative Blueprint",
    subtitle: "Storyboarding & Prompt Architecture",
    description: "Deconstructing core goals into scene-by-scene narrative arcs, visual seed parameters, character anchor prompts, and technical architecture specs.",
  },
  {
    num: "02",
    title: "Generative AI Synthesis",
    subtitle: "Multi-Model Video & Image Generation",
    description: "Orchestrating state-of-the-art AI video engines (Runway Gen-3, Midjourney v6, Luma) to generate continuous scenes with precise character and camera control.",
  },
  {
    num: "03",
    title: "Post-Production & Sound Design",
    subtitle: "Spatial Audio, Foley & 4K Color Grading",
    description: "Layering custom AI voice synthesis, orchestral trailer scores, Foley sound effects, non-linear video editing, and neural 4K upscaling.",
  },
  {
    num: "04",
    title: "Full-Stack Code & Deployment",
    subtitle: "Interactive Web & Global Delivery",
    description: "Engineering responsive digital interfaces, clean component hierarchies, SSR/SSG caching, and git-automated deployment pipelines.",
  },
];

export function ProcessSummary() {
  return (
    <section className="py-14 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Structured Execution</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            The AI Video &amp; Engineering Workflow
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            A battle-tested methodology blending generative AI innovation with engineering discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl glass-panel bg-slate-900/40 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-black text-slate-600 group-hover:text-cyan-400 transition-colors">
                    {step.num}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-cyan-500/40 group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400/90 mt-1 mb-3">
                  {step.subtitle}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-slate-500 group-hover:text-cyan-400">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Phase Milestone Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
