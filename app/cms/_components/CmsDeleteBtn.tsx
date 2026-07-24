"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function CmsDeleteBtn({
  id,
  endpoint,
  label,
}: {
  id: string;
  endpoint: string;
  label: string;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirming) { setConfirming(true); return; }
    setLoading(true);
    try {
      await fetch(`${endpoint}/${id}`, { method: "DELETE" });
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  };

  return (
    <button
      className={`cms-icon-btn cms-icon-btn--danger ${confirming ? "cms-icon-btn--confirming" : ""}`}
      onClick={handleDelete}
      disabled={loading}
      title={confirming ? `Click again to confirm delete ${label}` : `Delete ${label}`}
    >
      {loading ? <span className="cms-mini-spinner" /> : <Trash2 size={14} />}
      <style precedence="default" href="cms-delete-btn">{`
        .cms-icon-btn--confirming {
          background: rgba(239,68,68,0.2) !important;
          border-color: rgba(239,68,68,0.5) !important;
          color: #f87171 !important;
        }
        .cms-mini-spinner {
          width: 12px; height: 12px; border: 2px solid currentColor;
          border-top-color: transparent; border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </button>
  );
}
