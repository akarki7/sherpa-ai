"use client";

import { Bell, LogOut } from "lucide-react";
import type { User } from "@/lib/auth";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function TopBar({
  user,
  onLogout,
}: {
  user: User;
  onLogout: () => void;
}) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <header className="h-16 border-b border-white/5 bg-card/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-6">
      <div>
        <h1 className="text-sm sm:text-base font-semibold">
          {greeting},{" "}
          <span className="text-forest-light">{user.name.split(" ")[0]}</span>
        </h1>
        <p className="text-xs text-gray-500 hidden sm:block">
          Here&apos;s your trekking overview
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button className="relative p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-forest/20 border border-forest/30 flex items-center justify-center text-xs font-semibold text-forest-light">
          {getInitials(user.name)}
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
