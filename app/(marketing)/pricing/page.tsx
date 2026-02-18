"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Sparkles,
  ChevronDown,
  Zap,
  Shield,
  Mountain,
  Brain,
} from "lucide-react";
import Link from "next/link";

/* ─── animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ─── pricing data ─── */
interface Tier {
  name: string;
  icon: typeof Zap;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  priceLabel?: string;
  popular?: boolean;
  oneTime?: boolean;
  cta: string;
  ctaHref: string;
  features: string[];
}

const tiers: Tier[] = [
  {
    name: "Free",
    icon: Mountain,
    description: "Essential tools for casual trekkers exploring Nepal.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    cta: "Get Started",
    ctaHref: "/signup",
    features: [
      "Basic route maps (3 treks)",
      "Manual checkpoint logging",
      "Community trail reports",
      "Basic weather forecasts",
      "Emergency SOS button",
    ],
  },
  {
    name: "AI Premium",
    icon: Brain,
    description:
      "Full AI-powered safety suite for serious trekkers.",
    monthlyPrice: 1499,
    yearlyPrice: 11900,
    popular: true,
    cta: "Start Free Trial",
    ctaHref: "/signup",
    features: [
      "Unlimited AI route planning",
      "Real-time altitude monitoring",
      "Predictive weather alerts",
      "AI pacing recommendations",
      "Voice assistant (EN/NP)",
      "Offline topographic maps",
      "Auto emergency detection",
      "Priority rescue coordination",
      "Heart rate & SpO2 tracking",
      "Acclimatization AI coach",
    ],
  },
  {
    name: "Destination Pack",
    icon: Shield,
    description:
      "One-time AI analysis for a specific trek route.",
    monthlyPrice: 699,
    yearlyPrice: 699,
    oneTime: true,
    priceLabel: "per trek",
    cta: "Buy a Pack",
    ctaHref: "/treks",
    features: [
      "AI safety analysis for 1 trek",
      "Day-by-day optimized itinerary",
      "Risk assessment report",
      "Offline map for selected route",
      "7-day weather forecast",
      "Emergency contacts for region",
    ],
  },
];

/* ─── comparison table ─── */
interface ComparisonRow {
  feature: string;
  free: boolean | string;
  premium: boolean | string;
  pack: boolean | string;
}

const comparison: ComparisonRow[] = [
  { feature: "AI Route Planning", free: false, premium: true, pack: "1 trek" },
  { feature: "Offline Maps", free: "3 treks", premium: "Unlimited", pack: "1 trek" },
  { feature: "Real-time Altitude Monitor", free: false, premium: true, pack: false },
  { feature: "Predictive Weather Alerts", free: false, premium: true, pack: "7-day" },
  { feature: "AI Pacing Recommendations", free: false, premium: true, pack: false },
  { feature: "Voice Assistant", free: false, premium: true, pack: false },
  { feature: "Auto Emergency Detection", free: false, premium: true, pack: false },
  { feature: "Emergency SOS", free: true, premium: true, pack: true },
  { feature: "Heart Rate & SpO2", free: false, premium: true, pack: false },
  { feature: "Acclimatization Coach", free: false, premium: true, pack: false },
  { feature: "Risk Assessment Report", free: false, premium: true, pack: true },
  { feature: "Priority Rescue", free: false, premium: true, pack: false },
];

/* ─── FAQ data ─── */
const faqs = [
  {
    q: "How does Sherpa AI work offline in remote areas?",
    a: "Sherpa AI downloads all necessary AI models, maps, and safety data before your trek begins. The on-device AI processes sensor data (GPS, altimeter, heart rate) locally — no internet connection needed. When you return to connectivity, your trek data syncs to the cloud for detailed post-trek analysis.",
  },
  {
    q: "What AI features are included in the Safety Score?",
    a: "The AI Safety Score (0–100) combines real-time altitude sickness risk modeling, weather pattern analysis, trail condition data from recent trekkers, your personal fitness metrics, and historical incident data for the route. The score updates every 30 minutes during an active trek.",
  },
  {
    q: "Can I use Sherpa AI without a smartwatch or sensors?",
    a: "Yes! The core features — AI route planning, offline maps, weather alerts, and emergency SOS — work with just your phone. However, connecting a compatible smartwatch or pulse oximeter unlocks real-time heart rate monitoring, SpO2 tracking, and automatic fall detection for maximum safety.",
  },
  {
    q: "What happens if I trigger the Emergency SOS?",
    a: "The Emergency SOS immediately sends your GPS coordinates, altitude, vital signs (if available), and trek context to Nepal's rescue coordination center and your emergency contacts. The AI also transmits a situation assessment to help responders prepare. SOS works even on the Free plan.",
  },
  {
    q: "Can I share my Premium plan with trekking partners?",
    a: "AI Premium covers a single trekker account. However, your trek data (location, pace, alerts) can be shared in real-time with up to 5 companions or family members through the Sherpa AI companion view — they just need the free app installed.",
  },
];

