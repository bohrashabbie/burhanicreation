"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import ImageUploader from "@/app/cms/_components/ImageUploader";

interface ProjectFormProps {
  initialData?: {
    id?: string;
    slug?: string;
    category?: string;
    client?: string;
    location?: string;
    year?: string;
    image?: string;
    titleEn?: string;
    titleAr?: string;
    summaryEn?: string;
    summaryAr?: string;
    deliverablesEn?: string[];
    deliverablesAr?: string[];
    featured?: boolean;
    sortOrder?: number;
  };
  isEdit?: boolean;
}

const CATEGORIES = ["Branding", "Web", "App", "E-commerce", "AI"];

export default function ProjectForm({ initialData, isEdit }: ProjectFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    slug: initialData?.slug ?? "",
    category: initialData?.category ?? "Web",
    client: initialData?.client ?? "",
    location: initialData?.location ?? "",
    year: initialData?.year ?? new Date().getFullYear().toString(),
    image: initialData?.image ?? "",
    titleEn: initialData?.titleEn ?? "",
    titleAr: initialData?.titleAr ?? "",
    summaryEn: initialData?.summaryEn ?? "",
    summaryAr: initialData?.summaryAr ?? "",
    deliverablesEn: (initialData?.deliverablesEn ?? []).join("\n"),
    deliverablesAr: (initialData?.deliverablesAr ?? []).join("\n"),
    featured: initialData?.featured ?? false,
    sortOrder: initialData?.sortOrder ?? 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        ...form,
        deliverablesEn: form.deliverablesEn.split("\n").map((s) => s.trim()).filter(Boolean),
        deliverablesAr: form.deliverablesAr.split("\n").map((s) => s.trim()).filter(Boolean),
        sortOrder: Number(form.sortOrder),
      };
      const url = isEdit ? `/api/cms/projects/${initialData!.id}` : "/api/cms/projects";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Failed to save");
      }
      router.push("/cms/projects");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cms-form-root">
      <div className="cms-form-header">
        <Link href="/cms/projects" className="cms-back-btn">
          <ArrowLeft size={16} /> Back to Projects
        </Link>
        <h1 className="cms-form-title">{isEdit ? "Edit Project" : "New Project"}</h1>
      </div>

      <form onSubmit={handleSubmit} className="cms-form">
        {error && (
          <div className="cms-form-error">
            <AlertCircle size={14} /> {error}
          </div>
        )}

        <div className="cms-form-grid-2">
          <div className="cms-field">
            <label className="cms-label">Slug (URL ID) *</label>
            <input className="cms-input" required value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="my-project-name" />
          </div>
          <div className="cms-field">
            <label className="cms-label">Category *</label>
            <select className="cms-input" value={form.category} onChange={(e) => set("category", e.target.value)}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="cms-form-grid-2">
          <div className="cms-field">
            <label className="cms-label">Title (English) *</label>
            <input className="cms-input" required value={form.titleEn} onChange={(e) => set("titleEn", e.target.value)} />
          </div>
          <div className="cms-field">
            <label className="cms-label">Title (Arabic) *</label>
            <input className="cms-input" required dir="rtl" value={form.titleAr} onChange={(e) => set("titleAr", e.target.value)} />
          </div>
        </div>

        <div className="cms-form-grid-2">
          <div className="cms-field">
            <label className="cms-label">Summary (English) *</label>
            <textarea className="cms-input cms-textarea" required rows={3} value={form.summaryEn} onChange={(e) => set("summaryEn", e.target.value)} />
          </div>
          <div className="cms-field">
            <label className="cms-label">Summary (Arabic) *</label>
            <textarea className="cms-input cms-textarea" required rows={3} dir="rtl" value={form.summaryAr} onChange={(e) => set("summaryAr", e.target.value)} />
          </div>
        </div>

        <div className="cms-form-grid-2">
          <div className="cms-field">
            <label className="cms-label">Deliverables (English) — one per line</label>
            <textarea className="cms-input cms-textarea" rows={4} value={form.deliverablesEn} onChange={(e) => set("deliverablesEn", e.target.value)} placeholder="iOS App&#10;Backend API&#10;Design System" />
          </div>
          <div className="cms-field">
            <label className="cms-label">Deliverables (Arabic) — one per line</label>
            <textarea className="cms-input cms-textarea" rows={4} dir="rtl" value={form.deliverablesAr} onChange={(e) => set("deliverablesAr", e.target.value)} />
          </div>
        </div>

        <ImageUploader
          label="Project Cover Image"
          required
          value={form.image}
          onChange={(url) => set("image", url)}
        />

        <div className="cms-form-grid-3">
          <div className="cms-field">
            <label className="cms-label">Client Name</label>
            <input className="cms-input" value={form.client} onChange={(e) => set("client", e.target.value)} />
          </div>
          <div className="cms-field">
            <label className="cms-label">Location</label>
            <input className="cms-input" value={form.location} onChange={(e) => set("location", e.target.value)} />
          </div>
          <div className="cms-field">
            <label className="cms-label">Year</label>
            <input className="cms-input" value={form.year} onChange={(e) => set("year", e.target.value)} />
          </div>
        </div>

        <div className="cms-form-grid-2">
          <div className="cms-field">
            <label className="cms-label">Sort Order</label>
            <input type="number" className="cms-input" value={form.sortOrder} onChange={(e) => set("sortOrder", e.target.value)} />
          </div>
          <div className="cms-field cms-field--checkbox">
            <label className="cms-checkbox-label">
              <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="cms-checkbox" />
              Featured on homepage
            </label>
          </div>
        </div>

        <div className="cms-form-actions">
          <Link href="/cms/projects" className="cms-btn cms-btn--secondary">Cancel</Link>
          <button type="submit" className="cms-btn cms-btn--primary" disabled={loading}>
            {loading ? <span className="cms-spinner" /> : <Save size={15} />}
            {isEdit ? "Save Changes" : "Create Project"}
          </button>
        </div>
      </form>

      <style precedence="default" href="cms-project-form">{`
        ${formStyles}
      `}</style>
    </div>
  );
}

