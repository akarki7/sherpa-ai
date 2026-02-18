"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { elevationData } from "@/lib/fake-data";

// Current position is at distance 21
const CURRENT_IDX = elevationData.findIndex((d) => d.label === "Current Position");
const currentPoint = elevationData[CURRENT_IDX];

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: (typeof elevationData)[0] }>;
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg bg-card border border-white/10 px-3 py-2 text-xs shadow-lg">
      <div className="font-semibold text-white">{d.elevation}m</div>
      <div className="text-gray-400">{d.distance} km</div>
      {d.label && <div className="text-forest-light mt-0.5">{d.label}</div>}
    </div>
  );
}

export default function ElevationChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="rounded-2xl border border-white/5 bg-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-medium text-gray-400">
            Elevation Profile
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">Langtang Valley Trek</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-forest" />
            Elevation
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber" />
            Current
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={elevationData}
            margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1a5c38" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#1a5c38" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="distance"
              tick={{ fontSize: 11, fill: "#6b7280" }}
              tickFormatter={(v: number) => `${v}km`}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#6b7280" }}
              tickFormatter={(v: number) => `${v}m`}
              axisLine={false}
              tickLine={false}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="elevation"
              stroke="#237a4b"
              strokeWidth={2}
              fill="url(#elevGrad)"
            />
            {currentPoint && (
              <ReferenceDot
                x={currentPoint.distance}
                y={currentPoint.elevation}
                r={6}
                fill="#f59e0b"
                stroke="#0a0a0a"
                strokeWidth={2}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
