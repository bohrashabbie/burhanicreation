"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { formStyles } from "@/app/cms/_components/ProjectForm";
import ImageUploader from "@/app/cms/_components/ImageUploader";

export default function ClientForm({ initialData, isEdit }: { initialData?: Record<string, unknown>; isEdit?: boolean }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: (initialData?.name as string) ?? "",
    industryEn: (initialData?.industryEn as string) ?? "",
    industryAr: (initialData?.industryAr as string) ?? "",
    symbol: (initialData?.symbol as string) ?? "",
    logoUrl: (initialData?.logoUrl as string) ?? "",
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
      const url = isEdit ? `/api/cms/clients/${(initialData as { id: string }).id}` : "/api/cms/clients";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sortOrder: Number(form.sortOrder) }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed to save");
      router.push("/cms/clients");
      router.refresh();
    } catch (err) { setError(err instanceof Error ? err.message : "Error"); }
    finally { setLoading(false); }
  };

  return (
    <div className="cms-form-root">
      <div className="cms-form-header">
        <Link href="/cms/clients" className="cms-back-btn"><ArrowLeft size={16} /> Back to Clients</Link>
        <h1 className="cms-form-title">{isEdit ? "Edit Client" : "New Client"}</h1>
      </div>
      <form onSubmit={handleSubmit} className="cms-form">
        {error && <div className="cms-form-error"><AlertCircle size={14} /> {error}</div>}
        <div className="cms-form-grid-2">
          <div className="cms-field"><label className="cms-label">Company Name *</label><input className="cms-input" required value={form.name} onChange={(e) => set("name", e.target.value)} /></div>
          <div className="cms-field"><label className="cms-label">Symbol (2-3 letters) *</label><input className="cms-input" required maxLength={4} value={form.symbol} onChange={(e) => set("symbol", e.target.value.toUpperCase())} placeholder="AE" /></div>
        </div>
        <div className="cms-form-grid-2">
          <div className="cms-field"><label className="cms-label">Industry (EN)</label><input className="cms-input" value={form.industryEn} onChange={(e) => set("industryEn", e.target.value)} /></div>
          <div className="cms-field"><label className="cms-label">Industry (AR)</label><input className="cms-input" dir="rtl" value={form.industryAr} onChange={(e) => set("industryAr", e.target.value)} /></div>
        </div>
        <div className="cms-form-grid-2">
          <ImageUploader label="Client Logo" value={form.logoUrl} onChange={(url) => set("logoUrl", url)} />
          <div className="cms-field"><label className="cms-label">Sort Order</label><input type="number" className="cms-input" value={form.sortOrder} onChange={(e) => set("sortOrder", e.target.value)} /></div>
        </div>
        <div className="cms-form-actions">
          <Link href="/cms/clients" className="cms-btn cms-btn--secondary">Cancel</Link>
          <button type="submit" className="cms-btn cms-btn--primary" disabled={loading}>
            {loading ? <span className="cms-spinner" /> : <Save size={15} />}
            {isEdit ? "Save" : "Create Client"}
          </button>
        </div>
      </form>
      <style precedence="default" href="cms-client-form">{formStyles}</style>
    </div>
  );
}
