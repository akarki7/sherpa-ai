"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Brain,
  CloudRain,
  TrendingUp,
  Coffee,
  Mountain,
  Radio,
  ChevronDown,
  Phone,
  MapPin,
  X,
  Shield,
  Siren,
} from "lucide-react";

/* ─── types ─── */
type Severity = "info" | "warning" | "critical";
type AlertType =
  | "Weather Change"
  | "Altitude Risk"
  | "Rest Recommended"
  | "Trail Condition"
  | "Emergency Protocol";

interface Alert {
  id: number;
  severity: Severity;
  type: AlertType;
  title: string;
  description: string;
  aiReasoning: string;
  recommendedAction: string;
  timestamp: string;
  location: string;
}

/* ─── config ─── */
const severityConfig: Record<
  Severity,
  { dot: string; bg: string; border: string; text: string; label: string }
> = {
  info: {
    dot: "bg-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    text: "text-blue-400",
    label: "Info",
  },
  warning: {
    dot: "bg-amber",
    bg: "bg-amber/10",
    border: "border-amber/20",
    text: "text-amber",
    label: "Warning",
  },
  critical: {
    dot: "bg-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-500",
    label: "Critical",
  },
};

const typeIcons: Record<AlertType, typeof AlertTriangle> = {
  "Weather Change": CloudRain,
  "Altitude Risk": TrendingUp,
  "Rest Recommended": Coffee,
  "Trail Condition": Mountain,
  "Emergency Protocol": Radio,
};

