import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number; // 0–5, supports decimals
  size?: number;
  showNumber?: boolean;
  reviewCount?: number;
}

export default function StarRating({
  rating,
  size = 14,
  showNumber = false,
  reviewCount,
}: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5].map((n) => {
    if (rating >= n) return "full";
    if (rating >= n - 0.5) return "half";
    return "empty";
  });

  return (
    <span className="flex items-center gap-1">
      <span className="flex items-center gap-0.5">
        {stars.map((fill, i) => (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            {/* empty star base */}
            <Star
              style={{ width: size, height: size }}
              className="text-gray-700 fill-gray-700"
            />
            {/* filled overlay */}
            {fill !== "empty" && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: fill === "half" ? "50%" : "100%" }}
              >
                <Star
                  style={{ width: size, height: size }}
                  className="text-amber fill-amber"
                />
              </span>
            )}
          </span>
        ))}
      </span>
      {showNumber && (
        <span className="text-xs text-gray-400 ml-0.5">
          {rating.toFixed(1)}
          {reviewCount !== undefined && (
            <span className="text-gray-600"> ({reviewCount})</span>
          )}
        </span>
      )}
    </span>
  );
}
