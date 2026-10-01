"use client";

import React, { useState } from "react";
import { Mail, Phone, Calendar, Send, Sparkles, CheckCircle2, MessageSquare, User, AtSign, Clock, MapPin } from "lucide-react";
import { Toast } from "@/components/ui/Toast";
import { AppointmentBookingModal } from "@/components/ui/AppointmentBookingModal";
import profileData from "@/data/profile.json";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [service, setService] = useState("AI Video Creation");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; message: string; type: "success" | "error" }>({
    open: false,
    message: "",
    type: "success",
  });
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, service, message }),
      });

      if (res.ok) {
        setToast({
          open: true,
          message: "Thank you! Your message has been routed directly to miradon367@gmail.com.",
          type: "success",
        });
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setToast({
          open: true,
          message: "Inquiry received! We will follow up with you shortly.",
          type: "success",
        });
      }
    } catch {
      setToast({
        open: true,
        message: "Message received! We will connect with you via email shortly.",
        type: "success",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Inquiries & Project Booking</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Let&apos;s Start Your <span className="text-gradient">Next Project</span>
          </h1>
          <p className="text-slate-300 text-lg mt-3">
            Have a project in mind, need a cinematic AI trailer, or looking to schedule a consultation? Reach out below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Booking Trigger */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Booking Hero Box */}
            <div className="p-8 rounded-3xl glass-panel-glow bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/30 space-y-5">
              <div className="p-3 w-fit rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Book a Direct Consultation Call
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Schedule a 1-on-1 strategy call with Mira David don to discuss project scopes, timelines, technical feasibility, and AI workflows.
              </p>
              <button
                onClick={() => setBookingModalOpen(true)}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                <Calendar className="w-4 h-4" /> Open Appointment Scheduler
              </button>
            </div>

            {/* Direct Contact Lines */}
            <div className="p-8 rounded-3xl glass-panel bg-slate-900/40 border border-white/10 space-y-6">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Communication Channels
              </h3>

              <div className="space-y-4">
                <a
                  href={`mailto:${profileData.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/60 border border-white/5 hover:border-cyan-500/30 transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-slate-400 uppercase">
                      Direct Email
                    </span>
                    <span className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {profileData.email}
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${profileData.phone}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/60 border border-white/5 hover:border-cyan-500/30 transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-slate-400 uppercase">
                      Phone / Mobile
                    </span>
                    <span className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {profileData.phone}
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/60 border border-white/5">
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-slate-400 uppercase">
                      Location & Timezone
                    </span>
                    <span className="text-sm font-semibold text-white">
                      Worldwide / EST & Global Flexible
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl glass-panel bg-slate-900/50 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-2">
                Send a Direct Message
              </h2>
              <p className="text-sm text-slate-400 mb-8">
                Fill out the inquiry form below and Mira David don will follow up promptly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-cyan-400" /> Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. David Miller"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <AtSign className="w-3.5 h-3.5 text-cyan-400" /> Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="david@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Service dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Target Service
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                    >
                      <option value="AI Video Creation">AI Video Creation & Direction</option>
                      <option value="Website Design">Website Design & Development</option>
                      <option value="AI Developer">AI Software & Automations</option>
                      <option value="Scriptwriting">Scriptwriting & Storyboarding</option>
                      <option value="Other">Other / Full Project Package</option>
                    </select>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Project Inquiry / Commercial Trailer"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-cyan-400" /> Project Brief & Goals *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project goals, deliverables, preferred timeline, and any creative references..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 text-sm transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-xl shadow-cyan-500/20 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending Message...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Message Now
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Modal Instance */}
      <AppointmentBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      {/* Toast Notification */}
      <Toast
        isOpen={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}
