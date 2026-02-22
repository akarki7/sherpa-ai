"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Users } from "lucide-react";
import { type Guide, getGuides } from "@/lib/guides";
import GuideCard from "@/components/dashboard/guides/GuideCard";

type ExperienceTier = "0-3" | "3-7" | "7+";
type SortKey = "rating" | "experience" | "price";

const SPECIALIZATIONS = [
  "Everest Base Camp",
  "Annapurna Circuit",
  "Annapurna Base Camp",
  "Langtang Valley Trek",
  "Gokyo Lakes Trek",
  "Three Passes Trek",
  "Upper Mustang Trek",
  "Manaslu Circuit",
  "Dhaulagiri Circuit",
  "Kanchenjunga Trek",
];

const EXP_TIERS: { label: string; value: ExperienceTier }[] = [
  { label: "0–3 yrs", value: "0-3" },
  { label: "3–7 yrs", value: "3-7" },
  { label: "7+ yrs", value: "7+" },
];

export default function GuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [search, setSearch] = useState("");
  const [specFilter, setSpecFilter] = useState<string | null>(null);
  const [expFilter, setExpFilter] = useState<ExperienceTier | null>(null);
  const [availOnly, setAvailOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("rating");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setGuides(getGuides());
  }, []);

  const filtered = useMemo(() => {
    let result = [...guides];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.location.toLowerCase().includes(q) ||
          g.specializations.some((s) => s.toLowerCase().includes(q)) ||
          g.languages.some((l) => l.toLowerCase().includes(q)),
      );
    }

    if (specFilter) {
      result = result.filter((g) =>
        g.specializations.some((s) => s === specFilter),
      );
    }

    if (expFilter) {
      result = result.filter((g) => {
        if (expFilter === "0-3") return g.experience < 3;
        if (expFilter === "3-7") return g.experience >= 3 && g.experience < 7;
        return g.experience >= 7;
      });
    }

    if (availOnly) {
      result = result.filter((g) => g.availability);
    }

    result.sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "experience") return b.experience - a.experience;
      return a.pricePerDay - b.pricePerDay;
    });

    return result;
  }, [guides, search, specFilter, expFilter, availOnly, sort]);

  const hasFilters = specFilter || expFilter || availOnly;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Find a Guide</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Book certified Himalayan trekking guides
          </p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg border transition-colors ${
            showFilters || hasFilters
              ? "bg-forest/10 text-forest-light border-forest/20"
              : "border-white/10 text-gray-400 hover:text-white hover:border-white/20"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {hasFilters && (
            <span className="w-2 h-2 rounded-full bg-forest-light" />
          )}
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, location, specialization, or language…"
          className="w-full pl-9 pr-4 py-2.5 bg-card-light border border-white/10 rounded-lg text-sm focus:border-forest focus:outline-none placeholder:text-gray-600"
        />
      </div>

      {/* Filter panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-card border border-white/5 p-4 space-y-4"
        >
          {/* Specialization */}
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">Specialization</p>
            <div className="flex flex-wrap gap-1.5">
              {SPECIALIZATIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSpecFilter(specFilter === s ? null : s)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                    specFilter === s
                      ? "bg-forest/15 text-forest-light border-forest/20"
                      : "border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">Experience</p>
            <div className="flex gap-1.5">
              {EXP_TIERS.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setExpFilter(expFilter === t.value ? null : t.value)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                    expFilter === t.value
                      ? "bg-forest/15 text-forest-light border-forest/20"
                      : "border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Availability + clear */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setAvailOnly(!availOnly)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-full border transition-colors ${
                availOnly
                  ? "bg-forest/15 text-forest-light border-forest/20"
                  : "border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
              }`}
            >
              Available now only
            </button>
            {hasFilters && (
              <button
                onClick={() => {
                  setSpecFilter(null);
                  setExpFilter(null);
                  setAvailOnly(false);
                }}
                className="text-xs text-red-400 hover:text-red-300 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Sort + count */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-xs text-gray-500">
          {filtered.length} guide{filtered.length !== 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-600">Sort:</span>
          {(["rating", "experience", "price"] as SortKey[]).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                sort === s
                  ? "bg-forest/15 text-forest-light border-forest/20"
                  : "border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {s === "rating" ? "Rating" : s === "experience" ? "Experience" : "Price"}
            </button>
          ))}
        </div>
      </div>

      {/* Guide grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Users className="w-10 h-10 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">No guides match your search.</p>
          <button
            onClick={() => {
              setSearch("");
              setSpecFilter(null);
              setExpFilter(null);
              setAvailOnly(false);
            }}
            className="mt-3 text-xs text-forest-light hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((guide, i) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <GuideCard guide={guide} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
