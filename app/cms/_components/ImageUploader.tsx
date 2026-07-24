"use client";

import { useState, useEffect, useRef } from "react";
import { Upload, Image as ImageIcon, X, FolderOpen, Link as LinkIcon, Check, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
}

interface MediaItem {
  name: string;
  url: string;
}

export default function ImageUploader({
  value,
  onChange,
  label = "Image",
  required = false,
}: ImageUploaderProps) {
  const [tab, setTab] = useState<"upload" | "library" | "url">("upload");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (tab === "library") {
      fetchMedia();
    }
  }, [tab]);

  const fetchMedia = async () => {
    setLoadingMedia(true);
    try {
      const res = await fetch("/api/cms/upload");
      if (res.ok) {
        const data = await res.json();
        setMediaList(data);
      }
    } catch {
      // ignore error
    } finally {
      setLoadingMedia(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/cms/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        onChange(data.url);
      } else {
        setError(data.error || "Failed to upload image.");
      }
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="img-up-root">
      <div className="img-up-label-row">
        <label className="cms-label">{label} {required && "*"}</label>
        {value && (
          <button
            type="button"
            className="img-up-remove-btn"
            onClick={() => onChange("")}
          >
            <X size={13} /> Remove
          </button>
        )}
      </div>

      {value ? (
        <div className="img-up-preview-card">
          <img src={value} alt="Preview" className="img-up-preview-img" />
          <div className="img-up-preview-info">
            <span className="img-up-preview-url">{value}</span>
            <button
              type="button"
              className="img-up-change-btn"
              onClick={() => onChange("")}
            >
              Change Image
            </button>
          </div>
        </div>
      ) : (
        <div className="img-up-box">
          <div className="img-up-tabs">
            <button
              type="button"
              className={`img-up-tab ${tab === "upload" ? "img-up-tab--active" : ""}`}
              onClick={() => setTab("upload")}
            >
              <Upload size={13} /> Upload File
            </button>
            <button
              type="button"
              className={`img-up-tab ${tab === "library" ? "img-up-tab--active" : ""}`}
              onClick={() => setTab("library")}
            >
              <FolderOpen size={13} /> Media Library
            </button>
            <button
              type="button"
              className={`img-up-tab ${tab === "url" ? "img-up-tab--active" : ""}`}
              onClick={() => setTab("url")}
            >
              <LinkIcon size={13} /> External URL
            </button>
          </div>

          {error && <div className="img-up-error">{error}</div>}

          {tab === "upload" && (
            <div
              className={`img-up-dropzone ${isDragging ? "img-up-dropzone--active" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                }}
              />
              {uploading ? (
                <div className="img-up-loading">
                  <Loader2 size={24} className="animate-spin" />
                  <span>Uploading image to /public/media...</span>
                </div>
              ) : (
                <>
                  <div className="img-up-icon">
                    <ImageIcon size={24} />
                  </div>
                  <p className="img-up-drag-text">
                    Drag & drop an image here, or <span className="img-up-highlight">browse</span>
                  </p>
                  <p className="img-up-hint">PNG, JPG, WEBP, SVG up to 10MB (stored in /public/media)</p>
                </>
              )}
            </div>
          )}

          {tab === "library" && (
            <div className="img-up-gallery">
              {loadingMedia ? (
                <div className="img-up-loading">
                  <Loader2 size={20} className="animate-spin" />
                  <span>Loading media library...</span>
                </div>
              ) : mediaList.length === 0 ? (
                <div className="img-up-empty">
                  No images in media library yet. Upload one!
                </div>
              ) : (
                <div className="img-up-grid">
                  {mediaList.map((item) => (
                    <div
                      key={item.url}
                      className="img-up-grid-item"
                      onClick={() => onChange(item.url)}
                    >
                      <img src={item.url} alt={item.name} />
                      <div className="img-up-grid-hover">
                        <Check size={16} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "url" && (
            <div className="img-up-url-wrap">
              <input
                type="text"
                className="cms-input"
                placeholder="https://images.unsplash.com/..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
              />
              <p className="img-up-hint">Paste an external image link</p>
            </div>
          )}
        </div>
      )}

      <style precedence="default" href="cms-image-uploader">{`
        .img-up-root { display: flex; flex-direction: column; gap: 8px; }
        .img-up-label-row { display: flex; align-items: center; justify-content: space-between; }
        .img-up-remove-btn {
          background: none; border: none; color: #f87171; font-size: 12px;
          cursor: pointer; display: inline-flex; align-items: center; gap: 4px;
        }
        .img-up-remove-btn:hover { text-decoration: underline; }
        .img-up-preview-card {
          display: flex; align-items: center; gap: 16px;
          background: #0a0b10; border: 1px solid #1e2332; border-radius: 10px; padding: 12px;
        }
        .img-up-preview-img {
          width: 64px; height: 64px; object-fit: cover; border-radius: 8px;
          border: 1px solid #1e2332; background: #151923;
        }
        .img-up-preview-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px; }
        .img-up-preview-url { font-size: 12px; color: #94a3b8; word-break: break-all; }
        .img-up-change-btn {
          align-self: flex-start; background: #1a1f2e; border: 1px solid #1e2332;
          color: #818cf8; font-size: 11px; font-weight: 600; padding: 4px 10px;
          border-radius: 6px; cursor: pointer; transition: all 0.15s;
        }
        .img-up-change-btn:hover { background: rgba(99,102,241,0.15); }
        .img-up-box {
          background: #0a0b10; border: 1px solid #1e2332; border-radius: 10px; overflow: hidden;
        }
        .img-up-tabs {
          display: flex; border-bottom: 1px solid #1e2332; background: #0f1117;
        }
        .img-up-tab {
          flex: 1; padding: 10px; background: none; border: none; color: #64748b;
          font-size: 12px; font-weight: 600; cursor: pointer; display: flex;
          align-items: center; justify-content: center; gap: 6px; transition: all 0.15s;
        }
        .img-up-tab:hover { color: #94a3b8; }
        .img-up-tab--active { color: #818cf8; background: #0a0b10; border-bottom: 2px solid #6366f1; }
        .img-up-dropzone {
          padding: 32px 20px; text-align: center; cursor: pointer;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 8px; transition: all 0.2s;
        }
        .img-up-dropzone:hover, .img-up-dropzone--active {
          background: rgba(99,102,241,0.05); border-color: #6366f1;
        }
        .img-up-icon {
          width: 44px; height: 44px; border-radius: 12px; background: rgba(99,102,241,0.15);
          color: #818cf8; display: flex; align-items: center; justify-content: center;
        }
        .img-up-drag-text { font-size: 13px; color: #e2e8f0; }
        .img-up-highlight { color: #818cf8; font-weight: 600; text-decoration: underline; }
        .img-up-hint { font-size: 11px; color: #64748b; margin-top: 2px; }
        .img-up-loading {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          color: #818cf8; font-size: 13px; padding: 24px;
        }
        .img-up-error {
          background: rgba(239,68,68,0.1); color: #f87171; padding: 8px 12px;
          font-size: 12px; border-bottom: 1px solid rgba(239,68,68,0.2);
        }
        .img-up-gallery { padding: 12px; max-height: 200px; overflow-y: auto; }
        .img-up-empty { padding: 24px; text-align: center; color: #4b5563; font-size: 13px; }
        .img-up-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(64px, 1fr)); gap: 8px; }
        .img-up-grid-item {
          aspect-ratio: 1; border-radius: 6px; overflow: hidden; border: 1px solid #1e2332;
          position: relative; cursor: pointer; transition: transform 0.15s;
        }
        .img-up-grid-item:hover { transform: scale(1.05); border-color: #6366f1; }
        .img-up-grid-item img { width: 100%; height: 100%; object-fit: cover; }
        .img-up-grid-hover {
          position: absolute; inset: 0; background: rgba(99,102,241,0.6);
          display: flex; align-items: center; justify-content: center; color: white;
          opacity: 0; transition: opacity 0.15s;
        }
        .img-up-grid-item:hover .img-up-grid-hover { opacity: 1; }
        .img-up-url-wrap { padding: 16px; display: flex; flex-direction: column; gap: 6px; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
