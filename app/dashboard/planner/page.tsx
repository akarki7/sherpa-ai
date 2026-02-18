"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  Users,
  Heart,
  Activity,
  Clock,
  Home,
  Wallet,
  Shield,
  Zap,
  Eye,
  Brain,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Save,
  Thermometer,
  Shirt,
  Backpack,
  Sun,
  Footprints,
  X,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { treks } from "@/data/treks";

/* ─── types ─── */
interface WizardData {
  /* step 1 */
  trekSlug: string;
  startDate: string;
  groupSize: number;
  /* step 2 */
  fitnessLevel: number;
  experienceLevel: number;
  healthConditions: string[];
  /* step 3 */
  dailyHours: number;
  accommodation: "teahouse" | "camping" | "luxury";
  budgetRange: "budget" | "moderate" | "premium";
  priority: "safety" | "speed" | "scenery";
}

const defaultData: WizardData = {
  trekSlug: treks[0].slug,
  startDate: "2026-03-15",
  groupSize: 2,
  fitnessLevel: 3,
  experienceLevel: 2,
  healthConditions: [],
  dailyHours: 6,
  accommodation: "teahouse",
  budgetRange: "moderate",
  priority: "safety",
};

const healthOptions = [
  "Altitude sensitivity",
  "Knee issues",
  "Asthma / respiratory",
  "Heart condition",
  "Back problems",
  "Diabetes",
  "Allergies (medication)",
  "Vertigo / fear of heights",
];

const processingMessages = [
  "Analyzing weather patterns...",
  "Calculating optimal route...",
  "Assessing risk factors...",
  "Evaluating acclimatization schedule...",
  "Generating gear recommendations...",
  "Finalizing AI itinerary...",
];

/* ─── step config ─── */
const steps = [
  { label: "Trek Selection", icon: MapPin },
  { label: "Fitness Profile", icon: Heart },
  { label: "Preferences", icon: Clock },
  { label: "AI Analysis", icon: Brain },
];

/* ─── slide animation ─── */
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

/* ─── fake generated results ─── */
function generateResults(data: WizardData) {
  const trek = treks.find((t) => t.slug === data.trekSlug) ?? treks[0];

  const radarData = [
    { axis: "Altitude Risk", value: data.healthConditions.includes("Altitude sensitivity") ? 72 : 38 },
    { axis: "Weather", value: 45 },
    { axis: "Trail Difficulty", value: trek.difficulty === "Hard" ? 78 : trek.difficulty === "Moderate" ? 52 : 28 },
    { axis: "Fitness Demand", value: Math.max(20, 90 - data.fitnessLevel * 15) },
    { axis: "Remoteness", value: trek.region === "Mustang" || trek.region === "Langtang" ? 68 : 42 },
    { axis: "Duration Strain", value: Math.min(90, trek.durationDays * 6) },
  ];

  const difficultyScore = Math.round(
    (radarData.reduce((s, d) => s + d.value, 0) / radarData.length) * 1.1,
  );

  const itinerary = trek.itinerary.map((day) => {
    const paceNote =
      data.priority === "scenery"
        ? "Relaxed pace with photo stops"
        : data.priority === "speed"
          ? "Efficient pace, minimal stops"
          : "Steady pace with safety breaks";
    return {
      ...day,
      aiNote: day.day <= 2 ? "Acclimatization focus — go slow" : paceNote,
      hours: Math.min(data.dailyHours, day.distance === "Drive" || day.distance === "Flight" || day.distance === "—" ? 2 : Math.round(parseInt(day.distance) * 0.8)),
    };
  });

  const gear = [
    { category: "Clothing", items: ["Thermal base layers (×2)", "Fleece mid-layer", "Down jacket (-10°C rated)", "Waterproof shell jacket", "Trekking pants (×2)", "Warm hat & sun hat", "Gloves (liner + insulated)"] },
    { category: "Footwear", items: ["Waterproof trekking boots (broken in)", "Camp sandals", "Wool hiking socks (×4)", "Gaiters (if snow expected)"] },
    { category: "Equipment", items: ["45-65L backpack + rain cover", "Sleeping bag (-15°C comfort)", "Trekking poles (adjustable)", "Headlamp + spare batteries", "Water filter / purification tablets", "First aid kit + Diamox"] },
    { category: "Tech & Safety", items: ["Sherpa AI app (offline maps downloaded)", "Pulse oximeter", "Portable battery pack (20,000mAh)", "Satellite messenger (rental)", "Emergency whistle", "Sunscreen SPF50 + lip balm"] },
  ];
  if (data.healthConditions.includes("Knee issues")) {
    gear[2].items.push("Knee support braces (×2)");
  }
  if (data.healthConditions.includes("Altitude sensitivity")) {
    gear[2].items.push("Diamox (250mg, extra supply)");
  }

  const weatherWindow = {
    recommendation: `Based on historical data and current forecasts, your selected start date of ${data.startDate} falls within a ${trek.bestSeason.includes("Mar") ? "good" : "marginal"} weather window.`,
    bestDays: "Days 1–4: Clear skies expected. Days 5–6: Afternoon clouds likely. Day 7+: Monitor for precipitation.",
    sunrise: "05:48 AM",
    sunset: "06:12 PM",
    tempRange: trek.difficulty === "Hard" ? "-15°C to 8°C" : "-5°C to 15°C",
  };

  return { trek, radarData, difficultyScore, itinerary, gear, weatherWindow };
}

