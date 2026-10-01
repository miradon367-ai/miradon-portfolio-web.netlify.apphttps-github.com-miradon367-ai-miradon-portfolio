import React from "react";
import toolsData from "@/data/tools.json";
import { Sparkles, Terminal, Wrench } from "lucide-react";

export function ToolStack() {
  return (
    <section className="py-20 relative bg-slate-950/90 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>Production Stack</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            AI Tooling & Engineering Technologies
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Harnessing state-of-the-art diffusion models, voice synthesizers, modern frameworks, and cloud workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {toolsData.map((categoryGroup, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl glass-panel bg-slate-900/40 border border-white/10 relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white tracking-wide">
                  {categoryGroup.category}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {categoryGroup.items.map((tool, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col justify-between group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-white text-sm group-hover:text-cyan-300 transition-colors">
                        {tool.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                        {tool.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-1">
                      {tool.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
