"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Map,
  Brain,
  AlertTriangle,
  Settings,
  Mountain,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Map, label: "My Treks", href: "/dashboard/treks" },
  { icon: Brain, label: "AI Planner", href: "/dashboard/planner" },
  { icon: AlertTriangle, label: "Safety Alerts", href: "/dashboard/alerts" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex flex-col fixed left-0 top-0 h-screen bg-card border-r border-white/5 z-40 transition-all duration-300 ${collapsed ? "w-[72px]" : "w-60"}`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 h-16 border-b border-white/5 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-forest flex items-center justify-center shrink-0">
            <Mountain className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold tracking-tight whitespace-nowrap">
              Sherpa <span className="text-forest-light">AI</span>
            </span>
          )}
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors group"
            >
              <item.icon className="w-5 h-5 shrink-0 group-hover:text-forest-light transition-colors" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mx-3 mb-4 flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-white/5 z-40 flex items-center justify-around py-2 px-1">
        {navItems.slice(0, 4).map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-1 px-3 py-1.5 text-gray-500 hover:text-forest-light transition-colors"
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px]">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