/* ─── helpers ─── */
function formatNPR(amount: number) {
  if (amount === 0) return "NPR 0";
  return `NPR ${amount.toLocaleString("en-NP")}`;
}

function CellValue({ value }: { value: boolean | string }) {
  if (value === true)
    return <Check className="w-4 h-4 text-forest-light mx-auto" />;
  if (value === false)
    return <X className="w-4 h-4 text-gray-600 mx-auto" />;
  return <span className="text-xs text-gray-300">{value}</span>;
}

/* ─── page ─── */
export default function PricingPage() {
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const yearlySavings = Math.round(
    ((tiers[1].monthlyPrice * 12 - tiers[1].yearlyPrice) /
      (tiers[1].monthlyPrice * 12)) *
      100,
  );

  return (
    <section className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-sm font-medium text-forest-light mb-3"
          >
            Simple Pricing
          </motion.p>
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-3xl sm:text-4xl font-bold tracking-tight"
          >
            Trek Safer.{" "}
            <span className="text-forest-light">Pay Less.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-4 text-gray-400"
          >
            Choose the plan that fits your trekking style. All plans include
            Emergency SOS — because safety should never be a premium feature.
          </motion.p>
        </motion.div>

        {/* Monthly / Yearly toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <span
            className={`text-sm ${!yearly ? "text-white font-medium" : "text-gray-500"}`}
          >
            Monthly
          </span>
          <button
            onClick={() => setYearly(!yearly)}
            className="relative w-12 h-6 rounded-full bg-card-light border border-white/10 transition-colors"
          >
            <motion.div
              animate={{ x: yearly ? 24 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute top-0.5 w-5 h-5 rounded-full bg-forest"
            />
          </button>
          <span
            className={`text-sm ${yearly ? "text-white font-medium" : "text-gray-500"}`}
          >
            Yearly
          </span>
          {yearly && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-2 py-0.5 text-xs font-medium rounded-full bg-forest/15 text-forest-light border border-forest/20"
            >
              Save {yearlySavings}%
            </motion.span>
          )}
        </motion.div>

        {/* Tier cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid md:grid-cols-3 gap-6 mb-20"
        >
          {tiers.map((tier, i) => {
            const price = tier.oneTime
              ? tier.monthlyPrice
              : yearly
                ? tier.yearlyPrice
                : tier.monthlyPrice;
            const period = tier.oneTime
              ? tier.priceLabel
              : yearly
                ? "/year"
                : "/month";

            return (
              <motion.div
                key={tier.name}
                variants={fadeUp}
                custom={i}
                className={`relative rounded-2xl border p-6 flex flex-col ${
                  tier.popular
                    ? "border-forest/40 bg-forest/5"
                    : "border-white/5 bg-card"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-0.5 text-xs font-semibold rounded-full bg-forest text-white">
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-5">
                  <div className="w-10 h-10 rounded-lg bg-forest/15 flex items-center justify-center mb-4">
                    <tier.icon className="w-5 h-5 text-forest-light" />
                  </div>
                  <h3 className="text-lg font-semibold">{tier.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {tier.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={price}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="text-3xl font-bold"
                      >
                        {formatNPR(price)}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-sm text-gray-500">{period}</span>
                  </div>
                  {tier.popular && yearly && (
                    <p className="text-xs text-forest-light mt-1">
                      {formatNPR(Math.round(tier.yearlyPrice / 12))}/mo billed
                      annually
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-gray-300"
                    >
                      <Check className="w-4 h-4 text-forest-light shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={tier.ctaHref}
                  className={`w-full flex items-center justify-center py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    tier.popular
                      ? "bg-forest hover:bg-forest-light text-white"
                      : "border border-white/10 hover:border-white/20 text-gray-300 hover:text-white"
                  }`}
                >
                  {tier.cta}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Feature comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold text-center mb-8">
            Feature Comparison
          </h2>
          <div className="rounded-2xl border border-white/5 bg-card overflow-hidden overflow-x-auto">
            <table className="w-full min-w-[540px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-sm font-medium text-gray-400 px-5 py-4 w-1/3">
                    Feature
                  </th>
                  <th className="text-center text-sm font-medium text-gray-400 px-4 py-4">
                    Free
                  </th>
                  <th className="text-center text-sm font-medium px-4 py-4">
                    <span className="text-forest-light">AI Premium</span>
                  </th>
                  <th className="text-center text-sm font-medium text-gray-400 px-4 py-4">
                    Dest. Pack
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={
                      i < comparison.length - 1
                        ? "border-b border-white/5"
                        : ""
                    }
                  >
                    <td className="px-5 py-3 text-sm text-gray-300">
                      {row.feature}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <CellValue value={row.free} />
                    </td>
                    <td className="px-4 py-3 text-center bg-forest/[0.03]">
                      <CellValue value={row.premium} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <CellValue value={row.pack} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-xl border border-white/5 bg-card overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-sm font-medium pr-4">{faq.q}</span>
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
                        <p className="px-4 pb-4 text-sm text-gray-400 leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
