"use client";

import { motion } from "framer-motion";
import { Route, TrendingUp, Footprints, Heart } from "lucide-react";
import { quickStats } from "@/lib/fake-data";

const icons = [Route, TrendingUp, Footprints, Heart];

export default function QuickStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {quickStats.map((stat, i) => {
        const Icon = icons[i];
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 * i }}
            className="rounded-2xl border border-white/5 bg-card p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500">{stat.label}</span>
              <div className="w-8 h-8 rounded-lg bg-forest/15 flex items-center justify-center">
                <Icon className="w-4 h-4 text-forest-light" />
              </div>
            </div>
            <div className="text-2xl font-bold">
              {stat.value}
              {stat.unit && (
                <span className="text-sm font-normal text-gray-500 ml-1">
                  {stat.unit}
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500 mt-1">{stat.change}</div>
          </motion.div>
        );
      })}
    </div>
  );
}
