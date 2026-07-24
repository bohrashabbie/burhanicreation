"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  Wrench,
  Star,
  Users,
  Inbox,
  Settings,
  LogOut,
  ChevronRight,
  Zap,
} from "lucide-react";

const navItems = [
  { href: "/cms", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/cms/projects", label: "Projects", icon: FolderOpen },
  { href: "/cms/services", label: "Services", icon: Wrench },
  { href: "/cms/testimonials", label: "Testimonials", icon: Star },
  { href: "/cms/clients", label: "Clients", icon: Users },
  { href: "/cms/leads", label: "Leads", icon: Inbox },
  { href: "/cms/settings", label: "Settings", icon: Settings },
];

export default function CmsSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/cms/auth/logout", { method: "POST" });
    router.push("/cms/login");
  };

  const isActive = (item: { href: string; exact?: boolean }) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <aside className="cms-sidebar">
      <div className="cms-sidebar-brand">
        <div className="cms-brand-icon">
          <Zap size={18} />
        </div>
        <div>
          <div className="cms-brand-name">Burhani CMS</div>
          <div className="cms-brand-sub">Content Management</div>
        </div>
      </div>

      <nav className="cms-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`cms-nav-item ${active ? "cms-nav-item--active" : ""}`}
            >
              <Icon size={16} />
              <span>{item.label}</span>
              {active && <ChevronRight size={14} className="cms-nav-arrow" />}
            </Link>
          );
        })}
      </nav>

      <div className="cms-sidebar-footer">
        <button className="cms-logout-btn" onClick={handleLogout}>
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
        <a href="/" target="_blank" className="cms-view-site">
          View Live Site ↗
        </a>
      </div>

      <style precedence="default" href="cms-sidebar">{`
        .cms-sidebar {
          position: fixed; top: 0; left: 0; bottom: 0; width: 260px;
          background: #0f1117; border-right: 1px solid #1e2332;
          display: flex; flex-direction: column; z-index: 50;
        }
        .cms-sidebar-brand {
          display: flex; align-items: center; gap: 12px;
          padding: 24px 20px 20px; border-bottom: 1px solid #1e2332;
        }
        .cms-brand-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          display: flex; align-items: center; justify-content: center; color: white;
          flex-shrink: 0;
        }
        .cms-brand-name { font-size: 14px; font-weight: 700; color: #f1f5f9; letter-spacing: 0.01em; }
        .cms-brand-sub { font-size: 11px; color: #64748b; margin-top: 1px; }
        .cms-nav { flex: 1; padding: 16px 12px; display: flex; flex-direction: column; gap: 2px; overflow-y: auto; }
        .cms-nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 8px;
          color: #94a3b8; font-size: 13.5px; font-weight: 500;
          text-decoration: none; transition: all 0.15s ease;
          position: relative;
        }
        .cms-nav-item:hover { background: #1a1f2e; color: #e2e8f0; }
        .cms-nav-item--active {
          background: linear-gradient(90deg, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.05) 100%);
          color: #818cf8; border: 1px solid rgba(99,102,241,0.2);
        }
        .cms-nav-arrow { margin-left: auto; }
        .cms-sidebar-footer {
          padding: 16px 12px; border-top: 1px solid #1e2332;
          display: flex; flex-direction: column; gap: 8px;
        }
        .cms-logout-btn {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 8px; border: none;
          background: transparent; color: #64748b; font-size: 13px;
          cursor: pointer; transition: all 0.15s; width: 100%;
        }
        .cms-logout-btn:hover { background: rgba(239,68,68,0.1); color: #f87171; }
        .cms-view-site {
          text-align: center; font-size: 12px; color: #4b5563;
          text-decoration: none; padding: 6px;
          transition: color 0.15s;
        }
        .cms-view-site:hover { color: #818cf8; }
      `}</style>
    </aside>
  );
}
