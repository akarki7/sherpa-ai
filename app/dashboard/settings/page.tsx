"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Brain,
  Bell,
  Shield,
  CreditCard,
  Palette,
  Save,
  CheckCircle,
  X,
  Trash2,
  Download,
  Plus,
  Moon,
  Sun,
  Crown,
  Zap,
  BarChart3,
  AlertTriangle,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { type Settings, DEFAULT_SETTINGS, getSettings, saveSettings } from "@/lib/settings";

/* ─── categories ─── */
const categories = [
  { key: "profile", label: "Profile", icon: User },
  { key: "ai", label: "AI Preferences", icon: Brain },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "privacy", label: "Privacy & Safety", icon: Shield },
  { key: "subscription", label: "Subscription", icon: CreditCard },
  { key: "app", label: "App Preferences", icon: Palette },
] as const;

type Category = (typeof categories)[number]["key"];

/* ─── Toggle switch component ─── */
function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${
        checked ? "bg-forest" : "bg-white/10 dark:bg-white/10"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

/* ─── page ─── */
export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [savedSettings, setSavedSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [activeCategory, setActiveCategory] = useState<Category>("profile");
  const [showToast, setShowToast] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");
  const { theme, setTheme } = useTheme();

  /* Load from localStorage on mount */
  useEffect(() => {
    const stored = getSettings();
    setSettings(stored);
    setSavedSettings(stored);
  }, []);

  /* Sync theme from context */
  useEffect(() => {
    if (settings.app.theme !== theme) {
      setSettings((s) => ({ ...s, app: { ...s.app, theme } }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  /* Check if settings have been modified */
  const isDirty = JSON.stringify(settings) !== JSON.stringify(savedSettings);

  /* Helpers to update nested settings */
  const updateProfile = useCallback(
    <K extends keyof Settings["profile"]>(key: K, value: Settings["profile"][K]) =>
      setSettings((s) => ({ ...s, profile: { ...s.profile, [key]: value } })),
    [],
  );
  const updateAI = useCallback(
    <K extends keyof Settings["ai"]>(key: K, value: Settings["ai"][K]) =>
      setSettings((s) => ({ ...s, ai: { ...s.ai, [key]: value } })),
    [],
  );
  const updateNotifications = useCallback(
    <K extends keyof Settings["notifications"]>(key: K, value: Settings["notifications"][K]) =>
      setSettings((s) => ({ ...s, notifications: { ...s.notifications, [key]: value } })),
    [],
  );
  const updatePrivacy = useCallback(
    <K extends keyof Settings["privacy"]>(key: K, value: Settings["privacy"][K]) =>
      setSettings((s) => ({ ...s, privacy: { ...s.privacy, [key]: value } })),
    [],
  );
  const updateApp = useCallback(
    <K extends keyof Settings["app"]>(key: K, value: Settings["app"][K]) => {
      setSettings((s) => ({ ...s, app: { ...s.app, [key]: value } }));
      if (key === "theme") {
        setTheme(value as "dark" | "light");
      }
    },
    [setTheme],
  );

  /* Save handler */
  const handleSave = () => {
    saveSettings(settings);
    setSavedSettings(settings);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  /* Add emergency contact */
  const addContact = () => {
    if (!newContactName.trim() || !newContactPhone.trim()) return;
    updatePrivacy("emergencyContacts", [
      ...settings.privacy.emergencyContacts,
      { name: newContactName.trim(), phone: newContactPhone.trim() },
    ]);
    setNewContactName("");
    setNewContactPhone("");
  };

  /* Remove emergency contact */
  const removeContact = (index: number) => {
    updatePrivacy(
      "emergencyContacts",
      settings.privacy.emergencyContacts.filter((_, i) => i !== index),
    );
  };

  /* Check if category has unsaved changes */
  const categoryDirty = (cat: Category): boolean => {
    return JSON.stringify(settings[cat]) !== JSON.stringify(savedSettings[cat]);
  };

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Settings</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage your profile, preferences, and app configuration
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={!isDirty}
          className="relative flex items-center gap-2 px-5 py-2.5 bg-forest hover:bg-forest-light disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Changes
          {isDirty && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber rounded-full border-2 border-background" />
          )}
        </button>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Category sidebar */}
        <div className="md:w-56 shrink-0">
          {/* Desktop: vertical list */}
          <nav className="hidden md:flex flex-col gap-1">
            {categories.map((cat) => {
              const active = activeCategory === cat.key;
              const dirty = categoryDirty(cat.key);
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`relative flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors text-left ${
                    active
                      ? "bg-forest/10 text-forest-light border border-forest/20"
                      : "text-gray-400 hover:text-foreground hover:bg-card-light border border-transparent"
                  }`}
                >
                  <cat.icon className="w-4 h-4 shrink-0" />
                  {cat.label}
                  {dirty && (
                    <span className="ml-auto w-2 h-2 bg-amber rounded-full shrink-0" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile: horizontal scroll */}
          <div className="md:hidden flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
            {categories.map((cat) => {
              const active = activeCategory === cat.key;
              const dirty = categoryDirty(cat.key);
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`relative flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors shrink-0 border ${
                    active
                      ? "bg-forest/10 text-forest-light border-forest/20"
                      : "text-gray-400 hover:text-foreground border-white/5 dark:border-white/5 hover:border-white/10"
                  }`}
                >
                  <cat.icon className="w-3.5 h-3.5" />
                  {cat.label}
                  {dirty && (
                    <span className="w-1.5 h-1.5 bg-amber rounded-full shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content panel */}
        <div className="flex-1 min-w-0">
          <div className="rounded-2xl border border-white/5 dark:border-white/5 bg-card p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {/* ─── PROFILE ─── */}
                {activeCategory === "profile" && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <User className="w-5 h-5 text-forest-light" />
                      Profile
                    </h2>

                    {/* Avatar placeholder */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-forest/15 border-2 border-forest/30 flex items-center justify-center">
                        <User className="w-7 h-7 text-forest-light" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{settings.profile.displayName || "Your Name"}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Avatar coming soon</p>
                      </div>
                    </div>

                    {/* Display Name */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Display Name</label>
                      <input
                        type="text"
                        value={settings.profile.displayName}
                        onChange={(e) => updateProfile("displayName", e.target.value)}
                        className="w-full px-4 py-2.5 bg-card-light border border-white/10 dark:border-white/10 rounded-lg text-sm focus:border-forest focus:outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Email</label>
                      <input
                        type="email"
                        value={settings.profile.email}
                        onChange={(e) => updateProfile("email", e.target.value)}
                        className="w-full px-4 py-2.5 bg-card-light border border-white/10 dark:border-white/10 rounded-lg text-sm focus:border-forest focus:outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Experience */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Experience Level</label>
                      <select
                        value={settings.profile.experience}
                        onChange={(e) =>
                          updateProfile("experience", e.target.value as Settings["profile"]["experience"])
                        }
                        className="w-full px-4 py-2.5 bg-card-light border border-white/10 dark:border-white/10 rounded-lg text-sm focus:border-forest focus:outline-none transition-colors appearance-none"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>

                    {/* Bio */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Bio</label>
                      <textarea
                        value={settings.profile.bio}
                        onChange={(e) => updateProfile("bio", e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2.5 bg-card-light border border-white/10 dark:border-white/10 rounded-lg text-sm focus:border-forest focus:outline-none transition-colors resize-none"
                        placeholder="Tell us about your trekking experience..."
                      />
                    </div>
                  </div>
                )}

                {/* ─── AI PREFERENCES ─── */}
                {activeCategory === "ai" && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <Brain className="w-5 h-5 text-forest-light" />
                      AI Preferences
                    </h2>

                    {/* Toggle: Auto Suggestions */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Auto Suggestions</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          AI will proactively suggest route changes and rest stops
                        </p>
                      </div>
                      <Toggle checked={settings.ai.autoSuggestions} onChange={(v) => updateAI("autoSuggestions", v)} />
                    </div>

                    {/* Toggle: Detailed Explanations */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Detailed Explanations</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Show AI reasoning behind alerts and recommendations
                        </p>
                      </div>
                      <Toggle
                        checked={settings.ai.detailedExplanations}
                        onChange={(v) => updateAI("detailedExplanations", v)}
                      />
                    </div>

                    {/* Toggle: Conservative Alerts */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Conservative Alerts</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Lower thresholds — alert earlier even for minor risks
                        </p>
                      </div>
                      <Toggle
                        checked={settings.ai.conservativeAlerts}
                        onChange={(v) => updateAI("conservativeAlerts", v)}
                      />
                    </div>

                    <div className="h-px bg-white/5" />

                    {/* Slider: Risk Tolerance */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-gray-400">Risk Tolerance</label>
                        <span className="text-sm font-medium text-forest-light">
                          {["", "Very Low", "Low", "Moderate", "High", "Very High"][settings.ai.riskTolerance]}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={5}
                        value={settings.ai.riskTolerance}
                        onChange={(e) => updateAI("riskTolerance", Number(e.target.value))}
                        className="w-full accent-forest"
                      />
                      <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                        <span>Conservative</span>
                        <span>Aggressive</span>
                      </div>
                    </div>

                    {/* Slider: Acclimatization Pace */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-gray-400">Acclimatization Pace</label>
                        <span className="text-sm font-medium text-forest-light">
                          {["", "Very Slow", "Slow", "Standard", "Fast", "Very Fast"][settings.ai.acclimatizationPace]}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={5}
                        value={settings.ai.acclimatizationPace}
                        onChange={(e) => updateAI("acclimatizationPace", Number(e.target.value))}
                        className="w-full accent-forest"
                      />
                      <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                        <span>Extra cautious</span>
                        <span>Aggressive</span>
                      </div>
                    </div>

                    {/* Slider: Safety vs Speed */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-gray-400">Safety vs Speed Trade-off</label>
                        <span className="text-sm font-medium text-forest-light">
                          {settings.ai.safetyVsSpeedBias}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={100}
                        value={settings.ai.safetyVsSpeedBias}
                        onChange={(e) => updateAI("safetyVsSpeedBias", Number(e.target.value))}
                        className="w-full accent-forest"
                      />
                      <div className="flex justify-between text-[10px] text-gray-600 mt-1">
                        <span>Maximum Safety</span>
                        <span>Maximum Speed</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ─── NOTIFICATIONS ─── */}
                {activeCategory === "notifications" && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <Bell className="w-5 h-5 text-forest-light" />
                      Notifications
                    </h2>

                    {/* Individual notification toggles */}
                    {(
                      [
                        {
                          key: "weatherAlerts" as const,
                          label: "Weather Alerts",
                          desc: "Get notified about incoming storms, temperature drops, and wind changes",
                        },
                        {
                          key: "altitudeWarnings" as const,
                          label: "Altitude Warnings",
                          desc: "Alerts for rapid elevation gain and low SpO2 levels",
                        },
                        {
                          key: "restReminders" as const,
                          label: "Rest Reminders",
                          desc: "AI-optimized break reminders based on your fatigue levels",
                        },
                        {
                          key: "trailUpdates" as const,
                          label: "Trail Updates",
                          desc: "Conditions reported by other trekkers on your route",
                        },
                        {
                          key: "dailySummary" as const,
                          label: "Daily Summary",
                          desc: "Morning briefing with weather, trail conditions, and plan for the day",
                        },
                      ] as const
                    ).map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{item.label}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                        </div>
                        <Toggle
                          checked={settings.notifications[item.key]}
                          onChange={(v) => updateNotifications(item.key, v)}
                        />
                      </div>
                    ))}

                    <div className="h-px bg-white/5" />

                    {/* Quiet Hours */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Quiet Hours</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Silence non-critical notifications during sleep
                          </p>
                        </div>
                        <Toggle
                          checked={settings.notifications.quietHoursEnabled}
                          onChange={(v) => updateNotifications("quietHoursEnabled", v)}
                        />
                      </div>

                      {settings.notifications.quietHoursEnabled && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="grid grid-cols-2 gap-4"
                        >
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Start</label>
                            <input
                              type="time"
                              value={settings.notifications.quietHoursStart}
                              onChange={(e) => updateNotifications("quietHoursStart", e.target.value)}
                              className="w-full px-3 py-2 bg-card-light border border-white/10 dark:border-white/10 rounded-lg text-sm focus:border-forest focus:outline-none transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">End</label>
                            <input
                              type="time"
                              value={settings.notifications.quietHoursEnd}
                              onChange={(e) => updateNotifications("quietHoursEnd", e.target.value)}
                              className="w-full px-3 py-2 bg-card-light border border-white/10 dark:border-white/10 rounded-lg text-sm focus:border-forest focus:outline-none transition-colors"
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}

                {/* ─── PRIVACY & SAFETY ─── */}
                {activeCategory === "privacy" && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <Shield className="w-5 h-5 text-forest-light" />
                      Privacy & Safety
                    </h2>

                    {/* Toggles */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Share Location with Contacts</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Emergency contacts can see your live location during treks
                        </p>
                      </div>
                      <Toggle
                        checked={settings.privacy.shareLocationWithContacts}
                        onChange={(v) => updatePrivacy("shareLocationWithContacts", v)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Anonymous Usage Data</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Help improve Sherpa AI by sharing anonymous trail data
                        </p>
                      </div>
                      <Toggle
                        checked={settings.privacy.anonymousUsageData}
                        onChange={(v) => updatePrivacy("anonymousUsageData", v)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Public Profile</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Other trekkers can see your profile and trek history
                        </p>
                      </div>
                      <Toggle
                        checked={settings.privacy.showProfilePublicly}
                        onChange={(v) => updatePrivacy("showProfilePublicly", v)}
                      />
                    </div>

                    <div className="h-px bg-white/5" />

                    {/* Emergency Contacts */}
                    <div>
                      <h3 className="text-sm font-medium mb-3">Emergency Contacts</h3>
                      <div className="space-y-2 mb-3">
                        {settings.privacy.emergencyContacts.map((contact, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between px-3 py-2.5 bg-card-light border border-white/5 dark:border-white/5 rounded-lg"
                          >
                            <div>
                              <p className="text-sm font-medium">{contact.name}</p>
                              <p className="text-xs text-gray-500 font-mono">{contact.phone}</p>
                            </div>
                            <button
                              onClick={() => removeContact(i)}
                              className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Add contact form */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newContactName}
                          onChange={(e) => setNewContactName(e.target.value)}
                          placeholder="Name"
                          className="flex-1 px-3 py-2 bg-card-light border border-white/10 dark:border-white/10 rounded-lg text-sm focus:border-forest focus:outline-none transition-colors"
                        />
                        <input
                          type="tel"
                          value={newContactPhone}
                          onChange={(e) => setNewContactPhone(e.target.value)}
                          placeholder="Phone"
                          className="flex-1 px-3 py-2 bg-card-light border border-white/10 dark:border-white/10 rounded-lg text-sm focus:border-forest focus:outline-none transition-colors"
                        />
                        <button
                          onClick={addContact}
                          disabled={!newContactName.trim() || !newContactPhone.trim()}
                          className="px-3 py-2 bg-forest hover:bg-forest-light disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="h-px bg-white/5" />

                    {/* Data Retention */}
                    <div>
                      <h3 className="text-sm font-medium mb-3">Data Retention</h3>
                      <div className="flex gap-3">
                        {(
                          [
                            { value: "3months", label: "3 Months" },
                            { value: "1year", label: "1 Year" },
                            { value: "forever", label: "Forever" },
                          ] as const
                        ).map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => updatePrivacy("dataRetention", opt.value)}
                            className={`flex-1 py-2.5 text-sm font-medium rounded-lg border transition-colors ${
                              settings.privacy.dataRetention === opt.value
                                ? "bg-forest/10 text-forest-light border-forest/20"
                                : "text-gray-400 border-white/5 dark:border-white/5 hover:border-white/10"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="h-px bg-white/5" />

                    {/* Danger zone */}
                    <div>
                      <h3 className="text-sm font-medium text-red-400 mb-3">Danger Zone</h3>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => alert("Download started (Demo) — your data would be exported as a JSON file.")}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-white/10 dark:border-white/10 text-gray-300 hover:text-white rounded-lg transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Download My Data
                        </button>
                        <button
                          onClick={() => setShowDeleteModal(true)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-red-500/20 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ─── SUBSCRIPTION ─── */}
                {activeCategory === "subscription" && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-forest-light" />
                      Subscription
                    </h2>

                    {/* Plan card */}
                    <div className="rounded-xl bg-gradient-to-br from-forest/20 to-forest-dark/10 border border-forest/30 p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-forest/20 border border-forest/30 flex items-center justify-center">
                          <Crown className="w-5 h-5 text-amber" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold">Premium Plan</h3>
                          <p className="text-xs text-gray-400">Billed annually</p>
                        </div>
                        <span className="ml-auto px-3 py-1 text-xs font-semibold bg-amber/10 text-amber border border-amber/20 rounded-full">
                          Active
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        Full access to AI trek planning, real-time safety monitoring,
                        unlimited offline maps, and priority rescue coordination.
                      </p>
                    </div>

                    {/* Usage stats */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-1.5">
                        <BarChart3 className="w-4 h-4" />
                        Usage This Month
                      </h3>
                      <div className="grid sm:grid-cols-3 gap-4">
                        {[
                          { label: "AI Plans Generated", value: "12", max: "Unlimited", icon: Brain },
                          { label: "Offline Maps", value: "4 regions", max: "All regions", icon: Zap },
                          { label: "Alert History", value: "847 events", max: "Unlimited", icon: AlertTriangle },
                        ].map((stat) => (
                          <div
                            key={stat.label}
                            className="rounded-xl bg-card-light border border-white/5 dark:border-white/5 p-4"
                          >
                            <stat.icon className="w-4 h-4 text-forest-light mb-2" />
                            <p className="text-lg font-bold">{stat.value}</p>
                            <p className="text-xs text-gray-500">{stat.label}</p>
                            <p className="text-[10px] text-gray-600 mt-1">Limit: {stat.max}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => alert("This would redirect to the billing portal (Demo).")}
                        className="flex items-center gap-2 px-4 py-2.5 bg-forest hover:bg-forest-light text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        Manage Billing
                      </button>
                      <button
                        onClick={() => alert("Subscription cancellation flow would start here (Demo).")}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-white/10 dark:border-white/10 text-gray-300 hover:text-white rounded-lg transition-colors"
                      >
                        Cancel Subscription
                      </button>
                    </div>
                  </div>
                )}

                {/* ─── APP PREFERENCES ─── */}
                {activeCategory === "app" && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <Palette className="w-5 h-5 text-forest-light" />
                      App Preferences
                    </h2>

                    {/* Theme */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-3">Theme</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => updateApp("theme", "dark")}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${
                            settings.app.theme === "dark"
                              ? "bg-forest/10 border-forest/30 text-white"
                              : "border-white/5 dark:border-white/5 text-gray-400 hover:border-white/10"
                          }`}
                        >
                          <Moon className="w-5 h-5" />
                          <div className="text-left">
                            <p className="text-sm font-medium">Dark</p>
                            <p className="text-[10px] text-gray-500">Easier on the eyes</p>
                          </div>
                        </button>
                        <button
                          onClick={() => updateApp("theme", "light")}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${
                            settings.app.theme === "light"
                              ? "bg-forest/10 border-forest/30 text-white"
                              : "border-white/5 dark:border-white/5 text-gray-400 hover:border-white/10"
                          }`}
                        >
                          <Sun className="w-5 h-5" />
                          <div className="text-left">
                            <p className="text-sm font-medium">Light</p>
                            <p className="text-[10px] text-gray-500">Better in sunlight</p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Units */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-3">Units</label>
                      <div className="grid grid-cols-2 gap-3">
                        {(
                          [
                            { value: "metric", label: "Metric", desc: "km, °C, m" },
                            { value: "imperial", label: "Imperial", desc: "mi, °F, ft" },
                          ] as const
                        ).map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => updateApp("units", opt.value)}
                            className={`px-4 py-3 rounded-xl border text-left transition-colors ${
                              settings.app.units === opt.value
                                ? "bg-forest/10 border-forest/30 text-white"
                                : "border-white/5 dark:border-white/5 text-gray-400 hover:border-white/10"
                            }`}
                          >
                            <p className="text-sm font-medium">{opt.label}</p>
                            <p className="text-[10px] text-gray-500 mt-0.5">{opt.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Language */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Language</label>
                      <select
                        value={settings.app.language}
                        onChange={(e) => updateApp("language", e.target.value)}
                        className="w-full px-4 py-2.5 bg-card-light border border-white/10 dark:border-white/10 rounded-lg text-sm focus:border-forest focus:outline-none transition-colors appearance-none"
                      >
                        <option value="en">English</option>
                        <option value="ne">Nepali (नेपाली)</option>
                        <option value="hi">Hindi (हिन्दी)</option>
                        <option value="zh">Chinese (中文)</option>
                        <option value="ja">Japanese (日本語)</option>
                        <option value="ko">Korean (한국어)</option>
                        <option value="de">German (Deutsch)</option>
                        <option value="fr">French (Français)</option>
                      </select>
                    </div>

                    {/* Map Style */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-3">Map Style</label>
                      <div className="grid grid-cols-3 gap-3">
                        {(
                          [
                            { value: "satellite", label: "Satellite" },
                            { value: "terrain", label: "Terrain" },
                            { value: "topo", label: "Topographic" },
                          ] as const
                        ).map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => updateApp("mapStyle", opt.value)}
                            className={`py-2.5 text-sm font-medium rounded-lg border transition-colors ${
                              settings.app.mapStyle === opt.value
                                ? "bg-forest/10 text-forest-light border-forest/20"
                                : "text-gray-400 border-white/5 dark:border-white/5 hover:border-white/10"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-red-500/30 bg-card p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-red-400">Delete Account</h2>
                    <p className="text-xs text-gray-500">This action cannot be undone</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="rounded-lg bg-red-500/5 border border-red-500/10 p-4 mb-5">
                <p className="text-sm text-gray-300 leading-relaxed">
                  Deleting your account will permanently remove all your data including:
                </p>
                <ul className="mt-2 space-y-1 text-xs text-gray-400">
                  <li>- All saved trek plans and itineraries</li>
                  <li>- Alert history and safety records</li>
                  <li>- AI preferences and learning data</li>
                  <li>- Offline maps and cached data</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-2.5 text-sm font-medium border border-white/10 dark:border-white/10 hover:border-white/20 text-gray-300 hover:text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert("Account deletion requested (Demo)\n\nIn a real app, your account would be scheduled for deletion.");
                    setShowDeleteModal(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            Settings saved successfully
            <button onClick={() => setShowToast(false)} className="ml-1 p-0.5 hover:bg-white/10 rounded">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