/* ─── fake alerts ─── */
const alerts: Alert[] = [
  {
    id: 1,
    severity: "critical",
    type: "Altitude Risk",
    title: "Altitude Risk Zone Ahead — Rapid Gain Detected",
    description:
      "You will gain 620m in the next 4.2 km. Your current SpO2 is 89% which is below the safe threshold of 90% at this altitude.",
    aiReasoning:
      "Analysis of your ascent rate over the past 3 hours shows 380m/hr — exceeding the recommended 300m/hr maximum. Combined with your declining SpO2 trend (93% → 89%) and elevated resting heart rate (98 bpm vs your baseline 72 bpm), the AI models predict a 34% probability of moderate AMS symptoms within 6 hours if current pace continues.",
    recommendedAction:
      "Reduce pace immediately. Rest for 30 minutes at the next flat section (0.8 km ahead). If SpO2 drops below 85% or headache worsens, descend to Langtang Village (3,430m). Drink 500ml water now. Consider Diamox 125mg if symptoms persist.",
    timestamp: "12 minutes ago",
    location: "Between Ghoda Tabela and Langtang Village (3,640m)",
  },
  {
    id: 2,
    severity: "warning",
    type: "Weather Change",
    title: "Weather Change Detected — Afternoon Storm Forming",
    description:
      "Satellite and barometric data indicate a weather system approaching from the northwest. Rain expected within 3–4 hours.",
    aiReasoning:
      "Barometric pressure has dropped 4 hPa in the last 2 hours (from 648 to 644 hPa), consistent with approaching low-pressure system. Cloud pattern analysis from the last satellite pass confirms cumulonimbus formation over the Langtang Himal ridge. Historical data shows 78% of similar patterns produce 2–4 hours of moderate rainfall with possible sleet above 4,000m.",
    recommendedAction:
      "Aim to reach Langtang Village before 2:00 PM. Prepare rain gear now. Avoid exposed ridgelines after 1:30 PM. If caught in storm, seek shelter in the nearest teahouse — there is one at km 16.4 on your route. Lightning risk is moderate.",
    timestamp: "47 minutes ago",
    location: "Langtang Valley sector — 3,200m to 3,800m",
  },
  {
    id: 3,
    severity: "warning",
    type: "Trail Condition",
    title: "Trail Condition Update — Landslide Debris Near Lama Hotel",
    description:
      "Recent reports from 3 trekkers indicate a minor landslide has partially blocked the trail 1.2 km south of Lama Hotel.",
    aiReasoning:
      "Three independent trekker reports filed within the past 8 hours describe fallen rocks and loose soil covering approximately 15m of trail. GPS coordinates cluster at 28.1847°N, 85.5231°E. No injuries reported. Trail is passable but requires careful navigation. The area has a history of minor slides during the post-monsoon season — 4 incidents logged in the past 3 years at this location.",
    recommendedAction:
      "Proceed with caution when reaching km 8.3. Stay on the uphill side of the trail. Do not stop in the slide zone. Use trekking poles for stability. If conditions appear worse than described, use the alternate river-side path (adds 20 minutes). Report any changes via the trail condition button.",
    timestamp: "2 hours ago",
    location: "1.2 km south of Lama Hotel (2,380m)",
  },
  {
    id: 4,
    severity: "info",
    type: "Rest Recommended",
    title: "Rest Recommended — Optimal Recovery Window",
    description:
      "Based on your activity data, now is the ideal time for a 20-minute rest to maintain energy levels for the afternoon climb.",
    aiReasoning:
      "You have been hiking for 3.5 hours continuously with an average heart rate of 142 bpm (Zone 3). Your pace has slowed 18% in the last 40 minutes, indicating onset of fatigue. Glycogen depletion models estimate your energy reserves at 45%. The next section involves a 400m altitude gain over 3 km — taking a rest now will improve your sustained pace by an estimated 22%.",
    recommendedAction:
      "Rest for 15–20 minutes. Eat a high-carbohydrate snack (300+ calories). Drink 400ml of water with electrolytes. Stretch your calves and hip flexors. The teahouse at Ghoda Tabela (0.3 km ahead) is a good rest point with hot tea available.",
    timestamp: "3 hours ago",
    location: "Near Ghoda Tabela (3,190m)",
  },
  {
    id: 5,
    severity: "info",
    type: "Weather Change",
    title: "Clear Skies Confirmed — Ideal Conditions Tomorrow",
    description:
      "Weather models confirm clear conditions for the next 36 hours. Excellent window for the Kyanjin Ri summit attempt.",
    aiReasoning:
      "Three independent weather models (GFS, ECMWF, NAM) agree on a high-pressure ridge settling over the Langtang region for the next 48 hours. Wind speeds at 4,700m forecasted at 8–12 km/h from the northwest. Visibility expected to exceed 40 km. Temperature at summit: -8°C at sunrise. This is the best weather window in the past 5 days.",
    recommendedAction:
      "Proceed with the Kyanjin Ri (4,773m) summit attempt tomorrow. Depart by 5:00 AM for sunrise views. Bring warm layers — wind chill will feel like -18°C at the summit. Carry 1L of water and energy snacks. Expected round-trip time: 4.5 hours from Kyanjin Gompa.",
    timestamp: "5 hours ago",
    location: "Kyanjin Gompa (3,870m)",
  },
  {
    id: 6,
    severity: "warning",
    type: "Altitude Risk",
    title: "Sleep Quality Alert — Possible Altitude Effect",
    description:
      "Your sleep data from last night shows 12 awakenings and only 2.1 hours of deep sleep — significantly below your baseline.",
    aiReasoning:
      "Your average deep sleep at lower altitudes is 3.8 hours with 4 awakenings per night. Last night at 3,430m: 2.1 hours deep sleep, 12 awakenings, SpO2 dipped to 84% three times (Cheyne-Stokes pattern detected). While these are common at altitude and not immediately dangerous, they indicate your body is still acclimatizing. Poor sleep compounds fatigue and increases AMS susceptibility.",
    recommendedAction:
      "Consider spending an extra night at current altitude before ascending further. Sleep with your head elevated. Avoid alcohol and heavy meals before bed. Stay well hydrated but reduce fluid intake 2 hours before sleep to minimize awakenings. If headache persists upon waking, take 400mg ibuprofen and reassess.",
    timestamp: "8 hours ago",
    location: "Langtang Village (3,430m)",
  },
  {
    id: 7,
    severity: "info",
    type: "Trail Condition",
    title: "Water Source Verified — Safe to Refill",
    description:
      "The stream crossing at km 14.8 has been tested and is safe for filtering. Flow rate is good for the season.",
    aiReasoning:
      "Water quality was last tested by a trekker 6 hours ago using a TDS meter — reading of 45 ppm (excellent). The source is a glacial spring with no upstream settlements. Historical contamination reports: zero in 3 years of data. Flow rate is adequate for quick refills. Note: always filter or treat water regardless of source quality ratings.",
    recommendedAction:
      "Refill water bottles at the stream crossing (km 14.8). Use your water filter as always. This is the last reliable water source for 4.2 km until Langtang Village. Fill all available containers — you need at least 1.5L for the next section given the altitude and exertion level.",
    timestamp: "10 hours ago",
    location: "Stream crossing at km 14.8 (3,100m)",
  },
  {
    id: 8,
    severity: "critical",
    type: "Emergency Protocol",
    title: "Emergency Protocol Test — System Check Complete",
    description:
      "Monthly automated test of emergency communication systems. All channels operational.",
    aiReasoning:
      "Automated test initiated at 06:00 local time. GPS lock acquired in 2.3 seconds (4 satellites). Satellite messenger: connected, message sent and confirmed. Emergency contacts: 2 of 2 reachable via SMS. Nepal rescue coordination center: beacon registered and acknowledged. On-device emergency cache: 72 hours of offline operation confirmed. Battery reserve for emergency mode: 18 hours at current charge.",
    recommendedAction:
      "No action needed — this is a routine system test. Your emergency systems are fully operational. Next scheduled test: 7 days. To manually test emergency protocols, go to Settings → Emergency → Test Mode. Remember: the SOS button requires a 3-second hold to activate to prevent accidental triggers.",
    timestamp: "12 hours ago",
    location: "System-wide",
  },
];

