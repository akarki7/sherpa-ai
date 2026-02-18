"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Mountain,
  Clock,
  TrendingUp,
  Shield,
  ArrowRight,
  Brain,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { treks, type Difficulty, type Region } from "@/data/treks";

/* ─── animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/* ─── filter config ─── */
const difficulties: Difficulty[] = ["Easy", "Moderate", "Hard"];
const regions: Region[] = ["Langtang", "Everest", "Annapurna", "Mustang"];
const durations = [
  { label: "< 7 days", max: 6 },
  { label: "7–10 days", min: 7, max: 10 },
  { label: "11+ days", min: 11 },
];

const difficultyColor: Record<Difficulty, string> = {
  Easy: "bg-forest/15 text-forest-light border-forest/20",
  Moderate: "bg-amber/15 text-amber border-amber/20",
  Hard: "bg-red-500/15 text-red-400 border-red-500/20",
};

function safetyColor(score: number) {
  if (score >= 90) return "text-forest-light";
  if (score >= 85) return "text-amber";
  return "text-red-400";
}

export default function TreksPage() {
  const [query, setQuery] = useState("");
  const [selDifficulty, setSelDifficulty] = useState<Difficulty | null>(null);
  const [selRegion, setSelRegion] = useState<Region | null>(null);
  const [selDuration, setSelDuration] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return treks.filter((t) => {
      if (query && !t.name.toLowerCase().includes(query.toLowerCase()) && !t.region.toLowerCase().includes(query.toLowerCase())) return false;
      if (selDifficulty && t.difficulty !== selDifficulty) return false;
      if (selRegion && t.region !== selRegion) return false;
      if (selDuration !== null) {
        const d = durations[selDuration];
        if (d.min && t.durationDays < d.min) return false;
        if (d.max && t.durationDays > d.max) return false;
      }
      return true;
    });
  }, [query, selDifficulty, selRegion, selDuration]);

  const hasFilters = selDifficulty || selRegion || selDuration !== null || query;

  return (
    <section className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-sm font-medium text-forest-light mb-3"
          >
            Explore Nepal
          </motion.p>
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-3xl sm:text-4xl font-bold tracking-tight"
          >
            Find Your Next{" "}
            <span className="text-forest-light">Adventure</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-4 text-gray-400"
          >
            Browse AI-analyzed treks across Nepal. Every route is safety-scored
            and optimized for your experience level.
          </motion.p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="relative max-w-xl mx-auto mb-8"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search treks by name or region..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-card border border-white/10 rounded-xl text-sm focus:border-forest focus:outline-none transition-colors"
          />
        </motion.div>

        {/* Filter chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {/* Difficulty */}
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setSelDifficulty(selDifficulty === d ? null : d)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                selDifficulty === d
                  ? difficultyColor[d]
                  : "border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {d}
            </button>
          ))}

          <span className="w-px h-5 bg-white/10" />

          {/* Region */}
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setSelRegion(selRegion === r ? null : r)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                selRegion === r
                  ? "bg-forest/15 text-forest-light border-forest/20"
                  : "border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}

          <span className="w-px h-5 bg-white/10" />

          {/* Duration */}
          {durations.map((d, i) => (
            <button
              key={d.label}
              onClick={() => setSelDuration(selDuration === i ? null : i)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                selDuration === i
                  ? "bg-forest/15 text-forest-light border-forest/20"
                  : "border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {d.label}
            </button>
          ))}

          {hasFilters && (
            <button
              onClick={() => {
                setQuery("");
                setSelDifficulty(null);
                setSelRegion(null);
                setSelDuration(null);
              }}
              className="px-3 py-1.5 text-xs font-medium rounded-full border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"
            >
              Clear All
            </button>
          )}
        </motion.div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          {filtered.length} trek{filtered.length !== 1 && "s"} found
        </p>

        {/* Trek grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Mountain className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">
              No treks match your filters. Try adjusting your search.
            </p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((trek, i) => (
              <motion.div
                key={trek.slug}
                variants={fadeUp}
                custom={i}
                className="group rounded-2xl border border-white/5 bg-card overflow-hidden hover:border-white/10 transition-colors"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={trek.image}
                    alt={trek.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

                  {/* Difficulty badge */}
                  <span
                    className={`absolute top-3 left-3 px-2.5 py-0.5 text-xs font-medium rounded-full border ${difficultyColor[trek.difficulty]}`}
                  >
                    {trek.difficulty}
                  </span>

                  {/* Safety score */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-background/70 backdrop-blur-sm border border-white/10">
                    <Shield className="w-3 h-3 text-forest-light" />
                    <span
                      className={`text-xs font-semibold ${safetyColor(trek.aiSafetyScore)}`}
                    >
                      {trek.aiSafetyScore}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                    <MapPin className="w-3 h-3" />
                    {trek.region}
                  </div>

                  <h3 className="text-base font-semibold mb-2 group-hover:text-forest-light transition-colors">
                    {trek.name}
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
                    {trek.description}
                  </p>

                  {/* Meta row */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {trek.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {trek.maxElevation}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <Link
                      href={`/treks/${trek.slug}`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium border border-white/10 hover:border-white/20 text-gray-300 hover:text-white rounded-lg transition-colors"
                    >
                      View Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/treks/${trek.slug}`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium bg-forest hover:bg-forest-light text-white rounded-lg transition-colors"
                    >
                      <Brain className="w-3.5 h-3.5" />
                      Plan with AI
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
