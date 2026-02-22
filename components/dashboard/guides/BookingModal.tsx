"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Calendar, Users, DollarSign, CheckCircle } from "lucide-react";
import { type Guide, saveBooking, type Booking } from "@/lib/guides";

interface BookingModalProps {
  guide: Guide;
  trekName: string;
  startDate: string;
  endDate: string;
  groupSize: number;
  message: string;
  onClose: () => void;
  onSuccess: () => void;
}

function daysBetween(a: string, b: string): number {
  if (!a || !b) return 0;
  const diff = new Date(b).getTime() - new Date(a).getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function BookingModal({
  guide,
  trekName,
  startDate,
  endDate,
  groupSize,
  message,
  onClose,
  onSuccess,
}: BookingModalProps) {
  const [confirming, setConfirming] = useState(false);

  const days = daysBetween(startDate, endDate);
  const totalCost = days * guide.pricePerDay * groupSize;

  function handleConfirm() {
    setConfirming(true);
    const booking: Booking = {
      id: `booking-${Date.now()}`,
      guideId: guide.id,
      guideName: guide.name,
      touristName: "You",
      touristEmail: "",
      touristPhone: "",
      trekName,
      startDate,
      endDate,
      groupSize,
      message,
      status: "pending",
      totalCost,
      createdAt: new Date().toISOString(),
    };
    saveBooking(booking);
    setTimeout(() => {
      setConfirming(false);
      onSuccess();
    }, 600);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-card p-6 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold">Confirm Booking</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Summary */}
        <div className="rounded-xl bg-card-light border border-white/5 p-4 space-y-3 mb-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Guide</span>
            <span className="text-sm font-medium">{guide.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Trek</span>
            <span className="text-sm font-medium">{trekName || "—"}</span>
          </div>
          <div className="border-t border-white/5" />
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>
              {startDate || "—"} → {endDate || "—"}
              {days > 0 && <span className="text-gray-500"> ({days} day{days !== 1 ? "s" : ""})</span>}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Users className="w-3.5 h-3.5" />
            <span>{groupSize} person{groupSize !== 1 ? "s" : ""}</span>
          </div>
        </div>

        {/* Cost breakdown */}
        <div className="rounded-xl bg-forest/5 border border-forest/20 p-4 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-4 h-4 text-forest-light" />
            <span className="text-xs font-semibold text-forest-light">Cost Breakdown</span>
          </div>
          <div className="space-y-1.5 text-xs text-gray-400">
            <div className="flex justify-between">
              <span>${guide.pricePerDay}/day × {days} day{days !== 1 ? "s" : ""}</span>
              <span>${guide.pricePerDay * days}</span>
            </div>
            <div className="flex justify-between">
              <span>× {groupSize} person{groupSize !== 1 ? "s" : ""}</span>
              <span className="text-white font-semibold text-sm">${totalCost}</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-600 mb-5">
          This sends a booking request to {guide.name}. No payment is processed at this stage.
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-medium border border-white/10 hover:border-white/20 text-gray-300 hover:text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={confirming || !trekName || !startDate || !endDate || days === 0}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-forest hover:bg-forest-light disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            {confirming ? "Confirming…" : "Confirm Booking"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
