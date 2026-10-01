"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  Layers,
  User,
  Zap,
  Star,
  CheckCircle2,
  Wrench,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Sparkles,
  ExternalLink,
  RefreshCw,
  Eye,
  Database,
  ArrowRight,
} from "lucide-react";
import { Toast } from "@/components/ui/Toast";
import { Profile, Project, Service, Testimonial, Metric, ToolCategory } from "@/types";
import Link from "next/link";
import { getValidImageUrl, getYoutubeId } from "@/lib/utils";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<
    "projects" | "profile" | "services" | "testimonials" | "metrics" | "tools"
  >("projects");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Loaded State
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [tools, setTools] = useState<ToolCategory[]>([]);

  // Project Editor Modal State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({});

  // Helper form string helpers for array fields
  const [pipelineStr, setPipelineStr] = useState("");
  const [aiToolsStr, setAiToolsStr] = useState("");
  const [techStackStr, setTechStackStr] = useState("");
  const [challengesStr, setChallengesStr] = useState("");
  const [outcomesStr, setOutcomesStr] = useState("");

  // Toast State
  const [toast, setToast] = useState<{ open: boolean; message: string; type: "success" | "error" }>({
    open: false,
    message: "",
    type: "success",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/data", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setProfile(data.profile);
        setProjects(data.projects);
        setServices(data.services);
        setTestimonials(data.testimonials);
        setMetrics(data.metrics);
        setTools(data.tools);
      }
    } catch (err) {
      console.error("Failed to load CMS data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveContent = async (type: string, data: any) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, data }),
      });

      if (res.ok) {
        setToast({
          open: true,
          message: `${type.toUpperCase()} saved successfully to disk!`,
          type: "success",
        });
        await fetchData();
      } else {
        setToast({
          open: true,
          message: "Failed to save changes.",
          type: "error",
        });
      }
    } catch {
      setToast({
        open: true,
        message: "An error occurred while saving.",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  // ---------------- PROJECT MODAL HANDLERS ----------------
  const openNewProjectModal = () => {
    setIsNewProject(true);
    const newProj: Partial<Project> = {
      id: `proj-${Date.now()}`,
      slug: "",
      title: "",
      category: "AI Video & Film",
      type: "Cinematic Trailer / Commercial",
      client: "",
      role: "AI Creator & Developer",
      year: new Date().getFullYear().toString(),
      featured: true,
      videoUrl: "",
      thumbnailUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200",
      bannerUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600",
      summary: "",
      description: "",
      technicalBreakdown: {
        overview: "",
        pipeline: [],
        aiToolsUsed: [],
        techStack: [],
        keyChallenges: [],
        outcomes: [],
      },
      metrics: [
        { label: "Quality", value: "4K UHD" },
        { label: "Scenes", value: "5+ Scenes" },
      ],
    };
    setProjectForm(newProj);
    setPipelineStr("");
    setAiToolsStr("");
    setTechStackStr("");
    setChallengesStr("");
    setOutcomesStr("");
    setEditingProject(newProj as Project);
  };

  const openEditProjectModal = (proj: Project) => {
    setIsNewProject(false);
    setProjectForm({ ...proj });
    setPipelineStr((proj.technicalBreakdown?.pipeline || []).join("\n"));
    setAiToolsStr((proj.technicalBreakdown?.aiToolsUsed || []).join(", "));
    setTechStackStr((proj.technicalBreakdown?.techStack || []).join(", "));
    setChallengesStr((proj.technicalBreakdown?.keyChallenges || []).join("\n"));
    setOutcomesStr((proj.technicalBreakdown?.outcomes || []).join("\n"));
    setEditingProject(proj);
  };

  const handleSaveProjectForm = async () => {
    if (!projectForm.title || !projectForm.slug) {
      setToast({
        open: true,
        message: "Project Title and URL Slug are required.",
        type: "error",
      });
      return;
    }

    const updatedBreakdown = {
      overview: projectForm.technicalBreakdown?.overview || projectForm.summary || "",
      pipeline: pipelineStr.split("\n").map((s) => s.trim()).filter(Boolean),
      aiToolsUsed: aiToolsStr.split(",").map((s) => s.trim()).filter(Boolean),
      techStack: techStackStr.split(",").map((s) => s.trim()).filter(Boolean),
      keyChallenges: challengesStr.split("\n").map((s) => s.trim()).filter(Boolean),
      outcomes: outcomesStr.split("\n").map((s) => s.trim()).filter(Boolean),
    };

    let thumb = projectForm.thumbnailUrl;
    let banner = projectForm.bannerUrl;

    if (projectForm.videoUrl) {
      const ytId = getYoutubeId(projectForm.videoUrl);
      if (ytId && (!thumb || thumb.includes("youtube.com/watch") || thumb.includes("unsplash"))) {
        thumb = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
      }
      if (ytId && (!banner || banner.includes("youtube.com/watch") || banner.includes("unsplash"))) {
        banner = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
      }
    }

    thumb = getValidImageUrl(thumb);
    banner = getValidImageUrl(banner, thumb);

    const finalProject: Project = {
      id: projectForm.id || `proj-${Date.now()}`,
      slug: (projectForm.slug || "").toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      title: projectForm.title || "Untitled Project",
      category: projectForm.category || "AI Video & Film",
      type: projectForm.type || "Commercial / Showcase",
      client: projectForm.client || "Client / Independent",
      role: projectForm.role || "Creator & Developer",
      year: projectForm.year || new Date().getFullYear().toString(),
      featured: projectForm.featured ?? true,
      videoUrl: projectForm.videoUrl || "",
      thumbnailUrl: thumb,
      bannerUrl: banner,
      summary: projectForm.summary || "",
      description: projectForm.description || projectForm.summary || "",
      technicalBreakdown: updatedBreakdown,
      metrics: projectForm.metrics || [
        { label: "Quality", value: "4K UHD" },
        { label: "Scenes", value: "7+ Scenes" },
      ],
    };

    let updatedList = [...projects];
    if (isNewProject) {
      updatedList.unshift(finalProject);
    } else {
      updatedList = updatedList.map((p) => (p.id === finalProject.id ? finalProject : p));
    }

    setProjects(updatedList);
    setEditingProject(null);
    await saveContent("projects", updatedList);
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    const updatedList = projects.filter((p) => p.id !== id);
    setProjects(updatedList);
    await saveContent("projects", updatedList);
  };

  return (
    <div className="pt-32 pb-24 relative min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Content Management System</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Portfolio & Content Control Center
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Add new portfolio projects, edit your bio, update services, and manage testimonials with instant live persistence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl glass-panel bg-slate-900 border border-white/10 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Reload Data
            </button>
            <Link
              href="/portfolio"
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 hover:bg-cyan-500/30 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" /> View Live Site
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 glass-panel p-2 rounded-2xl bg-slate-900/60 border border-white/10">
          {[
            { id: "projects", label: "Projects & Trailers", count: projects.length, icon: Layers },
            { id: "profile", label: "Profile & Bio", count: 1, icon: User },
            { id: "services", label: "Services & Pipelines", count: services.length, icon: Zap },
            { id: "testimonials", label: "Testimonials", count: testimonials.length, icon: Star },
            { id: "metrics", label: "Metrics & Proof", count: metrics.length, icon: CheckCircle2 },
            { id: "tools", label: "Tool Stack", count: tools.length, icon: Wrench },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${isActive
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-950/50 font-mono">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ---------------- TAB 1: PROJECTS ---------------- */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-cyan-400" /> Active Portfolio Projects ({projects.length})
                </h2>
                <p className="text-xs text-slate-400">
                  Manage the projects shown on the homepage and portfolio archive.
                </p>
              </div>

              <button
                onClick={openNewProjectModal}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-opacity cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add New Project
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 rounded-2xl glass-panel bg-slate-900/50 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {proj.category}
                      </span>
                      <span className="text-xs font-mono text-slate-500">{proj.year}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">{proj.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                      {proj.summary}
                    </p>

                    <div className="text-[11px] font-mono text-slate-500 space-y-1 mb-4">
                      <div><strong className="text-slate-400">Role:</strong> {proj.role}</div>
                      <div><strong className="text-slate-400">Client:</strong> {proj.client}</div>
                      <div><strong className="text-slate-400">Slug:</strong> /portfolio/{proj.slug}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <Link
                      href={`/portfolio/${proj.slug}`}
                      target="_blank"
                      className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      Preview <ExternalLink className="w-3 h-3" />
                    </Link>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditProjectModal(proj)}
                        className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- TAB 2: PROFILE & BIO ---------------- */}
        {activeTab === "profile" && profile && (
          <div className="p-8 rounded-3xl glass-panel bg-slate-900/40 border border-white/10 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-cyan-400" /> Edit Profile & Contact Identity
                </h2>
                <p className="text-xs text-slate-400">
                  Update your contact details, bio, and roles rendered across the entire site.
                </p>
              </div>

              <button
                onClick={() => saveContent("profile", profile)}
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-opacity"
              >
                <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Profile"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Alias / Short Name
                </label>
                <input
                  type="text"
                  value={profile.alias}
                  onChange={(e) => setProfile({ ...profile, alias: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Primary Role & Specialty
                </label>
                <input
                  type="text"
                  value={profile.primaryRole}
                  onChange={(e) => setProfile({ ...profile, primaryRole: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={profile.tagline}
                  onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Full Bio
                </label>
                <textarea
                  rows={5}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500 resize-none leading-relaxed"
                />
              </div>
            </div>
          </div>
        )}

        {/* ---------------- TAB 3: SERVICES ---------------- */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-cyan-400" /> Core Services & Pipelines ({services.length})
                </h2>
                <p className="text-xs text-slate-400">
                  Manage the creative & technical services offered.
                </p>
              </div>

              <button
                onClick={() => saveContent("services", services)}
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:opacity-95"
              >
                <Save className="w-4 h-4" /> Save Services
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((svc, index) => (
                <div
                  key={svc.id}
                  className="p-6 rounded-2xl glass-panel bg-slate-900/40 border border-white/10 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400">Service #0{index + 1}</span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Service Title</label>
                    <input
                      type="text"
                      value={svc.title}
                      onChange={(e) => {
                        const updated = [...services];
                        updated[index].title = e.target.value;
                        setServices(updated);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Tagline</label>
                    <input
                      type="text"
                      value={svc.tagline}
                      onChange={(e) => {
                        const updated = [...services];
                        updated[index].tagline = e.target.value;
                        setServices(updated);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={svc.description}
                      onChange={(e) => {
                        const updated = [...services];
                        updated[index].description = e.target.value;
                        setServices(updated);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white text-sm resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- TAB 4: TESTIMONIALS ---------------- */}
        {activeTab === "testimonials" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400" /> Client Testimonials & Endorsements ({testimonials.length})
                </h2>
                <p className="text-xs text-slate-400">
                  Update client quotes and references.
                </p>
              </div>

              <button
                onClick={() => saveContent("testimonials", testimonials)}
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <Save className="w-4 h-4" /> Save Testimonials
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, index) => (
                <div
                  key={t.id}
                  className="p-6 rounded-2xl glass-panel bg-slate-900/40 border border-white/10 space-y-4"
                >
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Client Name / Title</label>
                    <input
                      type="text"
                      value={t.name}
                      onChange={(e) => {
                        const updated = [...testimonials];
                        updated[index].name = e.target.value;
                        setTestimonials(updated);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Role & Studio</label>
                    <input
                      type="text"
                      value={t.role}
                      onChange={(e) => {
                        const updated = [...testimonials];
                        updated[index].role = e.target.value;
                        setTestimonials(updated);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Quote</label>
                    <textarea
                      rows={4}
                      value={t.quote}
                      onChange={(e) => {
                        const updated = [...testimonials];
                        updated[index].quote = e.target.value;
                        setTestimonials(updated);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white text-sm resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- TAB 5: METRICS ---------------- */}
        {activeTab === "metrics" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Proof Points & Metrics ({metrics.length})
                </h2>
                <p className="text-xs text-slate-400">
                  Update high-impact stat figures shown on the homepage.
                </p>
              </div>

              <button
                onClick={() => saveContent("metrics", metrics)}
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <Save className="w-4 h-4" /> Save Metrics
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((m, index) => (
                <div
                  key={m.id}
                  className="p-6 rounded-2xl glass-panel bg-slate-900/40 border border-white/10 space-y-3"
                >
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Value (e.g. 7+)</label>
                    <input
                      type="text"
                      value={m.value}
                      onChange={(e) => {
                        const updated = [...metrics];
                        updated[index].value = e.target.value;
                        setMetrics(updated);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white font-mono text-lg font-bold text-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Label</label>
                    <input
                      type="text"
                      value={m.label}
                      onChange={(e) => {
                        const updated = [...metrics];
                        updated[index].label = e.target.value;
                        setMetrics(updated);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Context</label>
                    <textarea
                      rows={2}
                      value={m.context}
                      onChange={(e) => {
                        const updated = [...metrics];
                        updated[index].context = e.target.value;
                        setMetrics(updated);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white text-xs resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- TAB 6: TOOLS ---------------- */}
        {activeTab === "tools" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-cyan-400" /> AI & Full-Stack Tool Stack
                </h2>
                <p className="text-xs text-slate-400">
                  Manage the AI tools, models, frameworks, and engines displayed in the stack section.
                </p>
              </div>

              <button
                onClick={() => saveContent("tools", tools)}
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <Save className="w-4 h-4" /> Save Tool Stack
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {tools.map((categoryGroup, catIdx) => (
                <div
                  key={catIdx}
                  className="p-6 rounded-2xl glass-panel bg-slate-900/40 border border-white/10 space-y-4"
                >
                  <h3 className="text-base font-bold text-white pb-2 border-b border-white/10">
                    {categoryGroup.category}
                  </h3>

                  <div className="space-y-3">
                    {categoryGroup.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-950/70 border border-white/5"
                      >
                        <input
                          type="text"
                          value={item.name}
                          placeholder="Tool Name"
                          onChange={(e) => {
                            const updated = [...tools];
                            updated[catIdx].items[itemIdx].name = e.target.value;
                            setTools(updated);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={item.role}
                          placeholder="Functionality"
                          onChange={(e) => {
                            const updated = [...tools];
                            updated[catIdx].items[itemIdx].role = e.target.value;
                            setTools(updated);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs text-slate-300"
                        />
                        <input
                          type="text"
                          value={item.badge}
                          placeholder="Badge Tag"
                          onChange={(e) => {
                            const updated = [...tools];
                            updated[catIdx].items[itemIdx].badge = e.target.value;
                            setTools(updated);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-mono text-cyan-400"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ---------------- PROJECT CREATION & EDIT MODAL ---------------- */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            onClick={() => setEditingProject(null)}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
          />

          <div className="relative w-full max-w-4xl my-8 rounded-3xl glass-panel-glow bg-slate-950 border border-cyan-500/40 shadow-2xl z-10 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-slate-900/50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {isNewProject ? "Add New Portfolio Project" : `Edit: ${projectForm.title}`}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Fill out the project showcase details, video links, AI tools, and technical breakdowns.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setEditingProject(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.title || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      setProjectForm({
                        ...projectForm,
                        title: val,
                        slug: isNewProject ? val.toLowerCase().replace(/[^a-z0-9]+/g, "-") : projectForm.slug,
                      });
                    }}
                    placeholder="e.g. The Mad Preacher"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    URL Slug * (/portfolio/...)
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.slug || ""}
                    onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })}
                    placeholder="e.g. the-mad-preacher"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    value={projectForm.category || "AI Video & Film"}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  >
                    <option value="AI Video & Film">AI Video & Film</option>
                    <option value="Software & Games">Software & Games</option>
                    <option value="Web Design & Dev">Web Design & Dev</option>
                    <option value="Commercial">Commercial / Ad</option>
                  </select>
                </div>

                {/* Project Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Type / Format
                  </label>
                  <input
                    type="text"
                    value={projectForm.type || ""}
                    onChange={(e) => setProjectForm({ ...projectForm, type: e.target.value })}
                    placeholder="Cinematic Movie Trailer / Commercial"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Client */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Client / Brand
                  </label>
                  <input
                    type="text"
                    value={projectForm.client || ""}
                    onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                    placeholder="e.g. Movie Director / Studio"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Your Role
                  </label>
                  <input
                    type="text"
                    value={projectForm.role || ""}
                    onChange={(e) => setProjectForm({ ...projectForm, role: e.target.value })}
                    placeholder="e.g. Director & AI Creator"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Year */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Year
                  </label>
                  <input
                    type="text"
                    value={projectForm.year || "2024"}
                    onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Featured Checkbox */}
                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="featuredCheckbox"
                    checked={projectForm.featured ?? true}
                    onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-white/20 focus:ring-cyan-500"
                  />
                  <label htmlFor="featuredCheckbox" className="text-xs font-semibold text-white cursor-pointer">
                    Feature on Homepage Showcase
                  </label>
                </div>
              </div>

              {/* Media URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Video Embed URL (YouTube/Vimeo/CDN)
                  </label>
                  <input
                    type="text"
                    value={projectForm.videoUrl || ""}
                    onChange={(e) => setProjectForm({ ...projectForm, videoUrl: e.target.value })}
                    placeholder="https://www.youtube-nocookie.com/embed/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Thumbnail Image URL
                  </label>
                  <input
                    type="text"
                    value={projectForm.thumbnailUrl || ""}
                    onChange={(e) => setProjectForm({ ...projectForm, thumbnailUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Banner Image URL
                  </label>
                  <input
                    type="text"
                    value={projectForm.bannerUrl || ""}
                    onChange={(e) => setProjectForm({ ...projectForm, bannerUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Short Summary (Shown on Cards)
                </label>
                <input
                  type="text"
                  value={projectForm.summary || ""}
                  onChange={(e) => setProjectForm({ ...projectForm, summary: e.target.value })}
                  placeholder="Original cinematic AI movie trailer set in Ancient Judea..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Full Case Study Description
                </label>
                <textarea
                  rows={4}
                  value={projectForm.description || ""}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Detailed project narrative, artistic vision, and execution context..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              {/* Technical Breakdown Sub-sections */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase text-cyan-400">
                  Technical Breakdown & Execution Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      AI Tools Leveraged (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={aiToolsStr}
                      onChange={(e) => setAiToolsStr(e.target.value)}
                      placeholder="Midjourney v6, Runway Gen-3, ElevenLabs, DaVinci Resolve"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Tech / Software Stack (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={techStackStr}
                      onChange={(e) => setTechStackStr(e.target.value)}
                      placeholder="Next.js, TypeScript, Tailwind CSS, Web Audio"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Production Pipeline Steps (one step per line)
                  </label>
                  <textarea
                    rows={3}
                    value={pipelineStr}
                    onChange={(e) => setPipelineStr(e.target.value)}
                    placeholder="Scriptwriting & Storyboard Arc&#10;Multi-Model Video Generation with Seed Anchors&#10;Voice Synthesis & Foley Audio Mastering"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-xs text-white font-mono resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Key Challenges & Solutions (one per line)
                    </label>
                    <textarea
                      rows={3}
                      value={challengesStr}
                      onChange={(e) => setChallengesStr(e.target.value)}
                      placeholder="Preserving costume fidelity across close-ups and wide shots.&#10;Synchronizing video cuts with swelling symphonic trailer music."
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-xs text-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Verified Outcomes (one per line)
                    </label>
                    <textarea
                      rows={3}
                      value={outcomesStr}
                      onChange={(e) => setOutcomesStr(e.target.value)}
                      placeholder="7+ Photorealistic Consistent Scenes&#10;4K HDR Cinematic Output&#10;100% Cross-Device Responsiveness"
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-xs text-white resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-6 border-t border-white/10 bg-slate-900/50 flex items-center justify-end gap-3 shrink-0">
              <button
                onClick={() => setEditingProject(null)}
                className="px-5 py-2.5 rounded-xl glass-panel text-xs text-slate-300 hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveProjectForm}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:opacity-95"
              >
                <Save className="w-4 h-4" /> Save Project to Portfolio
              </button>
            </div>
          </div>
        </div>
      )}

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
