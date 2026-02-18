"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Info, CheckCircle } from "lucide-react";
import { recentAlerts } from "@/lib/fake-data";

const severityConfig = {
  warning: { dot: "bg-amber", icon: AlertTriangle, color: "text-amber" },
  info: { dot: "bg-blue-400", icon: Info, color: "text-blue-400" },
  success: { dot: "bg-forest-light", icon: CheckCircle, color: "text-forest-light" },
};

export default function RecentAlerts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-2xl border border-white/5 bg-card p-6"
    >
      <h3 className="text-sm font-medium text-gray-400 mb-4">Recent Alerts</h3>

      <div className="space-y-3">
        {recentAlerts.map((alert) => {
          const cfg = severityConfig[alert.severity];
          const Icon = cfg.icon;
          return (
            <div
              key={alert.id}
              className="flex items-start gap-3 rounded-lg bg-card-light p-3"
            >
              <div className={`mt-0.5 ${cfg.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                  <span className="text-sm font-medium truncate">
                    {alert.title}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {alert.description}
                </p>
                <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