/* ─── component ─── */
export default function PlannerPage() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<WizardData>(defaultData);
  const [processing, setProcessing] = useState(false);
  const [processingIdx, setProcessingIdx] = useState(0);
  const [results, setResults] = useState<ReturnType<typeof generateResults> | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [openItineraryDay, setOpenItineraryDay] = useState<number | null>(null);

  const update = useCallback(
    <K extends keyof WizardData>(key: K, value: WizardData[K]) =>
      setData((d) => ({ ...d, [key]: value })),
    [],
  );

  const toggleHealth = useCallback((h: string) => {
    setData((d) => ({
      ...d,
      healthConditions: d.healthConditions.includes(h)
        ? d.healthConditions.filter((x) => x !== h)
        : [...d.healthConditions, h],
    }));
  }, []);

  /* run fake AI processing */
  useEffect(() => {
    if (!processing) return;
    if (processingIdx >= processingMessages.length) {
      setProcessing(false);
      setResults(generateResults(data));
      return;
    }
    const t = setTimeout(
      () => setProcessingIdx((i) => i + 1),
      500,
    );
    return () => clearTimeout(t);
  }, [processing, processingIdx, data]);

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    if (next === 3 && !results) {
      setProcessing(true);
      setProcessingIdx(0);
    }
    setStep(next);
  };

  const canNext =
    step === 0
      ? data.trekSlug && data.startDate && data.groupSize > 0
      : step === 1
        ? data.fitnessLevel > 0
        : step === 2
          ? true
          : false;

  const savePlan = () => {
    if (!results) return;
    const plan = {
      id: Date.now(),
      savedAt: new Date().toISOString(),
      inputs: data,
      trek: results.trek.name,
      difficultyScore: results.difficultyScore,
    };
    const existing = JSON.parse(localStorage.getItem("sherpa-plans") || "[]");
    existing.push(plan);
    localStorage.setItem("sherpa-plans", JSON.stringify(existing));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold">AI Trek Planner</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Let AI design the perfect trek for your fitness and goals
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-1 sm:gap-2">
        {steps.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <button
              key={s.label}
              onClick={() => {
                if (i < step) goTo(i);
                if (i === 3 && results) goTo(3);
              }}
              disabled={i > step}
              className="flex items-center gap-2 flex-1 group"
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  done
                    ? "bg-forest text-white"
                    : active
                      ? "bg-forest/20 text-forest-light border border-forest/30"
                      : "bg-card-light text-gray-500"
                }`}
              >
                {done ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <s.icon className="w-4 h-4" />
                )}
              </div>
              <span
                className={`hidden sm:block text-xs font-medium transition-colors ${active ? "text-white" : "text-gray-500"}`}
              >
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div
                  className={`hidden sm:block flex-1 h-px mx-2 ${done ? "bg-forest" : "bg-white/5"}`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Step content */}
      <div className="rounded-2xl border border-white/5 bg-card overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="p-6"
          >
            {/* ─── STEP 1: Trek Selection ─── */}
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold">Choose Your Trek</h2>

                {/* Destination */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">
                    Destination
                  </label>
                  <div className="relative">
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    <select
                      value={data.trekSlug}
                      onChange={(e) => update("trekSlug", e.target.value)}
                      className="w-full px-4 py-2.5 bg-card-light border border-white/10 rounded-lg text-sm focus:border-forest focus:outline-none transition-colors appearance-none"
                    >
                      {treks.map((t) => (
                        <option key={t.slug} value={t.slug}>
                          {t.name} — {t.region} ({t.difficulty})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date + Group */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">
                      Start Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="date"
                        value={data.startDate}
                        onChange={(e) => update("startDate", e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-card-light border border-white/10 rounded-lg text-sm focus:border-forest focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">
                      Group Size
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="number"
                        min={1}
                        max={20}
                        value={data.groupSize}
                        onChange={(e) =>
                          update("groupSize", Math.max(1, Math.min(20, Number(e.target.value))))
                        }
                        className="w-full pl-10 pr-4 py-2.5 bg-card-light border border-white/10 rounded-lg text-sm focus:border-forest focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Selected trek preview */}
                {(() => {
                  const selected = treks.find((t) => t.slug === data.trekSlug);
                  if (!selected) return null;
                  return (
                    <div className="rounded-xl bg-card-light border border-white/5 p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-forest/15 flex items-center justify-center shrink-0">
                          <MapPin className="w-5 h-5 text-forest-light" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold">{selected.name}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {selected.duration} · {selected.distance} · Max {selected.maxElevation}
                          </p>
                          <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                            {selected.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* ─── STEP 2: Fitness Profile ─── */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Your Fitness Profile</h2>

                {/* Fitness Level */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-400 flex items-center gap-1.5">
                      <Activity className="w-4 h-4" />
                      Fitness Level
                    </label>
                    <span className="text-sm font-medium text-forest-light">
                      {["", "Low", "Below Avg", "Average", "Above Avg", "Athletic"][data.fitnessLevel]}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={data.fitnessLevel}
                    onChange={(e) => update("fitnessLevel", Number(e.target.value))}
                    className="w-full accent-forest"
                  />
                  <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                    <span>Low</span>
                    <span>Athletic</span>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-400 flex items-center gap-1.5">
                      <Footprints className="w-4 h-4" />
                      Trekking Experience
                    </label>
                    <span className="text-sm font-medium text-forest-light">
                      {["", "Beginner", "Some Treks", "Experienced", "Advanced", "Expert"][data.experienceLevel]}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={data.experienceLevel}
                    onChange={(e) => update("experienceLevel", Number(e.target.value))}
                    className="w-full accent-forest"
                  />
                  <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>

                {/* Health conditions */}
                <div>
                  <label className="block text-sm text-gray-400 mb-3 flex items-center gap-1.5">
                    <Heart className="w-4 h-4" />
                    Health Conditions <span className="text-gray-600">(select all that apply)</span>
                  </label>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {healthOptions.map((h) => {
                      const checked = data.healthConditions.includes(h);
                      return (
                        <button
                          key={h}
                          onClick={() => toggleHealth(h)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm text-left transition-colors ${
                            checked
                              ? "bg-amber/10 border-amber/20 text-amber"
                              : "bg-card-light border-white/5 text-gray-400 hover:border-white/10"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                              checked ? "bg-amber border-amber" : "border-white/20"
                            }`}
                          >
                            {checked && <CheckCircle className="w-3 h-3 text-background" />}
                          </div>
                          {h}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 3: Preferences ─── */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Trek Preferences</h2>

                {/* Daily hours */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-400 flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      Max Daily Hiking Hours
                    </label>
                    <span className="text-sm font-medium text-forest-light">
                      {data.dailyHours} hours
                    </span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={10}
                    value={data.dailyHours}
                    onChange={(e) => update("dailyHours", Number(e.target.value))}
                    className="w-full accent-forest"
                  />
                  <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                    <span>3 hrs (relaxed)</span>
                    <span>10 hrs (intense)</span>
                  </div>
                </div>

                {/* Accommodation */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2.5 flex items-center gap-1.5">
                    <Home className="w-4 h-4" />
                    Accommodation Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(
                      [
                        { value: "teahouse", label: "Teahouse", desc: "Local lodges" },
                        { value: "camping", label: "Camping", desc: "Tent & crew" },
                        { value: "luxury", label: "Luxury", desc: "Premium lodges" },
                      ] as const
                    ).map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => update("accommodation", opt.value)}
                        className={`rounded-xl border p-3 text-left transition-colors ${
                          data.accommodation === opt.value
                            ? "bg-forest/10 border-forest/30 text-white"
                            : "bg-card-light border-white/5 text-gray-400 hover:border-white/10"
                        }`}
                      >
                        <div className="text-sm font-medium">{opt.label}</div>
                        <div className="text-[10px] text-gray-500 mt-0.5">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2.5 flex items-center gap-1.5">
                    <Wallet className="w-4 h-4" />
                    Budget Range
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(
                      [
                        { value: "budget", label: "Budget", desc: "< NPR 50k" },
                        { value: "moderate", label: "Moderate", desc: "NPR 50–100k" },
                        { value: "premium", label: "Premium", desc: "> NPR 100k" },
                      ] as const
                    ).map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => update("budgetRange", opt.value)}
                        className={`rounded-xl border p-3 text-left transition-colors ${
                          data.budgetRange === opt.value
                            ? "bg-forest/10 border-forest/30 text-white"
                            : "bg-card-light border-white/5 text-gray-400 hover:border-white/10"
                        }`}
                      >
                        <div className="text-sm font-medium">{opt.label}</div>
                        <div className="text-[10px] text-gray-500 mt-0.5">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2.5">
                    Trek Priority
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(
                      [
                        { value: "safety", label: "Safety", icon: Shield, desc: "Conservative pacing" },
                        { value: "speed", label: "Speed", icon: Zap, desc: "Efficient route" },
                        { value: "scenery", label: "Scenery", icon: Eye, desc: "Best viewpoints" },
                      ] as const
                    ).map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => update("priority", opt.value)}
                        className={`rounded-xl border p-4 text-center transition-colors ${
                          data.priority === opt.value
                            ? "bg-forest/10 border-forest/30"
                            : "bg-card-light border-white/5 hover:border-white/10"
                        }`}
                      >
                        <opt.icon
                          className={`w-5 h-5 mx-auto mb-1.5 ${
                            data.priority === opt.value ? "text-forest-light" : "text-gray-500"
                          }`}
                        />
                        <div className={`text-sm font-medium ${data.priority === opt.value ? "text-white" : "text-gray-400"}`}>
                          {opt.label}
                        </div>
                        <div className="text-[10px] text-gray-500 mt-0.5">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 4: AI Analysis ─── */}
            {step === 3 && (
              <div>
                {processing ? (
                  /* Processing animation */
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="relative w-16 h-16 mb-6">
                      <div className="absolute inset-0 rounded-full border-2 border-forest/20" />
                      <div className="absolute inset-0 rounded-full border-2 border-forest border-t-transparent animate-spin" />
                      <Brain className="absolute inset-0 m-auto w-6 h-6 text-forest-light" />
                    </div>
                    <div className="h-6">
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={processingIdx}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="text-sm text-gray-400"
                        >
                          {processingMessages[Math.min(processingIdx, processingMessages.length - 1)]}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                    {/* Progress dots */}
                    <div className="flex gap-1.5 mt-6">
                      {processingMessages.map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                            i <= processingIdx ? "bg-forest-light" : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ) : results ? (
                  /* Results */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    {/* Header with score */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-semibold">
                          AI Plan: {results.trek.name}
                        </h2>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Generated for {data.groupSize} trekker{data.groupSize !== 1 && "s"} · Starting {data.startDate} · Priority: {data.priority}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-amber">
                            {results.difficultyScore}
                            <span className="text-sm font-normal text-gray-500">/100</span>
                          </div>
                          <div className="text-[10px] text-gray-500">Difficulty</div>
                        </div>
                        <button
                          onClick={savePlan}
                          className="flex items-center gap-2 px-4 py-2 bg-forest hover:bg-forest-light text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          Save Plan
                        </button>
                      </div>
                    </div>

                    {/* Top row: Radar + Weather */}
                    <div className="grid md:grid-cols-2 gap-5">
                      {/* Radar chart */}
                      <div className="rounded-xl bg-card-light border border-white/5 p-5">
                        <h3 className="text-sm font-medium text-gray-400 mb-4">
                          Risk Assessment
                        </h3>
                        <div className="h-56">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={results.radarData} cx="50%" cy="50%" outerRadius="70%">
                              <PolarGrid stroke="rgba(255,255,255,0.06)" />
                              <PolarAngleAxis
                                dataKey="axis"
                                tick={{ fontSize: 10, fill: "#6b7280" }}
                              />
                              <PolarRadiusAxis
                                angle={90}
                                domain={[0, 100]}
                                tick={false}
                                axisLine={false}
                              />
                              <Radar
                                dataKey="value"
                                stroke="#237a4b"
                                fill="#1a5c38"
                                fillOpacity={0.3}
                                strokeWidth={2}
                              />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Weather window */}
                      <div className="rounded-xl bg-card-light border border-white/5 p-5">
                        <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-1.5">
                          <Sun className="w-4 h-4 text-amber" />
                          Weather Window
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed mb-4">
                          {results.weatherWindow.recommendation}
                        </p>
                        <p className="text-xs text-gray-400 leading-relaxed mb-4">
                          {results.weatherWindow.bestDays}
                        </p>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="rounded-lg bg-card p-3">
                            <div className="text-[10px] text-gray-500">Sunrise</div>
                            <div className="text-sm font-medium">{results.weatherWindow.sunrise}</div>
                          </div>
                          <div className="rounded-lg bg-card p-3">
                            <div className="text-[10px] text-gray-500">Sunset</div>
                            <div className="text-sm font-medium">{results.weatherWindow.sunset}</div>
                          </div>
                          <div className="rounded-lg bg-card p-3">
                            <div className="text-[10px] text-gray-500 flex items-center gap-0.5">
                              <Thermometer className="w-3 h-3" /> Range
                            </div>
                            <div className="text-sm font-medium">{results.weatherWindow.tempRange}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Itinerary */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-3">
                        AI-Generated Itinerary
                      </h3>
                      <div className="space-y-2">
                        {results.itinerary.map((day, i) => {
                          const isOpen = openItineraryDay === i;
                          return (
                            <div
                              key={day.day}
                              className="rounded-xl border border-white/5 bg-card-light overflow-hidden"
                            >
                              <button
                                onClick={() => setOpenItineraryDay(isOpen ? null : i)}
                                className="w-full flex items-center justify-between p-3 text-left hover:bg-white/[0.02] transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="w-7 h-7 rounded-md bg-forest/15 flex items-center justify-center text-xs font-semibold text-forest-light shrink-0">
                                    {day.day}
                                  </span>
                                  <div>
                                    <span className="text-sm font-medium">{day.title}</span>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <span className="text-[10px] text-gray-500">{day.elevation}</span>
                                      <span className="text-[10px] text-gray-600">·</span>
                                      <span className="text-[10px] text-gray-500">{day.distance}</span>
                                      {day.hours > 0 && (
                                        <>
                                          <span className="text-[10px] text-gray-600">·</span>
                                          <span className="text-[10px] text-forest-light">~{day.hours}h</span>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <ChevronDown
                                  className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                                />
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
                                    <div className="px-3 pb-3 pt-0 ml-10">
                                      <p className="text-xs text-gray-400 leading-relaxed">
                                        {day.description}
                                      </p>
                                      <div className="mt-2 flex items-center gap-1.5 text-[10px] text-forest-light">
                                        <Brain className="w-3 h-3" />
                                        AI: {day.aiNote}
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Gear checklist */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-1.5">
                        <Backpack className="w-4 h-4" />
                        AI Gear Checklist
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {results.gear.map((cat) => {
                          const Icon =
                            cat.category === "Clothing"
                              ? Shirt
                              : cat.category === "Footwear"
                                ? Footprints
                                : cat.category === "Equipment"
                                  ? Backpack
                                  : Shield;
                          return (
                            <div
                              key={cat.category}
                              className="rounded-xl bg-card-light border border-white/5 p-4"
                            >
                              <h4 className="text-xs font-semibold text-gray-300 flex items-center gap-1.5 mb-2.5">
                                <Icon className="w-3.5 h-3.5 text-forest-light" />
                                {cat.category}
                              </h4>
                              <ul className="space-y-1.5">
                                {cat.items.map((item) => (
                                  <li
                                    key={item}
                                    className="flex items-start gap-2 text-xs text-gray-400"
                                  >
                                    <CheckCircle className="w-3 h-3 text-forest-light shrink-0 mt-0.5" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        {!(step === 3 && (processing || results)) && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
            <button
              onClick={() => goTo(step - 1)}
              disabled={step === 0}
              className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={() => goTo(step + 1)}
              disabled={!canNext}
              className="flex items-center gap-1.5 px-5 py-2 bg-forest hover:bg-forest-light disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
            >
              {step === 2 ? "Generate AI Plan" : "Next"}
              {step === 2 ? (
                <Brain className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-forest border border-forest-light/20 text-white text-sm font-medium shadow-lg"
          >
            <CheckCircle className="w-4 h-4" />
            Plan saved to your device
            <button onClick={() => setShowToast(false)} className="ml-1 p-0.5 hover:bg-white/10 rounded">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
