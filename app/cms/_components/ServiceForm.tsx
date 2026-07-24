"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { formStyles } from "@/app/cms/_components/ProjectForm";
import ImageUploader from "@/app/cms/_components/ImageUploader";

interface ServiceFormProps {
  initialData?: Record<string, unknown>;
  isEdit?: boolean;
}

export default function ServiceForm({ initialData, isEdit }: ServiceFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    slug: (initialData?.slug as string) ?? "",
    iconName: (initialData?.iconName as string) ?? "Globe",
    image: (initialData?.image as string) ?? "",
    accent: (initialData?.accent as string) ?? "#6366f1",
    titleEn: (initialData?.titleEn as string) ?? "",
    titleAr: (initialData?.titleAr as string) ?? "",
    taglineEn: (initialData?.taglineEn as string) ?? "",
    taglineAr: (initialData?.taglineAr as string) ?? "",
    descriptionEn: (initialData?.descriptionEn as string) ?? "",
    descriptionAr: (initialData?.descriptionAr as string) ?? "",
    fullDescriptionEn: (initialData?.fullDescriptionEn as string) ?? "",
    fullDescriptionAr: (initialData?.fullDescriptionAr as string) ?? "",
    deliverablesEn: ((initialData?.deliverablesEn as string[]) ?? []).join("\n"),
    deliverablesAr: ((initialData?.deliverablesAr as string[]) ?? []).join("\n"),
    featuresEn: ((initialData?.featuresEn as string[]) ?? []).join("\n"),
    featuresAr: ((initialData?.featuresAr as string[]) ?? []).join("\n"),
    techStack: ((initialData?.techStack as string[]) ?? []).join(", "),
    sortOrder: (initialData?.sortOrder as number) ?? 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const splitLines = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);
      const payload = {
        ...form,
        deliverablesEn: splitLines(form.deliverablesEn),
        deliverablesAr: splitLines(form.deliverablesAr),
        featuresEn: splitLines(form.featuresEn),
        featuresAr: splitLines(form.featuresAr),
        techStack: form.techStack.split(",").map((x) => x.trim()).filter(Boolean),
        sortOrder: Number(form.sortOrder),
      };
      const url = isEdit ? `/api/cms/services/${(initialData as { id: string }).id}` : "/api/cms/services";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed to save");
      router.push("/cms/services");
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
        <Link href="/cms/services" className="cms-back-btn"><ArrowLeft size={16} /> Back to Services</Link>
        <h1 className="cms-form-title">{isEdit ? "Edit Service" : "New Service"}</h1>
      </div>

      <form onSubmit={handleSubmit} className="cms-form">
        {error && <div className="cms-form-error"><AlertCircle size={14} /> {error}</div>}

        <div className="cms-form-grid-2">
          <div className="cms-field"><label className="cms-label">Slug *</label><input className="cms-input" required value={form.slug} onChange={(e) => set("slug", e.target.value)} /></div>
          <div className="cms-field"><label className="cms-label">Icon Name</label><input className="cms-input" value={form.iconName} onChange={(e) => set("iconName", e.target.value)} placeholder="Globe, Smartphone, Database..." /></div>
        </div>

        <div className="cms-form-grid-2">
          <div className="cms-field"><label className="cms-label">Title (EN) *</label><input className="cms-input" required value={form.titleEn} onChange={(e) => set("titleEn", e.target.value)} /></div>
          <div className="cms-field"><label className="cms-label">Title (AR) *</label><input className="cms-input" required dir="rtl" value={form.titleAr} onChange={(e) => set("titleAr", e.target.value)} /></div>
        </div>

        <div className="cms-form-grid-2">
          <div className="cms-field"><label className="cms-label">Tagline (EN)</label><input className="cms-input" value={form.taglineEn} onChange={(e) => set("taglineEn", e.target.value)} /></div>
          <div className="cms-field"><label className="cms-label">Tagline (AR)</label><input className="cms-input" dir="rtl" value={form.taglineAr} onChange={(e) => set("taglineAr", e.target.value)} /></div>
        </div>

        <div className="cms-form-grid-2">
          <div className="cms-field"><label className="cms-label">Short Description (EN)</label><textarea className="cms-input cms-textarea" rows={3} value={form.descriptionEn} onChange={(e) => set("descriptionEn", e.target.value)} /></div>
          <div className="cms-field"><label className="cms-label">Short Description (AR)</label><textarea className="cms-input cms-textarea" rows={3} dir="rtl" value={form.descriptionAr} onChange={(e) => set("descriptionAr", e.target.value)} /></div>
        </div>

        <div className="cms-form-grid-2">
          <div className="cms-field"><label className="cms-label">Full Description (EN)</label><textarea className="cms-input cms-textarea" rows={4} value={form.fullDescriptionEn} onChange={(e) => set("fullDescriptionEn", e.target.value)} /></div>
          <div className="cms-field"><label className="cms-label">Full Description (AR)</label><textarea className="cms-input cms-textarea" rows={4} dir="rtl" value={form.fullDescriptionAr} onChange={(e) => set("fullDescriptionAr", e.target.value)} /></div>
        </div>

        <div className="cms-form-grid-2">
          <div className="cms-field"><label className="cms-label">Deliverables (EN) — one per line</label><textarea className="cms-input cms-textarea" rows={4} value={form.deliverablesEn} onChange={(e) => set("deliverablesEn", e.target.value)} /></div>
          <div className="cms-field"><label className="cms-label">Deliverables (AR)</label><textarea className="cms-input cms-textarea" rows={4} dir="rtl" value={form.deliverablesAr} onChange={(e) => set("deliverablesAr", e.target.value)} /></div>
        </div>

        <div className="cms-form-grid-2">
          <div className="cms-field"><label className="cms-label">Features (EN) — one per line</label><textarea className="cms-input cms-textarea" rows={4} value={form.featuresEn} onChange={(e) => set("featuresEn", e.target.value)} /></div>
          <div className="cms-field"><label className="cms-label">Features (AR)</label><textarea className="cms-input cms-textarea" rows={4} dir="rtl" value={form.featuresAr} onChange={(e) => set("featuresAr", e.target.value)} /></div>
        </div>

        <div className="cms-form-grid-3">
          <ImageUploader label="Service Image" value={form.image} onChange={(url) => set("image", url)} />
          <div className="cms-field"><label className="cms-label">Accent Color</label><input type="color" className="cms-input" value={form.accent} onChange={(e) => set("accent", e.target.value)} style={{ height: 44, padding: "4px 8px", cursor: "pointer" }} /></div>
          <div className="cms-field"><label className="cms-label">Sort Order</label><input type="number" className="cms-input" value={form.sortOrder} onChange={(e) => set("sortOrder", e.target.value)} /></div>
        </div>

        <div className="cms-field">
          <label className="cms-label">Tech Stack (comma-separated)</label>
          <input className="cms-input" value={form.techStack} onChange={(e) => set("techStack", e.target.value)} placeholder="Next.js, TypeScript, PostgreSQL" />
        </div>

        <div className="cms-form-actions">
          <Link href="/cms/services" className="cms-btn cms-btn--secondary">Cancel</Link>
          <button type="submit" className="cms-btn cms-btn--primary" disabled={loading}>
            {loading ? <span className="cms-spinner" /> : <Save size={15} />}
            {isEdit ? "Save Changes" : "Create Service"}
          </button>
        </div>
      </form>
      <style precedence="default" href="cms-service-form">{formStyles}</style>
    </div>
  );
}
