import Link from "next/link";
import { MapPin, BadgeCheck, Clock, DollarSign } from "lucide-react";
import { type Guide } from "@/lib/guides";
import StarRating from "./StarRating";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function GuideCard({ guide }: { guide: Guide }) {
  return (
    <div className="flex flex-col rounded-2xl bg-card border border-white/5 overflow-hidden hover:border-white/10 transition-colors">
      {/* Top section */}
      <div className="p-5 flex gap-4 items-start">
        {/* Avatar */}
        <div className="shrink-0 w-14 h-14 rounded-full bg-forest/20 border border-forest/30 flex items-center justify-center text-forest-light font-bold text-lg">
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

        {/* Name + badges */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-sm leading-tight">{guide.name}</span>
            {guide.verified && (
              <BadgeCheck className="w-4 h-4 text-forest-light shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-500">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{guide.location}</span>
          </div>

          {/* Rating */}
          <div className="mt-2">
            <StarRating
              rating={guide.rating}
              size={13}
              showNumber
              reviewCount={guide.reviewCount}
            />
          </div>
        </div>
      </div>

      {/* Specialization pill */}
      <div className="px-5 pb-3 flex flex-wrap gap-1.5">
        {guide.specializations.slice(0, 2).map((s) => (
          <span
            key={s}
            className="px-2 py-0.5 text-[10px] rounded-full bg-forest/10 text-forest-light border border-forest/20"
          >
            {s}
          </span>
        ))}
        {guide.specializations.length > 2 && (
          <span className="px-2 py-0.5 text-[10px] rounded-full bg-white/5 text-gray-500 border border-white/5">
            +{guide.specializations.length - 2} more
          </span>
        )}
      </div>

      {/* Stats row */}
      <div className="px-5 pb-4 flex items-center gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {guide.experience} yr{guide.experience !== 1 ? "s" : ""} exp
        </span>
        <span className="flex items-center gap-1">
          <DollarSign className="w-3.5 h-3.5" />
          ${guide.pricePerDay}/day
        </span>
        <span
          className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-medium ${
            guide.availability
              ? "bg-forest/10 text-forest-light border border-forest/20"
              : "bg-white/5 text-gray-500 border border-white/5"
          }`}
        >
          {guide.availability ? "Available" : "Booked"}
        </span>
      </div>

      {/* CTA */}
      <div className="mt-auto px-5 pb-5">
        <Link
          href={`/dashboard/guides/${guide.id}`}
          className="block w-full text-center py-2 text-sm font-medium rounded-lg bg-forest hover:bg-forest-light transition-colors text-white"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
