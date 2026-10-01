"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Film, Sparkles } from "lucide-react";
import { formatVideoEmbedUrl } from "@/lib/utils";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title: string;
  category?: string;
}

export function VideoModal({
  isOpen,
  onClose,
  videoUrl,
  title,
  category = "AI Video Showcase",
}: VideoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const embedUrl = formatVideoEmbedUrl(videoUrl, { autoplay: true, mute: false });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
          />

          {/* Modal — slides up from bottom on mobile, scales in on desktop */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", duration: 0.45, bounce: 0.1 }}
            className="relative w-full sm:max-w-3xl md:max-w-5xl rounded-t-3xl sm:rounded-2xl glass-panel bg-slate-950/98 overflow-hidden shadow-2xl z-10 border border-cyan-500/30 border-b-0 sm:border-b"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-slate-900/50">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="p-1.5 sm:p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                  <Film className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] sm:text-xs uppercase tracking-wider font-mono text-cyan-400 truncate">
                      {category}
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Sparkles className="w-2.5 h-2.5" /> 4K Ultra HD
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-lg font-semibold text-white tracking-wide truncate">{title}</h3>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0 ml-2"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative w-full bg-black/90 overflow-hidden" style={{ aspectRatio: "16/9" }}>
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-center p-8">
                  <p className="text-slate-400">Video not available</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-950 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-400 border-t border-white/5 gap-1">
              <span>Directed &amp; Engineered by Mira David don (Miradon)</span>
              <span className="text-cyan-400 font-mono">Generative AI • 60 FPS • Spatial Audio</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
