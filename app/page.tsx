"use client";

import { motion } from "framer-motion";
import {
  Brain,
  AlertTriangle,
  ShieldCheck,
  Mic,
  Gauge,
  MapPin,
  Mountain,
  Activity,
  Route,
  Phone,
  ArrowRight,
  Play,
  Download,
} from "lucide-react";
import Link from "next/link";

/* ─── animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── data ─── */
const features = [
  {
    icon: Brain,
    title: "Smart Trek Planning",
    desc: "AI analyzes terrain, weather, and your fitness to build the safest route for your ability level.",
  },
  {
    icon: AlertTriangle,
    title: "Predictive Alerts",
    desc: "Get warned about altitude sickness risks, weather changes, and trail hazards before they happen.",
  },
  {
    icon: ShieldCheck,
    title: "Auto Emergency Detection",
    desc: "Sensors detect falls, sudden stops, and vital changes — automatically alerting rescue teams.",
  },
  {
    icon: Mic,
    title: "Voice Assistant",
    desc: "Hands-free trail guidance in English and Nepali. Ask questions, get directions, report issues.",
  },
  {
    icon: Gauge,
    title: "Intelligent Pacing",
    desc: "Real-time pace recommendations based on elevation, oxygen levels, and your energy reserves.",
  },
  {
    icon: MapPin,
    title: "Offline Maps",
    desc: "Full topographic maps of every major Nepal trail — downloaded once, available forever. No signal needed.",
  },
];

const stats = [
  { value: "50,000+", label: "Safe Treks", icon: Mountain },
  { value: "85%+", label: "AI Accuracy", icon: Activity },
  { value: "30+", label: "Trail Routes", icon: Route },
  { value: "24/7", label: "Emergency AI", icon: Phone },
];

