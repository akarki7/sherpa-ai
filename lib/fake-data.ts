export const activeTrek = {
  name: "Langtang Valley Trek",
  currentDay: 3,
  totalDays: 7,
  altitude: "3,540m",
  nextStop: "Langtang Village",
  distanceToNext: "4.2 km",
  progress: 43, // percent
};

export const aiStatus = {
  weather: "Clear for 48hrs",
  risk: "Low",
  nextRest: "2.3 km ahead",
  o2Saturation: "94%",
  recommendation: "Maintain current pace",
};

export const quickStats = [
  { label: "Distance", value: "34.2", unit: "km", change: "+2.1 today" },
  { label: "Elevation", value: "1,847", unit: "m", change: "+312 today" },
  { label: "Steps", value: "18,432", unit: "", change: "+3,210 today" },
  { label: "Avg HR", value: "72", unit: "bpm", change: "Normal" },
];

export const recentAlerts = [
  {
    id: 1,
    severity: "warning" as const,
    title: "Weather Change Expected",
    description: "Light rain forecasted for tomorrow afternoon",
    time: "2 hours ago",
  },
  {
    id: 2,
    severity: "info" as const,
    title: "Trail Condition Update",
    description: "Muddy section reported near Lama Hotel",
    time: "5 hours ago",
  },
  {
    id: 3,
    severity: "success" as const,
    title: "Altitude Check Passed",
    description: "Your acclimatization rate is within safe limits",
    time: "8 hours ago",
  },
];

export const upcomingTrek = {
  name: "Everest Base Camp",
  startDate: "March 15, 2026",
  duration: "14 days",
  status: "Planning" as const,
  difficulty: "Advanced",
  maxAltitude: "5,364m",
};

export const elevationData = [
  { distance: 0, elevation: 1400, label: "Syabrubesi" },
  { distance: 3, elevation: 1800, label: "" },
  { distance: 6, elevation: 2200, label: "Lama Hotel" },
  { distance: 9, elevation: 2600, label: "" },
  { distance: 12, elevation: 2800, label: "" },
  { distance: 15, elevation: 3200, label: "Ghoda Tabela" },
  { distance: 18, elevation: 3430, label: "Langtang Village" },
  { distance: 21, elevation: 3540, label: "Current Position" },
  { distance: 24, elevation: 3800, label: "" },
  { distance: 27, elevation: 3900, label: "" },
  { distance: 30, elevation: 4100, label: "Kyanjin Gompa" },
  { distance: 34, elevation: 4773, label: "Tserko Ri" },
];
