"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import Link from "next/link";
import {
  Mountain,
  MapPin,
  Clock,
  TrendingUp,
  Shield,
  Brain,
  Sun,
  Cloud,
  CloudRain,
  Calendar,
  Download,
  Trash2,
  Upload,
  Navigation,
  Heart,
  Wind,
  Thermometer,
  Plus,
  X,
  Activity,
  Route,
  Target,
  CheckCircle,
  Edit3,
  Play,
  FileText,
} from "lucide-react";
import { activeTrek, aiStatus } from "@/lib/fake-data";
import type { Difficulty } from "@/data/treks";

/* ─── animation ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.35, ease: "easeOut" as const },
  }),
};

/* ─── difficulty badge ─── */
const diffBadge: Record<Difficulty, string> = {
  Easy: "bg-forest/15 text-forest-light border-forest/20",
  Moderate: "bg-amber/15 text-amber border-amber/20",
  Hard: "bg-red-500/15 text-red-400 border-red-500/20",
};

/* ─── cumulative stats ─── */
const cumulativeStats = [
  { label: "Treks Completed", value: "12", icon: Mountain },
  { label: "Total Distance", value: "847 km", icon: Route },
  { label: "Elevation Gained", value: "42,380 m", icon: TrendingUp },
  { label: "AI Plans Created", value: "9", icon: Brain },
];

/* ─── upcoming treks ─── */
interface UpcomingTrekData {
  id: number;
  name: string;
  region: string;
  startDate: string;
  duration: string;
  difficulty: Difficulty;
  planStatus: "Planned" | "Not Started";
  weather: { day: string; icon: "sun" | "cloud" | "rain"; high: number }[];
}

const upcomingTreks: UpcomingTrekData[] = [
  {
    id: 1,
    name: "Everest Base Camp Trek",
    region: "Everest",
    startDate: "March 15, 2026",
    duration: "14 days",
    difficulty: "Hard",
    planStatus: "Planned",
    weather: [
      { day: "Day 1", icon: "sun", high: 4 },
      { day: "Day 2", icon: "cloud", high: 2 },
      { day: "Day 3", icon: "sun", high: 3 },
    ],
  },
  {
    id: 2,
    name: "Mardi Himal Trek",
    region: "Annapurna",
    startDate: "April 22, 2026",
    duration: "5 days",
    difficulty: "Moderate",
    planStatus: "Not Started",
    weather: [
      { day: "Day 1", icon: "sun", high: 14 },
      { day: "Day 2", icon: "sun", high: 12 },
      { day: "Day 3", icon: "rain", high: 8 },
    ],
  },
];

/* ─── completed treks ─── */
interface CompletedTrekData {
  id: number;
  name: string;
  region: string;
  completedDate: string;
  distance: string;
  elevation: string;
  duration: string;
  aiAccuracy: number;
  notes: string;
  elevationProfile: { d: number; e: number }[];
}