export const formStyles = `
  .cms-form-root { max-width: 900px; }
  .cms-form-header { margin-bottom: 28px; }
  .cms-back-btn {
    display: inline-flex; align-items: center; gap: 6px;
    color: #64748b; font-size: 13px; text-decoration: none; margin-bottom: 12px;
    transition: color 0.15s;
  }
  .cms-back-btn:hover { color: #94a3b8; }
  .cms-form-title { font-size: 24px; font-weight: 800; color: #f1f5f9; letter-spacing: -0.02em; }
  .cms-form {
    background: #0f1117; border: 1px solid #1e2332; border-radius: 14px;
    padding: 32px; display: flex; flex-direction: column; gap: 24px;
  }
  .cms-form-error {
    display: flex; align-items: center; gap: 8px;
    background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2);
    border-radius: 8px; padding: 12px 14px; color: #f87171; font-size: 13px;
  }
  .cms-form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .cms-form-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
  @media (max-width: 640px) {
    .cms-form-grid-2, .cms-form-grid-3 { grid-template-columns: 1fr; }
  }
  .cms-field { display: flex; flex-direction: column; gap: 8px; }
  .cms-label { font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; }
  .cms-input {
    padding: 11px 14px; background: #0a0b10; border: 1px solid #1e2332;
    border-radius: 8px; color: #e2e8f0; font-size: 14px; outline: none;
    transition: border-color 0.2s; font-family: inherit; width: 100%;
  }
  .cms-input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }
  .cms-textarea { resize: vertical; line-height: 1.6; }
  .cms-field--checkbox { justify-content: flex-end; }
  .cms-checkbox-label {
    display: flex; align-items: center; gap: 10px;
    font-size: 14px; color: #94a3b8; cursor: pointer; padding: 11px 0;
  }
  .cms-checkbox { width: 16px; height: 16px; accent-color: #6366f1; cursor: pointer; }
  .cms-form-actions {
    display: flex; align-items: center; justify-content: flex-end; gap: 12px;
    padding-top: 8px; border-top: 1px solid #1e2332;
  }
  .cms-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 20px; border-radius: 10px; font-size: 14px; font-weight: 600;
    text-decoration: none; border: none; cursor: pointer; transition: all 0.15s;
  }
  .cms-btn--primary {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: white; box-shadow: 0 4px 12px rgba(99,102,241,0.3);
  }
  .cms-btn--primary:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
  .cms-btn--primary:disabled { opacity: 0.5; cursor: not-allowed; }
  .cms-btn--secondary { background: #1a1f2e; color: #94a3b8; border: 1px solid #1e2332; }
  .cms-btn--secondary:hover { border-color: #374151; color: #e2e8f0; }
  .cms-spinner {
    width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
`;
