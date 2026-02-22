"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  BadgeCheck,
  Globe,
  Award,
  Users,
  DollarSign,
  CalendarDays,
  ChevronDown,
} from "lucide-react";
import { type Guide, getGuideById } from "@/lib/guides";
import StarRating from "@/components/dashboard/guides/StarRating";
import BookingModal from "@/components/dashboard/guides/BookingModal";
import { treks } from "@/data/treks";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function GuideProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [trekName, setTrekName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [groupSize, setGroupSize] = useState(1);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (id) {
      const found = getGuideById(id);
      setGuide(found);
    }
  }, [id]);

  function handleSuccess() {
    setShowModal(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    setTrekName("");
    setStartDate("");
    setEndDate("");
    setGroupSize(1);
    setMessage("");
  }

  if (!guide) {
    return (
      <div className="text-center py-20 text-gray-500 text-sm">
        Guide not found.
      </div>
    );
  }

  const isFormValid = trekName && startDate && endDate && startDate < endDate;

  return (
    <div className="max-w-4xl space-y-6">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to guides
      </button>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-card border border-white/5 p-6"
      >
        <div className="flex flex-col sm:flex-row gap-5 items-start">
          {/* Avatar */}
          <div className="shrink-0 w-20 h-20 rounded-full bg-forest/20 border-2 border-forest/30 flex items-center justify-center text-forest-light font-bold text-2xl">
            {guide.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={guide.photo}
                alt={guide.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              getInitials(guide.name)
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold">{guide.name}</h1>
              {guide.verified && (
                <span className="flex items-center gap-1 px-2.5 py-0.5 text-xs bg-forest/10 text-forest-light border border-forest/20 rounded-full">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  Verified
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-400">
              <MapPin className="w-4 h-4 shrink-0" />
              {guide.location}
            </div>

            <div className="mt-2">
              <StarRating
                rating={guide.rating}
                size={16}
                showNumber
                reviewCount={guide.reviewCount}
              />
            </div>
          </div>

          {/* Price + availability */}
          <div className="sm:text-right space-y-2 shrink-0">
            <div className="flex items-center gap-1.5 text-xl font-bold sm:justify-end">
              <DollarSign className="w-5 h-5 text-forest-light" />
              {guide.pricePerDay}
              <span className="text-sm font-normal text-gray-500">/day</span>
            </div>
            <span
              className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                guide.availability
                  ? "bg-forest/10 text-forest-light border border-forest/20"
                  : "bg-white/5 text-gray-500 border border-white/5"
              }`}
            >
              {guide.availability ? "Available for bookings" : "Currently booked"}
            </span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: About + reviews */}
        <div className="lg:col-span-2 space-y-5">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl bg-card border border-white/5 p-5 space-y-4"
          >
            <h2 className="font-semibold text-sm text-gray-300">About</h2>
            <p className="text-sm text-gray-400 leading-relaxed">{guide.bio}</p>

            {/* Experience */}
            <div className="flex items-center gap-2 text-sm">
              <CalendarDays className="w-4 h-4 text-forest-light shrink-0" />
              <span className="text-gray-300">
                {guide.experience} year{guide.experience !== 1 ? "s" : ""} of experience
              </span>
            </div>

            {/* Languages */}
            <div className="flex items-start gap-2">
              <Globe className="w-4 h-4 text-forest-light shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 mb-1.5">Languages</p>
                <div className="flex flex-wrap gap-1.5">
                  {guide.languages.map((l) => (
                    <span
                      key={l}
                      className="px-2.5 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="flex items-start gap-2">
              <Award className="w-4 h-4 text-forest-light shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 mb-1.5">Certifications</p>
                <div className="flex flex-wrap gap-1.5">
                  {guide.certifications.map((c) => (
                    <span
                      key={c}
                      className="px-2.5 py-1 text-xs rounded-full bg-amber/10 border border-amber/20 text-amber"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Specializations */}
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-forest-light shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 mb-1.5">Specializations</p>
                <div className="flex flex-wrap gap-1.5">
                  {guide.specializations.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 text-xs rounded-full bg-forest/10 border border-forest/20 text-forest-light"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-card border border-white/5 p-5 space-y-4"
          >
            <h2 className="font-semibold text-sm text-gray-300">
              Reviews ({guide.reviews.length})
            </h2>
            {guide.reviews.length === 0 ? (
              <p className="text-xs text-gray-600">No reviews yet.</p>
            ) : (
              <div className="space-y-4">
                {guide.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-xl bg-card-light border border-white/5 p-4"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <p className="text-sm font-medium">{review.touristName}</p>
                        <p className="text-xs text-gray-500">{review.trekName}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <StarRating rating={review.rating} size={12} />
                        <p className="text-[10px] text-gray-600 mt-0.5">{review.date}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Right: Booking form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl bg-card border border-white/5 p-5 space-y-4 h-fit"
        >
          <h2 className="font-semibold text-sm text-gray-300">Request Booking</h2>

          {/* Trek select */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Trek</label>
            <div className="relative">
              <select
                value={trekName}
                onChange={(e) => setTrekName(e.target.value)}
                className="w-full appearance-none bg-card-light border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-forest focus:outline-none text-gray-200 pr-8"
              >
                <option value="">Select a trek…</option>
                {treks.map((t) => (
                  <option key={t.slug} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Start date */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-card-light border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-forest focus:outline-none text-gray-200"
            />
          </div>

          {/* End date */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              className="w-full bg-card-light border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-forest focus:outline-none text-gray-200"
            />
          </div>

          {/* Group size */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">
              Group Size: {groupSize}
            </label>
            <input
              type="range"
              min={1}
              max={20}
              value={groupSize}
              onChange={(e) => setGroupSize(Number(e.target.value))}
              className="w-full accent-forest"
            />
            <div className="flex justify-between text-[10px] text-gray-600 mt-0.5">
              <span>1</span>
              <span>20</span>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">
              Message (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell the guide about your experience level, any special requirements…"
              rows={3}
              className="w-full bg-card-light border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:border-forest focus:outline-none resize-none placeholder:text-gray-600 text-gray-200"
            />
          </div>

          <button
            onClick={() => setShowModal(true)}
            disabled={!isFormValid}
            className="w-full py-2.5 text-sm font-semibold bg-forest hover:bg-forest-light disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            Request Booking
          </button>
        </motion.div>
      </div>

      {/* Booking modal */}
      <AnimatePresence>
        {showModal && (
          <BookingModal
            guide={guide}
            trekName={trekName}
            startDate={startDate}
            endDate={endDate}
            groupSize={groupSize}
            message={message}
            onClose={() => setShowModal(false)}
            onSuccess={handleSuccess}
          />
        )}
      </AnimatePresence>

      {/* Success toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-forest text-white text-sm shadow-lg"
          >
            <BadgeCheck className="w-4 h-4" />
            Booking request sent to {guide.name}!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