const completedTreks: CompletedTrekData[] = [
  {
    id: 1,
    name: "Poon Hill Trek",
    region: "Annapurna",
    completedDate: "January 8, 2026",
    distance: "38 km",
    elevation: "2,180 m",
    duration: "4 days",
    aiAccuracy: 94,
    notes: "Perfect sunrise from Poon Hill. The AI weather prediction was spot-on.",
    elevationProfile: [
      { d: 0, e: 1070 }, { d: 3, e: 1200 }, { d: 6, e: 1540 },
      { d: 9, e: 2100 }, { d: 12, e: 2630 }, { d: 15, e: 2860 },
      { d: 18, e: 3210 }, { d: 21, e: 2630 }, { d: 24, e: 1940 },
      { d: 27, e: 1200 }, { d: 30, e: 1070 },
    ],
  },
  {
    id: 2,
    name: "Langtang Valley Trek",
    region: "Langtang",
    completedDate: "November 12, 2025",
    distance: "72 km",
    elevation: "3,850 m",
    duration: "8 days",
    aiAccuracy: 91,
    notes: "Tougher than expected above Ghoda Tabela. AI rest recommendations helped a lot.",
    elevationProfile: [
      { d: 0, e: 1550 }, { d: 5, e: 1800 }, { d: 10, e: 2380 },
      { d: 15, e: 2800 }, { d: 20, e: 3430 }, { d: 25, e: 3870 },
      { d: 30, e: 4773 }, { d: 35, e: 3870 }, { d: 40, e: 2380 },
      { d: 45, e: 1550 },
    ],
  },
  {
    id: 3,
    name: "Gokyo Lakes Trek",
    region: "Everest",
    completedDate: "October 5, 2025",
    distance: "115 km",
    elevation: "4,650 m",
    duration: "13 days",
    aiAccuracy: 88,
    notes: "Gokyo Ri sunrise was unforgettable. Glacier crossing was tricky — AI rerouted us.",
    elevationProfile: [
      { d: 0, e: 2610 }, { d: 8, e: 3440 }, { d: 16, e: 3440 },
      { d: 24, e: 4110 }, { d: 32, e: 4470 }, { d: 40, e: 4790 },
      { d: 48, e: 5357 }, { d: 56, e: 4790 }, { d: 64, e: 4110 },
      { d: 72, e: 3440 }, { d: 80, e: 2860 },
    ],
  },
  {
    id: 4,
    name: "Annapurna Circuit",
    region: "Annapurna",
    completedDate: "April 20, 2025",
    distance: "164 km",
    elevation: "5,416 m",
    duration: "14 days",
    aiAccuracy: 86,
    notes: "Thorong La was brutal but crossing at 4AM as AI suggested meant no wind. Life-saving advice.",
    elevationProfile: [
      { d: 0, e: 820 }, { d: 15, e: 2710 }, { d: 30, e: 3310 },
      { d: 45, e: 3540 }, { d: 60, e: 4018 }, { d: 75, e: 4525 },
      { d: 90, e: 5416 }, { d: 105, e: 3800 }, { d: 120, e: 2720 },
      { d: 135, e: 1190 }, { d: 150, e: 2860 }, { d: 160, e: 1070 },
    ],
  },
  {
    id: 5,
    name: "Upper Mustang Trek",
    region: "Mustang",
    completedDate: "July 15, 2025",
    distance: "98 km",
    elevation: "1,260 m",
    duration: "10 days",
    aiAccuracy: 93,
    notes: "Felt like another planet. Wind predictions were incredibly accurate.",
    elevationProfile: [
      { d: 0, e: 2720 }, { d: 10, e: 2810 }, { d: 20, e: 3050 },
      { d: 30, e: 3475 }, { d: 40, e: 3520 }, { d: 50, e: 3810 },
      { d: 60, e: 3810 }, { d: 70, e: 3400 }, { d: 80, e: 3570 },
      { d: 90, e: 2810 }, { d: 95, e: 2720 },
    ],
  },
];

/* ─── saved plan type ─── */
interface SavedPlan {
  id: number;
  savedAt: string;
  inputs: {
    trekSlug: string;
    startDate: string;
    groupSize: number;
    fitnessLevel: number;
    priority: string;
  };
  trek: string;
  difficultyScore: number;
}

/* ─── small weather icon ─── */
function WeatherIconSmall({ type }: { type: "sun" | "cloud" | "rain" }) {
  const cls = "w-4 h-4";
  if (type === "sun") return <Sun className={`${cls} text-amber`} />;
  if (type === "cloud") return <Cloud className={`${cls} text-gray-400`} />;
  return <CloudRain className={`${cls} text-blue-400`} />;
}

