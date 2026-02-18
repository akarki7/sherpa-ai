"use client";

import { motion } from "framer-motion";
import { Mountain, MapPin, ArrowRight } from "lucide-react";
import { activeTrek } from "@/lib/fake-data";

export default function ActiveTrekCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-2xl border border-white/5 bg-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-400">Active Trek</h3>
        <div className="w-10 h-10 rounded-lg bg-forest/15 flex items-center justify-center">
          <Mountain className="w-5 h-5 text-forest-light" />
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-1">{activeTrek.name}</h2>
      <p className="text-sm text-gray-500 mb-4">
        Day {activeTrek.currentDay} of {activeTrek.totalDays}
      </p>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
          <span>Progress</span>
          <span>{activeTrek.progress}%</span>
        </div>
        <div className="h-2 bg-card-light rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${activeTrek.progress}%` }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-full bg-gradient-to-r from-forest to-forest-light rounded-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-card-light p-3">
          <div className="text-xs text-gray-500">Altitude</div>
          <div className="text-sm font-semibold text-amber">{activeTrek.altitude}</div>
        </div>
        <div className="rounded-lg bg-card-light p-3">
          <div className="text-xs text-gray-500">Next Stop</div>
          <div className="text-sm font-semibold text-forest-light flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {activeTrek.distanceToNext}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1 text-xs text-forest-light">
        <ArrowRight className="w-3 h-3" />
        <span>{activeTrek.nextStop}</span>
      </div>
    </motion.div>
  );
}
