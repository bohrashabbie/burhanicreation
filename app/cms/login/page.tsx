"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function CmsLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/cms/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/cms");
      } else {
        setError(data.error || "Invalid credentials.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      {/* Background orbs */}
      <div className="login-orb login-orb-1" />
      <div className="login-orb login-orb-2" />

      <div className="login-card">
        <div className="login-brand">
          <div className="login-brand-icon">
            <Zap size={24} />
          </div>
          <h1 className="login-title">Burhani CMS</h1>
          <p className="login-sub">Sign in to manage your content</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label className="login-label">
              <Lock size={14} />
              Admin Password
            </label>
            <div className="login-input-wrap">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                placeholder="Enter your CMS password"
                required
                autoFocus
              />
              <button
                type="button"
                className="login-eye"
                onClick={() => setShow(!show)}
                tabIndex={-1}
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="login-error">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <button type="submit" className="login-btn" disabled={loading || !password}>
            {loading ? (
              <span className="login-spinner" />
            ) : (
              "Sign In to CMS"
            )}
          </button>
        </form>

        <p className="login-footer">
          Burhani Creation Digital Agency · Admin Portal
        </p>
      </div>

      <style precedence="default" href="cms-login-page">{`
        .login-root {
          min-height: 100vh; display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden; background: #050608;
        }
        .login-orb {
          position: absolute; border-radius: 50%;
          filter: blur(80px); opacity: 0.15; pointer-events: none;
        }
        .login-orb-1 {
          width: 500px; height: 500px; top: -100px; left: -100px;
          background: radial-gradient(circle, #6366f1, transparent);
        }
        .login-orb-2 {
          width: 400px; height: 400px; bottom: -80px; right: -80px;
          background: radial-gradient(circle, #8b5cf6, transparent);
        }
        .login-card {
          position: relative; z-index: 1;
          background: rgba(15,17,23,0.9);
          border: 1px solid #1e2332;
          border-radius: 20px;
          padding: 48px;
          width: 100%; max-width: 440px;
          backdrop-filter: blur(20px);
          box-shadow: 0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03);
        }
        .login-brand {
          text-align: center; margin-bottom: 36px;
        }
        .login-brand-icon {
          width: 56px; height: 56px; border-radius: 16px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px; color: white;
          box-shadow: 0 8px 24px rgba(99,102,241,0.4);
        }
        .login-title {
          font-size: 24px; font-weight: 800; color: #f1f5f9;
          letter-spacing: -0.02em; margin-bottom: 6px;
        }
        .login-sub { font-size: 14px; color: #64748b; }
        .login-form { display: flex; flex-direction: column; gap: 20px; }
        .login-field { display: flex; flex-direction: column; gap: 8px; }
        .login-label {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px; font-weight: 600; color: #94a3b8;
          text-transform: uppercase; letter-spacing: 0.06em;
        }
        .login-input-wrap { position: relative; }
        .login-input {
          width: 100%; padding: 14px 44px 14px 16px;
          background: #0a0b10; border: 1px solid #1e2332;
          border-radius: 10px; color: #e2e8f0; font-size: 15px;
          outline: none; transition: border-color 0.2s;
        }
        .login-input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
        .login-input::placeholder { color: #374151; }
        .login-eye {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer; color: #4b5563;
          display: flex; align-items: center; padding: 4px;
          transition: color 0.15s;
        }
        .login-eye:hover { color: #94a3b8; }
        .login-error {
          display: flex; align-items: center; gap: 8px;
          background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2);
          border-radius: 8px; padding: 12px 14px;
          color: #f87171; font-size: 13px;
        }
        .login-btn {
          padding: 14px; border-radius: 10px; border: none; cursor: pointer;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white; font-size: 15px; font-weight: 600;
          transition: opacity 0.2s, transform 0.1s;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(99,102,241,0.35);
        }
        .login-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .login-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .login-spinner {
          width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .login-footer {
          text-align: center; margin-top: 28px;
          font-size: 12px; color: #374151;
        }
      `}</style>
    </div>
  );
}