const allTypes: AlertType[] = [
  "Weather Change",
  "Altitude Risk",
  "Rest Recommended",
  "Trail Condition",
  "Emergency Protocol",
];
const allSeverities: Severity[] = ["info", "warning", "critical"];

/* ─── page ─── */
export default function AlertsPage() {
  const [filterType, setFilterType] = useState<AlertType | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<Severity | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [sosOpen, setSosOpen] = useState(false);

  const filtered = alerts.filter((a) => {
    if (filterType && a.type !== filterType) return false;
    if (filterSeverity && a.severity !== filterSeverity) return false;
    return true;
  });

  const hasFilters = filterType || filterSeverity;

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Safety Alerts</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            AI-powered safety monitoring for your active trek
          </p>
        </div>
        <button
          onClick={() => setSosOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-red-600/20"
        >
          <Siren className="w-4 h-4" />
          Emergency SOS
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Severity */}
        {allSeverities.map((s) => {
          const cfg = severityConfig[s];
          return (
            <button
              key={s}
              onClick={() =>
                setFilterSeverity(filterSeverity === s ? null : s)
              }
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                filterSeverity === s
                  ? `${cfg.bg} ${cfg.text} ${cfg.border}`
                  : "border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {cfg.label}
            </button>
          );
        })}

        <span className="w-px h-5 bg-white/10" />

        {/* Type */}
        {allTypes.map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(filterType === t ? null : t)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
              filterType === t
                ? "bg-forest/15 text-forest-light border-forest/20"
                : "border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}

        {hasFilters && (
          <button
            onClick={() => {
              setFilterType(null);
              setFilterSeverity(null);
            }}
            className="px-3 py-1.5 text-xs font-medium rounded-full border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Count */}
      <p className="text-xs text-gray-500">
        {filtered.length} alert{filtered.length !== 1 && "s"}
      </p>

      {/* Alert feed */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Shield className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">
              No alerts match your filters.
            </p>
          </div>
        ) : (
          filtered.map((alert) => {
            const cfg = severityConfig[alert.severity];
            const Icon = typeIcons[alert.type];
            const isOpen = expandedId === alert.id;

            return (
              <motion.div
                key={alert.id}
                layout
                className={`rounded-xl border bg-card overflow-hidden ${cfg.border}`}
              >
                <button
                  onClick={() => setExpandedId(isOpen ? null : alert.id)}
                  className="w-full text-left p-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 w-8 h-8 rounded-lg ${cfg.bg} flex items-center justify-center shrink-0`}
                    >
                      <Icon className={`w-4 h-4 ${cfg.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-semibold uppercase rounded-full ${cfg.bg} ${cfg.text} border ${cfg.border}`}
                        >
                          {cfg.label}
                        </span>
                        <span className="text-[10px] text-gray-600 px-2 py-0.5 rounded-full border border-white/5">
                          {alert.type}
                        </span>
                        <span className="text-[10px] text-gray-600 ml-auto shrink-0">
                          {alert.timestamp}
                        </span>
                      </div>
                      <h3 className="text-sm font-medium leading-snug">
                        {alert.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {alert.description}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-[10px] text-gray-600">
                        <MapPin className="w-3 h-3" />
                        {alert.location}
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 shrink-0 mt-1 transition-transform ${isOpen ? "rotate-180" : ""}`}
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
                      <div className="px-4 pb-4 pt-0 ml-11 space-y-4">
                        <div className="rounded-lg bg-card-light border border-white/5 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Brain className="w-3.5 h-3.5 text-forest-light" />
                            <span className="text-xs font-semibold text-forest-light">
                              AI Reasoning
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            {alert.aiReasoning}
                          </p>
                        </div>
                        <div className="rounded-lg bg-forest/5 border border-forest/20 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-3.5 h-3.5 text-forest-light" />
                            <span className="text-xs font-semibold text-forest-light">
                              Recommended Action
                            </span>
                          </div>
                          <p className="text-xs text-gray-300 leading-relaxed">
                            {alert.recommendedAction}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>

      {/* SOS Modal */}
      <AnimatePresence>
        {sosOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSosOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-red-500/30 bg-card p-6 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/20 flex items-center justify-center">
                    <Siren className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-red-400">
                      Emergency SOS
                    </h2>
                    <p className="text-xs text-gray-500">
                      Confirm to activate rescue protocol
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSosOpen(false)}
                  className="p-1.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Location */}
              <div className="rounded-xl bg-card-light border border-white/5 p-4 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  Your Current Location
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-[10px] text-gray-600 block">
                      Latitude
                    </span>
                    <span className="font-mono font-medium">28.2096°N</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 block">
                      Longitude
                    </span>
                    <span className="font-mono font-medium">85.5150°E</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 block">
                      Altitude
                    </span>
                    <span className="font-mono font-medium">3,640m</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 block">
                      Accuracy
                    </span>
                    <span className="font-mono font-medium text-forest-light">
                      ±4m
                    </span>
                  </div>
                </div>
              </div>

              {/* Rescue contacts */}
              <div className="rounded-xl bg-card-light border border-white/5 p-4 mb-5">
                <div className="text-xs text-gray-500 mb-2.5">
                  Rescue Contacts
                </div>
                <div className="space-y-2.5">
                  {[
                    {
                      name: "Nepal Rescue Coordination",
                      phone: "+977-1-4261370",
                      status: "Primary",
                    },
                    {
                      name: "Himalayan Rescue Association",
                      phone: "+977-1-4440292",
                      status: "Medical",
                    },
                    {
                      name: "Tourist Police (Kathmandu)",
                      phone: "+977-1-4247041",
                      status: "Backup",
                    },
                  ].map((contact) => (
                    <div
                      key={contact.name}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <div className="text-sm font-medium">
                          {contact.name}
                        </div>
                        <div className="text-xs text-gray-500 font-mono">
                          {contact.phone}
                        </div>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-forest/10 text-forest-light border border-forest/20">
                        {contact.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Protocol note */}
              <div className="rounded-lg bg-red-500/5 border border-red-500/10 p-3 mb-5">
                <p className="text-xs text-gray-400 leading-relaxed">
                  Activating SOS will send your GPS coordinates, altitude,
                  vitals, and trek context to all rescue contacts and your
                  emergency contacts. Your phone will enter low-power emergency
                  beacon mode.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSosOpen(false)}
                  className="flex-1 py-2.5 text-sm font-medium border border-white/10 hover:border-white/20 text-gray-300 hover:text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert(
                      "SOS Activated (Demo)\n\nIn a real emergency, your coordinates would be sent to rescue services.\n\nLocation: 28.2096°N, 85.5150°E\nAltitude: 3,640m",
                    );
                    setSosOpen(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Activate SOS
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