/* ─── page ─── */
export default function Home() {
  return (
    <>
      {/* ════════════ HERO ════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-forest/20 via-background to-background" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-forest/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left copy */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.div
                variants={fadeUp}
                custom={0}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-forest/30 bg-forest/10 text-forest-light text-xs font-medium mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-forest-light animate-pulse" />
                AI-Powered Trekking Safety
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-balance"
              >
                Your AI-Powered Sherpa.{" "}
                <span className="text-forest-light">Always Offline.</span>{" "}
                <span className="text-amber">Always Ready.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="mt-6 text-lg text-gray-400 max-w-xl leading-relaxed"
              >
                Navigate Nepal&apos;s Himalayan trails with confidence.
                AI-driven route planning, real-time altitude monitoring, and
                emergency detection — all working without an internet
                connection.
              </motion.p>

              <motion.div
                variants={fadeUp}
                custom={3}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Link
                  href="#cta"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-forest hover:bg-forest-light text-white font-medium transition-colors"
                >
                  Start Free Trek
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 hover:border-white/20 text-gray-300 hover:text-white font-medium transition-colors">
                  <Play className="w-4 h-4" />
                  Watch Demo
                </button>
              </motion.div>
            </motion.div>

            {/* Right — phone mockup placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              {/* Glow ring */}
              <div className="absolute w-80 h-80 rounded-full bg-forest/20 blur-[80px]" />

              {/* Phone frame */}
              <div className="relative w-[280px] h-[560px] rounded-[3rem] border-2 border-white/10 bg-card p-3 shadow-2xl">
                <div className="w-full h-full rounded-[2.4rem] bg-gradient-to-b from-card-light to-card overflow-hidden flex flex-col">
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-6 pt-4 pb-2">
                    <span className="text-[10px] text-gray-500">9:41</span>
                    <div className="w-20 h-5 rounded-full bg-background/60" />
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-forest" />
                    </div>
                  </div>

                  {/* Fake app screen */}
                  <div className="flex-1 px-5 py-4 space-y-4">
                    <div className="text-xs text-gray-500 font-medium">
                      ACTIVE TREK
                    </div>
                    <div className="text-sm font-semibold text-white">
                      Annapurna Base Camp
                    </div>
                    <div className="h-32 rounded-xl bg-forest/20 border border-forest/30 flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-forest-light/60" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-lg bg-background/40 p-3">
                        <div className="text-[10px] text-gray-500">
                          Altitude
                        </div>
                        <div className="text-sm font-bold text-amber">
                          4,130m
                        </div>
                      </div>
                      <div className="rounded-lg bg-background/40 p-3">
                        <div className="text-[10px] text-gray-500">O2 Sat</div>
                        <div className="text-sm font-bold text-forest-light">
                          92%
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg bg-amber/10 border border-amber/20 p-3">
                      <div className="text-[10px] text-amber font-medium">
                        AI ALERT
                      </div>
                      <div className="text-xs text-gray-300 mt-1">
                        Reduce pace — altitude gain too fast
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -left-4 top-20 rounded-xl bg-card border border-white/10 px-4 py-2 shadow-lg"
              >
                <div className="text-[10px] text-gray-500">AI Status</div>
                <div className="text-xs font-semibold text-forest-light flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-light" />
                  Active
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3.5,
                  ease: "easeInOut",
                }}
                className="absolute -right-4 bottom-32 rounded-xl bg-card border border-white/10 px-4 py-2 shadow-lg"
              >
                <div className="text-[10px] text-gray-500">Weather</div>
                <div className="text-xs font-semibold text-amber flex items-center gap-1">
                  Clear skies ahead
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════ FEATURES ════════════ */}
      <section id="features" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-sm font-medium text-forest-light mb-3"
            >
              Intelligent Features
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl sm:text-4xl font-bold tracking-tight"
            >
              Everything you need for a{" "}
              <span className="text-forest-light">safer trek</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-4 text-gray-400"
            >
              Six AI-powered modules working together to keep you safe on
              Nepal&apos;s most challenging trails.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                custom={i}
                className="group rounded-2xl border border-white/5 bg-card hover:bg-card-light p-6 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-forest/15 flex items-center justify-center mb-4 group-hover:bg-forest/25 transition-colors">
                  <f.icon className="w-5 h-5 text-forest-light" />
                </div>
                <h3 className="text-base font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════ STATS ════════════ */}
      <section id="stats" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="rounded-2xl border border-white/5 bg-card p-8 sm:p-10"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  custom={i}
                  className="text-center"
                >
                  <div className="w-10 h-10 rounded-lg bg-forest/15 flex items-center justify-center mx-auto mb-3">
                    <s.icon className="w-5 h-5 text-forest-light" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-amber">
                    {s.value}
                  </div>
                  <div className="mt-1 text-sm text-gray-400">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════ CTA ════════════ */}
      <section id="cta" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="relative rounded-2xl border border-white/5 bg-gradient-to-br from-forest/20 via-card to-card overflow-hidden p-10 sm:p-16 text-center"
          >
            {/* Decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-forest/15 rounded-full blur-[100px] -z-0" />

            <div className="relative z-10">
              <motion.h2
                variants={fadeUp}
                custom={0}
                className="text-3xl sm:text-4xl font-bold tracking-tight"
              >
                Ready to Trek{" "}
                <span className="text-forest-light">Smarter</span>?
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={1}
                className="mt-4 text-gray-400 max-w-lg mx-auto"
              >
                Download Sherpa AI and join thousands of trekkers who trust
                artificial intelligence to keep them safe on Nepal&apos;s
                trails.
              </motion.p>

              <motion.div
                variants={fadeUp}
                custom={2}
                className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <button className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-white text-background font-medium hover:bg-gray-200 transition-colors w-full sm:w-auto justify-center">
                  <Download className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider text-gray-500 leading-none">
                      Download on the
                    </div>
                    <div className="text-sm font-semibold leading-tight">
                      App Store
                    </div>
                  </div>
                </button>
                <button className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-white text-background font-medium hover:bg-gray-200 transition-colors w-full sm:w-auto justify-center">
                  <Download className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase tracking-wider text-gray-500 leading-none">
                      Get it on
                    </div>
                    <div className="text-sm font-semibold leading-tight">
                      Google Play
                    </div>
                  </div>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