/* ─── mini elevation sparkline ─── */
function ElevationSparkline({ data }: { data: { d: number; e: number }[] }) {
  return (
    <div className="h-16">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1a5c38" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#1a5c38" stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis hide domain={["dataMin - 200", "dataMax + 200"]} />
          <Area
            type="monotone"
            dataKey="e"
            stroke="#237a4b"
            strokeWidth={1.5}
            fill="url(#sparkGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ─── tabs ─── */
type Tab = "upcoming" | "completed" | "saved";
const tabs: { key: Tab; label: string }[] = [
  { key: "upcoming", label: "Upcoming" },
  { key: "completed", label: "Completed" },
  { key: "saved", label: "Saved Plans" },
];

/* ═══════════════════════════════════════════ PAGE ═══════════════════════════════════════════ */
export default function MyTreksPage() {
  const [activeTab, setActiveTab] = useState<Tab>("upcoming");
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);

  /* load saved plans from localStorage */
  useEffect(() => {
    try {
      const raw = localStorage.getItem("sherpa-plans");
      if (raw) setSavedPlans(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const deletePlan = (id: number) => {
    const next = savedPlans.filter((p) => p.id !== id);
    setSavedPlans(next);
    localStorage.setItem("sherpa-plans", JSON.stringify(next));
  };

  return (
    <div className="max-w-6xl space-y-6 pb-20">
      {/* ── Quick Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cumulativeStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={i}
            className="rounded-2xl border border-white/5 bg-card p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500">{stat.label}</span>
              <div className="w-8 h-8 rounded-lg bg-forest/15 flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-forest-light" />
              </div>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* ── Active Trek Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="rounded-2xl border border-forest/20 bg-gradient-to-r from-forest/10 via-card to-card p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-forest-light animate-pulse" />
              <span className="text-xs font-medium text-forest-light uppercase tracking-wider">
                Active Trek
              </span>
            </div>
            <h2 className="text-xl font-bold mb-1">{activeTrek.name}</h2>
            <p className="text-sm text-gray-400">
              Day {activeTrek.currentDay} of {activeTrek.totalDays} · {activeTrek.altitude} altitude
            </p>

            {/* Progress bar */}
            <div className="mt-3 max-w-sm">
              <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
                <span>Progress</span>
                <span>{activeTrek.progress}%</span>
              </div>
              <div className="h-1.5 bg-card-light rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${activeTrek.progress}%` }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="h-full bg-gradient-to-r from-forest to-forest-light rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Live AI status pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Weather", value: aiStatus.weather, icon: Sun, color: "text-amber" },
              { label: "Risk", value: aiStatus.risk, icon: Shield, color: "text-forest-light" },
              { label: "Next Waypoint", value: aiStatus.nextRest, icon: Navigation, color: "text-blue-400" },
            ].map((pill) => (
              <div
                key={pill.label}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-white/5"
              >
                <pill.icon className={`w-3.5 h-3.5 ${pill.color}`} />
                <div>
                  <div className="text-[10px] text-gray-500">{pill.label}</div>
                  <div className="text-xs font-medium">{pill.value}</div>
                </div>
              </div>
            ))}
            <button
              onClick={() => setTrackingOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-forest hover:bg-forest-light text-white text-sm font-medium rounded-lg transition-colors"
            >
              <MapPin className="w-4 h-4" />
              View Live Tracking
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Tabs ── */}
      <div className="flex items-center gap-1 border-b border-white/5">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === t.key ? "text-white" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {t.label}
            {activeTab === t.key && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest-light"
              />
            )}
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      <AnimatePresence mode="wait">
        {/* ── Upcoming ── */}
        {activeTab === "upcoming" && (
          <motion.div
            key="upcoming"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {upcomingTreks.map((trek, i) => (
              <motion.div
                key={trek.id}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={i}
                className="group rounded-2xl border border-white/5 bg-card p-5 hover:border-white/10 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold group-hover:text-forest-light transition-colors">
                        {trek.name}
                      </h3>
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${diffBadge[trek.difficulty]}`}>
                        {trek.difficulty}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{trek.region}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{trek.startDate}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{trek.duration}</span>
                    </div>

                    {/* Plan status */}
                    <div className="mt-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full border ${
                        trek.planStatus === "Planned"
                          ? "bg-forest/10 text-forest-light border-forest/20"
                          : "bg-card-light text-gray-400 border-white/5"
                      }`}>
                        {trek.planStatus === "Planned" ? <CheckCircle className="w-2.5 h-2.5" /> : <FileText className="w-2.5 h-2.5" />}
                        AI Plan: {trek.planStatus}
                      </span>
                    </div>
                  </div>

                  {/* Weather preview */}
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      {trek.weather.map((w) => (
                        <div key={w.day} className="text-center">
                          <WeatherIconSmall type={w.icon} />
                          <div className="text-[10px] text-gray-500 mt-0.5">{w.high}°</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href="/dashboard/planner"
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium border border-white/10 hover:border-white/20 text-gray-300 hover:text-white rounded-lg transition-colors"
                      >
                        <Edit3 className="w-3 h-3" />
                        Edit Plan
                      </Link>
                      <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-forest hover:bg-forest-light text-white rounded-lg transition-colors">
                        <Play className="w-3 h-3" />
                        Start Trek
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── Completed ── */}
        {activeTab === "completed" && (
          <motion.div
            key="completed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {completedTreks.map((trek, i) => (
              <motion.div
                key={trek.id}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={i}
                className="group rounded-2xl border border-white/5 bg-card overflow-hidden hover:border-white/10 transition-colors"
              >
                <div className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                    {/* Left: info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold group-hover:text-forest-light transition-colors">
                          {trek.name}
                        </h3>
                        <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-forest/10 text-forest-light border border-forest/20">
                          Completed
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{trek.region}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{trek.completedDate}</span>
                      </div>

                      {/* Stats row */}
                      <div className="flex flex-wrap gap-4 mb-4">
                        {[
                          { label: "Distance", value: trek.distance, icon: Route },
                          { label: "Elevation", value: trek.elevation, icon: TrendingUp },
                          { label: "Duration", value: trek.duration, icon: Clock },
                        ].map((s) => (
                          <div key={s.label} className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-md bg-card-light flex items-center justify-center">
                              <s.icon className="w-3.5 h-3.5 text-gray-500" />
                            </div>
                            <div>
                              <div className="text-xs font-medium">{s.value}</div>
                              <div className="text-[10px] text-gray-600">{s.label}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* AI accuracy */}
                      <div className="flex items-center gap-2 mb-3">
                        <Brain className="w-3.5 h-3.5 text-forest-light" />
                        <span className="text-xs text-gray-400">
                          AI predictions were <span className="text-forest-light font-medium">{trek.aiAccuracy}% accurate</span>
                        </span>
                      </div>

                      {/* Notes */}
                      <div className="rounded-lg bg-card-light border border-white/5 p-3">
                        <div className="text-[10px] text-gray-500 mb-1">Personal Notes</div>
                        <p className="text-xs text-gray-300 leading-relaxed italic">
                          &ldquo;{trek.notes}&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* Right: sparkline + download */}
                    <div className="lg:w-56 shrink-0">
                      <div className="rounded-xl bg-card-light border border-white/5 p-3 mb-3">
                        <div className="text-[10px] text-gray-500 mb-1">Elevation Profile</div>
                        <ElevationSparkline data={trek.elevationProfile} />
                      </div>
                      <button className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium border border-white/10 hover:border-white/20 text-gray-300 hover:text-white rounded-lg transition-colors">
                        <Download className="w-3.5 h-3.5" />
                        Download Report
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── Saved Plans ── */}
        {activeTab === "saved" && (
          <motion.div
            key="saved"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {savedPlans.length === 0 ? (
              <div className="text-center py-16">
                <Brain className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 text-sm mb-1">No saved plans yet</p>
                <p className="text-xs text-gray-600 mb-5">
                  Create a plan in the AI Planner and hit &ldquo;Save Plan&rdquo;
                </p>
                <Link
                  href="/dashboard/planner"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-forest hover:bg-forest-light text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <Brain className="w-4 h-4" />
                  Open AI Planner
                </Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedPlans.map((plan, i) => {
                  const fitnessMatch = plan.inputs.fitnessLevel
                    ? Math.min(100, 60 + plan.inputs.fitnessLevel * 8)
                    : 75;
                  return (
                    <motion.div
                      key={plan.id}
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      custom={i}
                      className="group rounded-2xl border border-white/5 bg-card p-5 hover:border-white/10 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-9 h-9 rounded-lg bg-forest/15 flex items-center justify-center">
                          <Brain className="w-4 h-4 text-forest-light" />
                        </div>
                        <button
                          onClick={() => deletePlan(plan.id)}
                          className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete plan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h3 className="text-sm font-semibold group-hover:text-forest-light transition-colors mb-1">
                        {plan.trek}
                      </h3>
                      <p className="text-[10px] text-gray-500 mb-4">
                        Created {new Date(plan.savedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>

                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex-1">
                          <div className="text-[10px] text-gray-500 mb-0.5">Fitness Match</div>
                          <div className="text-sm font-semibold text-forest-light">{fitnessMatch}%</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] text-gray-500 mb-0.5">Difficulty</div>
                          <div className="text-sm font-semibold text-amber">{plan.difficultyScore}/100</div>
                        </div>
                      </div>

                      <Link
                        href="/dashboard/planner"
                        className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium bg-forest/10 hover:bg-forest/20 text-forest-light border border-forest/20 rounded-lg transition-colors"
                      >
                        <Upload className="w-3 h-3" />
                        Load Plan
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Live Tracking Modal ── */}
      <AnimatePresence>
        {trackingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setTrackingOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl border border-white/10 bg-card shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-forest-light animate-pulse" />
                  <h2 className="text-sm font-semibold">Live Tracking — {activeTrek.name}</h2>
                </div>
                <button
                  onClick={() => setTrackingOpen(false)}
                  className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Fake map */}
              <div className="relative h-56 bg-card-light flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-forest/5 via-transparent to-amber/5" />
                {/* Grid lines */}
                <div className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                {/* Trail line */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 224">
                  <path
                    d="M 40 180 Q 100 160 150 130 T 250 90 T 350 60 T 430 40"
                    stroke="#237a4b"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                    fill="none"
                    opacity="0.6"
                  />
                  {/* Current position */}
                  <circle cx="310" cy="70" r="6" fill="#f59e0b" stroke="#0a0a0a" strokeWidth="2" />
                  <circle cx="310" cy="70" r="12" fill="#f59e0b" opacity="0.2">
                    <animate attributeName="r" values="12;18;12" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.2;0.05;0.2" dur="2s" repeatCount="indefinite" />
                  </circle>
                  {/* Start marker */}
                  <circle cx="40" cy="180" r="4" fill="#6b7280" />
                  <text x="50" y="195" fill="#6b7280" fontSize="9">Start</text>
                  {/* End marker */}
                  <circle cx="430" cy="40" r="4" fill="#237a4b" />
                  <text x="410" y="30" fill="#6b7280" fontSize="9">End</text>
                </svg>
                <div className="relative text-xs text-gray-500">
                  Interactive map available in mobile app
                </div>
              </div>

              {/* Real-time stats */}
              <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: TrendingUp, label: "Altitude", value: activeTrek.altitude, color: "text-amber" },
                  { icon: Heart, label: "Heart Rate", value: "78 bpm", color: "text-red-400" },
                  { icon: Activity, label: "SpO2", value: aiStatus.o2Saturation, color: "text-forest-light" },
                  { icon: Thermometer, label: "Temp", value: "8°C", color: "text-blue-400" },
                  { icon: Navigation, label: "Next Stop", value: activeTrek.distanceToNext, color: "text-forest-light" },
                  { icon: Wind, label: "Wind", value: "6 km/h", color: "text-gray-300" },
                  { icon: Target, label: "Pace", value: "3.2 km/h", color: "text-amber" },
                  { icon: Clock, label: "ETA", value: "1h 18m", color: "text-gray-300" },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg bg-card-light p-2.5">
                    <div className="flex items-center gap-1 text-[10px] text-gray-500 mb-0.5">
                      <s.icon className="w-3 h-3" />
                      {s.label}
                    </div>
                    <div className={`text-sm font-semibold ${s.color}`}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 pb-4">
                <div className="rounded-lg bg-forest/5 border border-forest/20 p-3 flex items-start gap-2">
                  <Brain className="w-4 h-4 text-forest-light shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-400">
                    <span className="text-forest-light font-medium">AI:</span> {aiStatus.recommendation}. Weather looks clear for the next 48 hours. You&apos;re on track for Day {activeTrek.currentDay} targets.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Action Button ── */}
      <Link
        href="/dashboard/planner"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-30 flex items-center gap-2 px-4 py-3 bg-forest hover:bg-forest-light text-white text-sm font-medium rounded-full shadow-lg shadow-forest/30 transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span className="hidden sm:inline">Plan New Trek</span>
      </Link>
    </div>
  );
}
