import React from "react";
import metricsData from "@/data/metrics.json";
import { Sparkles, Layers, ShieldCheck, Zap } from "lucide-react";

const icons = [Sparkles, Layers, Zap, ShieldCheck];

export function MetricsBanner() {
  return (
    <section className="py-12 border-y border-white/5 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {metricsData.map((metric, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={metric.id}
                className="p-6 rounded-2xl glass-panel bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
                    {metric.value}
                  </span>
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-white tracking-wide">
                  {metric.label}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {metric.context}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
