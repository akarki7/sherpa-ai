"use client";

import { motion } from "framer-motion";
import { Brain, CloudSun, Shield, Navigation } from "lucide-react";
import { aiStatus } from "@/lib/fake-data";

const rows = [
  { icon: CloudSun, label: "Weather", value: aiStatus.weather },
  { icon: Shield, label: "Risk Level", value: aiStatus.risk, valueColor: "text-forest-light" },
  { icon: Navigation, label: "Next Rest", value: aiStatus.nextRest },
];

export default function AIStatusWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="rounded-2xl border border-white/5 bg-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-400">AI Status</h3>
        <div className="w-10 h-10 rounded-lg bg-forest/15 flex items-center justify-center">
          <Brain className="w-5 h-5 text-forest-light" />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-forest-light animate-pulse" />
        <span className="text-sm font-semibold text-forest-light">Active &amp; Monitoring</span>
      </div>

      <div className="space-y-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between rounded-lg bg-card-light p-3"
          >
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <row.icon className="w-4 h-4" />
              {row.label}
            </div>
            <span className={`text-sm font-medium ${row.valueColor ?? "text-white"}`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-gray-500 italic">
        &quot;{aiStatus.recommendation}&quot;
      </p>
    </motion.div>
  );
}
