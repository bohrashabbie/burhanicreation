"use client";

import { useState, useEffect } from "react";
import { Save, AlertCircle, CheckCircle } from "lucide-react";
import { formStyles } from "@/app/cms/_components/ProjectForm";

type Stat = { value: number; suffix: string; labelEn: string; labelAr: string };

export default function SettingsPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [contact, setContact] = useState({ email: "", phone: "", whatsapp: "", address: "" });
  const [socials, setSocials] = useState({ instagram: "", facebook: "", whatsapp: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/cms/settings")
      .then((r) => r.json())
      .then((data) => {
        setStats(data.stats ?? []);
        setContact(data.contact ?? {});
        setSocials(data.socials ?? {});
        setLoading(false);
      });
  }, []);

  const saveSetting = async (key: string, value: unknown) => {
    const res = await fetch("/api/cms/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
    if (!res.ok) throw new Error("Failed to save");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      await Promise.all([
        saveSetting("stats", stats),
        saveSetting("contact", contact),
        saveSetting("socials", socials),
      ]);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  const updateStat = (i: number, k: keyof Stat, v: string | number) =>
    setStats((prev) => prev.map((s, idx) => (idx === i ? { ...s, [k]: v } : s)));

  if (loading) return <div style={{ color: "#64748b", padding: 32 }}>Loading settings…</div>;

  return (
    <div className="cms-form-root">
      <div className="cms-form-header">
        <h1 className="cms-form-title">Site Settings</h1>
      </div>

      <form onSubmit={handleSave} className="cms-form">
        {error && <div className="cms-form-error"><AlertCircle size={14} /> {error}</div>}
        {success && (
          <div className="settings-success"><CheckCircle size={14} /> Settings saved successfully.</div>
        )}

        {/* Stats */}
        <section>
          <h3 className="settings-section-title">Homepage Stats</h3>
          {stats.map((stat, i) => (
            <div key={i} className="settings-stat-row">
              <div className="cms-field">
                <label className="cms-label">Value</label>
                <input type="number" step="0.1" className="cms-input" value={stat.value}
                  onChange={(e) => updateStat(i, "value", parseFloat(e.target.value))} />
              </div>
              <div className="cms-field">
                <label className="cms-label">Suffix</label>
                <input className="cms-input" value={stat.suffix}
                  onChange={(e) => updateStat(i, "suffix", e.target.value)} />
              </div>
              <div className="cms-field" style={{ flex: 2 }}>
                <label className="cms-label">Label (EN)</label>
                <input className="cms-input" value={stat.labelEn}
                  onChange={(e) => updateStat(i, "labelEn", e.target.value)} />
              </div>
              <div className="cms-field" style={{ flex: 2 }}>
                <label className="cms-label">Label (AR)</label>
                <input className="cms-input" dir="rtl" value={stat.labelAr}
                  onChange={(e) => updateStat(i, "labelAr", e.target.value)} />
              </div>
            </div>
          ))}
        </section>

        {/* Contact */}
        <section>
          <h3 className="settings-section-title">Contact Info</h3>
          <div className="cms-form-grid-2">
            <div className="cms-field"><label className="cms-label">Email</label>
              <input className="cms-input" value={contact.email ?? ""} onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))} /></div>
            <div className="cms-field"><label className="cms-label">Phone</label>
              <input className="cms-input" value={contact.phone ?? ""} onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))} /></div>
          </div>
          <div className="cms-field" style={{ marginTop: 16 }}><label className="cms-label">Address</label>
            <input className="cms-input" value={contact.address ?? ""} onChange={(e) => setContact((c) => ({ ...c, address: e.target.value }))} /></div>
        </section>

        {/* Socials */}
        <section>
          <h3 className="settings-section-title">Social Links</h3>
          <div className="cms-field"><label className="cms-label">Instagram URL</label>
            <input className="cms-input" value={socials.instagram ?? ""} onChange={(e) => setSocials((s) => ({ ...s, instagram: e.target.value }))} /></div>
          <div className="cms-field" style={{ marginTop: 16 }}><label className="cms-label">Facebook URL</label>
            <input className="cms-input" value={socials.facebook ?? ""} onChange={(e) => setSocials((s) => ({ ...s, facebook: e.target.value }))} /></div>
          <div className="cms-field" style={{ marginTop: 16 }}><label className="cms-label">WhatsApp Link</label>
            <input className="cms-input" value={socials.whatsapp ?? ""} onChange={(e) => setSocials((s) => ({ ...s, whatsapp: e.target.value }))} /></div>
        </section>

        <div className="cms-form-actions">
          <button type="submit" className="cms-btn cms-btn--primary" disabled={saving}>
            {saving ? <span className="cms-spinner" /> : <Save size={15} />}
            Save All Settings
          </button>
        </div>
      </form>

      <style precedence="default" href="cms-settings-page">{`
        ${formStyles}
        .settings-section-title {
          font-size: 13px; font-weight: 700; color: #94a3b8;
          text-transform: uppercase; letter-spacing: 0.06em;
          margin-bottom: 16px; padding-bottom: 12px;
          border-bottom: 1px solid #1e2332;
        }
        .settings-stat-row {
          display: flex; gap: 16px; margin-bottom: 16px; flex-wrap: wrap;
        }
        .settings-stat-row .cms-field { flex: 1; min-width: 100px; }
        .settings-success {
          display: flex; align-items: center; gap: 8px;
          background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.2);
          border-radius: 8px; padding: 12px 14px; color: #34d399; font-size: 13px;
        }
      `}</style>
    </div>
  );
}
