"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, CheckCircle, UserPlus } from "lucide-react";
import { type Guide, saveGuide } from "@/lib/guides";
import { treks } from "@/data/treks";

const LANGUAGE_OPTIONS = [
  "English", "Nepali", "Hindi", "Tibetan", "Mandarin",
  "Japanese", "German", "French", "Spanish", "Italian",
  "Korean", "Russian", "Arabic", "Portuguese",
];

const TREK_SPECIALIZATIONS = treks.map((t) => t.name);

export default function GuideRegisterPage() {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState(1);
  const [pricePerDay, setPricePerDay] = useState(60);
  const [photoUrl, setPhotoUrl] = useState("");
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [certifications, setCertifications] = useState<string[]>([""]);
  const [submitting, setSubmitting] = useState(false);

  function toggleSpec(s: string) {
    setSelectedSpecs((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  }

  function toggleLang(l: string) {
    setSelectedLangs((prev) =>
      prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l],
    );
  }

  function addCert() {
    setCertifications((prev) => [...prev, ""]);
  }

  function removeCert(i: number) {
    setCertifications((prev) => prev.filter((_, idx) => idx !== i));
  }

  function updateCert(i: number, val: string) {
    setCertifications((prev) => prev.map((c, idx) => (idx === i ? val : c)));
  }

  const isValid =
    name.trim() &&
    email.trim() &&
    location.trim() &&
    bio.trim().length >= 20 &&
    selectedSpecs.length > 0 &&
    selectedLangs.length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || submitting) return;
    setSubmitting(true);

    const guide: Guide = {
      id: `guide-${Date.now()}`,
      name: name.trim(),
      photo: photoUrl.trim(),
      bio: bio.trim(),
      experience,
      specializations: selectedSpecs,
      languages: selectedLangs,
      certifications: certifications.filter((c) => c.trim()),
      rating: 0,
      reviewCount: 0,
      pricePerDay,
      location: location.trim(),
      availability: true,
      verified: false,
      registeredAt: new Date().toISOString().split("T")[0],
      reviews: [],
    };

    saveGuide(guide);

    setTimeout(() => {
      setSubmitting(false);
      setShowToast(true);
      setTimeout(() => {
        router.push("/dashboard/guides");
      }, 1500);
    }, 500);
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-forest-light" />
          Register as a Guide
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Create your profile to connect with trekkers seeking a guide
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Basic info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-card border border-white/5 p-5 space-y-4"
        >
          <h2 className="text-sm font-semibold text-gray-300">Basic Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Pemba Sherpa"
                className="w-full bg-card-light border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-forest focus:outline-none placeholder:text-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="guide@example.com"
                className="w-full bg-card-light border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-forest focus:outline-none placeholder:text-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+977-98XXXXXXXX"
                className="w-full bg-card-light border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-forest focus:outline-none placeholder:text-gray-600"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">
                Base Location <span className="text-red-400">*</span>
              </label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Namche Bazaar, Solukhumbu"
                className="w-full bg-card-light border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-forest focus:outline-none placeholder:text-gray-600"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1.5">
              Profile Photo URL (optional)
            </label>
            <input
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://…"
              className="w-full bg-card-light border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-forest focus:outline-none placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1.5">
              Bio <span className="text-red-400">*</span>
              <span className="text-gray-600 ml-1">(min. 20 characters)</span>
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell trekkers about yourself, your background, and what makes your guiding style unique…"
              rows={4}
              className="w-full bg-card-light border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-forest focus:outline-none resize-none placeholder:text-gray-600"
              required
            />
            <p className="text-[10px] text-gray-600 mt-1">{bio.length} characters</p>
          </div>
        </motion.div>

        {/* Experience & pricing */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-2xl bg-card border border-white/5 p-5 space-y-4"
        >
          <h2 className="text-sm font-semibold text-gray-300">Experience & Pricing</h2>

          <div>
            <label className="block text-xs text-gray-500 mb-1.5">
              Years of Experience: <span className="text-white font-medium">{experience}</span>
            </label>
            <input
              type="range"
              min={0}
              max={40}
              value={experience}
              onChange={(e) => setExperience(Number(e.target.value))}
              className="w-full accent-forest"
            />
            <div className="flex justify-between text-[10px] text-gray-600 mt-0.5">
              <span>0</span>
              <span>40 years</span>
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1.5">
              Price per Day (USD): <span className="text-white font-medium">${pricePerDay}</span>
            </label>
            <input
              type="range"
              min={30}
              max={200}
              step={5}
              value={pricePerDay}
              onChange={(e) => setPricePerDay(Number(e.target.value))}
              className="w-full accent-forest"
            />
            <div className="flex justify-between text-[10px] text-gray-600 mt-0.5">
              <span>$30</span>
              <span>$200</span>
            </div>
          </div>
        </motion.div>

        {/* Specializations */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-card border border-white/5 p-5 space-y-3"
        >
          <h2 className="text-sm font-semibold text-gray-300">
            Specializations <span className="text-red-400">*</span>
          </h2>
          <p className="text-xs text-gray-500">Select all routes you are experienced in guiding.</p>
          <div className="flex flex-wrap gap-2">
            {TREK_SPECIALIZATIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => toggleSpec(s)}
                className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                  selectedSpecs.includes(s)
                    ? "bg-forest/15 text-forest-light border-forest/20"
                    : "border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {selectedSpecs.length > 0 && (
            <p className="text-[10px] text-gray-600">{selectedSpecs.length} selected</p>
          )}
        </motion.div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl bg-card border border-white/5 p-5 space-y-3"
        >
          <h2 className="text-sm font-semibold text-gray-300">
            Languages Spoken <span className="text-red-400">*</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {LANGUAGE_OPTIONS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => toggleLang(l)}
                className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                  selectedLangs.includes(l)
                    ? "bg-forest/15 text-forest-light border-forest/20"
                    : "border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          {selectedLangs.length > 0 && (
            <p className="text-[10px] text-gray-600">{selectedLangs.length} selected</p>
          )}
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-card border border-white/5 p-5 space-y-3"
        >
          <h2 className="text-sm font-semibold text-gray-300">Certifications</h2>
          <p className="text-xs text-gray-500">Add any relevant certifications or licenses.</p>

          <div className="space-y-2">
            {certifications.map((cert, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={cert}
                  onChange={(e) => updateCert(i, e.target.value)}
                  placeholder="e.g. TAAN Certified, Wilderness First Responder…"
                  className="flex-1 bg-card-light border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-forest focus:outline-none placeholder:text-gray-600"
                />
                {certifications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCert(i)}
                    className="p-2.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addCert}
            className="flex items-center gap-1.5 text-xs text-forest-light hover:text-white transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add certification
          </button>
        </motion.div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid || submitting}
          className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold bg-forest hover:bg-forest-light disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          {submitting ? "Registering…" : "Register as Guide"}
        </button>
      </form>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-forest text-white text-sm shadow-lg"
          >
            <CheckCircle className="w-4 h-4" />
            Profile registered! Redirecting…
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
