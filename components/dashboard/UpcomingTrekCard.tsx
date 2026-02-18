"use client";

import { motion } from "framer-motion";
import { Calendar, TrendingUp, Mountain } from "lucide-react";
import { upcomingTrek } from "@/lib/fake-data";

export default function UpcomingTrekCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
      className="rounded-2xl border border-white/5 bg-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-400">Upcoming Trek</h3>
        <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-amber/15 text-amber border border-amber/20">
          {upcomingTrek.status}
        </span>
      </div>

      <h2 className="text-lg font-semibold mb-1">{upcomingTrek.name}</h2>

      <div className="space-y-2.5 mt-4">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>{upcomingTrek.startDate}</span>
          <span className="text-gray-600">·</span>
          <span>{upcomingTrek.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <TrendingUp className="w-4 h-4" />
          <span>Difficulty: {upcomingTrek.difficulty}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Mountain className="w-4 h-4" />
          <span>Max Altitude: {upcomingTrek.maxAltitude}</span>
        </div>
      </div>

      <button className="mt-5 w-full py-2 text-sm font-medium text-forest-light border border-forest/30 hover:bg-forest/10 rounded-lg transition-colors">
        View Details
      </button>
    </motion.div>
  );
}
