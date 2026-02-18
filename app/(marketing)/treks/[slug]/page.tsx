"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Mountain,
  TrendingUp,
  Clock,
  Calendar,
  Shield,
  Brain,
  ChevronDown,
  ArrowLeft,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudSun,
  Wind,
  AlertTriangle,
  Target,
  Heart,
  Thermometer,
} from "lucide-react";
import { getTrekBySlug, type Difficulty, type WeatherDay } from "@/data/treks";

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

function WeatherIcon({ condition }: { condition: WeatherDay["condition"] }) {
  const cls = "w-5 h-5";
  switch (condition) {
    case "Sunny":
      return <Sun className={`${cls} text-amber`} />;
    case "Partly Cloudy":
      return <CloudSun className={`${cls} text-gray-300`} />;
    case "Cloudy":
      return <Cloud className={`${cls} text-gray-400`} />;
    case "Light Rain":
      return <CloudRain className={`${cls} text-blue-400`} />;
    case "Snow":
      return <CloudSnow className={`${cls} text-blue-200`} />;
  }
}

export default function TrekDetailPage() {
  const params = useParams();
  const trek = getTrekBySlug(params.slug as string);
  const [openDay, setOpenDay] = useState<number | null>(0);

  if (!trek) {
    notFound();
  }

  return (
    <div className="pt-16">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[360px] overflow-hidden">
        <Image
          src={trek.image}
          alt={trek.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/treks"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Treks
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span
                className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${difficultyColor[trek.difficulty]}`}
              >
                {trek.difficulty}
              </span>
              <div className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-forest-light" />
                <span className={`text-sm font-semibold ${safetyColor(trek.aiSafetyScore)}`}>
                  AI Safety: {trek.aiSafetyScore}/100
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              {trek.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
        >
          {[
            { icon: Mountain, label: "Max Elevation", value: trek.maxElevation },
            { icon: TrendingUp, label: "Distance", value: trek.distance },
            { icon: Clock, label: "Duration", value: trek.duration },
            { icon: Calendar, label: "Best Season", value: trek.bestSeason },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/5 bg-card p-5"
            >
              <div className="w-9 h-9 rounded-lg bg-forest/15 flex items-center justify-center mb-3">
                <stat.icon className="w-4 h-4 text-forest-light" />
              </div>
              <div className="text-lg font-semibold">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mb-12"
        >
          <p className="text-gray-300 leading-relaxed max-w-3xl">
            {trek.longDescription}
          </p>
        </motion.div>

        {/* AI Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-2xl border border-forest/20 bg-forest/5 p-6 sm:p-8 mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-forest/15 flex items-center justify-center">
              <Brain className="w-5 h-5 text-forest-light" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">AI Analysis</h2>
              <p className="text-xs text-gray-500">
                Powered by Sherpa AI trek intelligence
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: AlertTriangle,
                title: "Risk Assessment",
                text: trek.aiAnalysis.riskAssessment,
                color: "text-amber",
              },
              {
                icon: Target,
                title: "Optimal Start Time",
                text: trek.aiAnalysis.optimalStartTime,
                color: "text-forest-light",
              },
              {
                icon: Heart,
                title: "Fitness Requirements",
                text: trek.aiAnalysis.fitnessRequirements,
                color: "text-red-400",
              },
              {
                icon: Thermometer,
                title: "Acclimatization",
                text: trek.aiAnalysis.acclimatizationNotes,
                color: "text-blue-400",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl bg-card border border-white/5 p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Itinerary accordion — 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="lg:col-span-2"
          >
            <h2 className="text-lg font-semibold mb-5">Day-by-Day Itinerary</h2>
            <div className="space-y-2">
              {trek.itinerary.map((day, i) => {
                const isOpen = openDay === i;
                return (
                  <div
                    key={day.day}
                    className="rounded-xl border border-white/5 bg-card overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenDay(isOpen ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-forest/15 flex items-center justify-center text-xs font-semibold text-forest-light shrink-0">
                          {day.day}
                        </span>
                        <span className="text-sm font-medium">{day.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="hidden sm:block text-xs text-gray-500">
                          {day.elevation}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pt-0">
                            <p className="text-sm text-gray-400 leading-relaxed mb-3">
                              {day.description}
                            </p>
                            <div className="flex gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                {day.elevation}
                              </span>
                              <span className="flex items-center gap-1">
                                <Mountain className="w-3 h-3" />
                                {day.distance}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Weather widget — 1 col */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold mb-5">7-Day Forecast</h2>
            <div className="rounded-2xl border border-white/5 bg-card p-5">
              <div className="space-y-3">
                {trek.weather.map((w) => (
                  <div
                    key={w.day}
                    className="flex items-center justify-between rounded-lg bg-card-light px-3 py-2.5"
                  >
                    <span className="text-sm font-medium w-10">{w.day}</span>
                    <WeatherIcon condition={w.condition} />
                    <div className="text-right text-xs">
                      <span className="text-white font-medium">{w.high}°</span>
                      <span className="text-gray-500"> / {w.low}°</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 w-16 justify-end">
                      <Wind className="w-3 h-3" />
                      {w.wind}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-4 text-center">
                AI-generated forecast · Updated hourly
              </p>
            </div>

            {/* CTA */}
            <Link
              href="/dashboard"
              className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-forest hover:bg-forest-light text-white text-sm font-medium rounded-xl transition-colors"
            >
              <Brain className="w-4 h-4" />
              Start AI Planning
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
