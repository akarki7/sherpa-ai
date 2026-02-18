export interface Settings {
  /* Profile */
  profile: {
    displayName: string;
    email: string;
    experience: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    bio: string;
  };

  /* AI Preferences */
  ai: {
    autoSuggestions: boolean;
    detailedExplanations: boolean;
    conservativeAlerts: boolean;
    riskTolerance: number; // 1-5
    acclimatizationPace: number; // 1-5
    safetyVsSpeedBias: number; // 1-100, 1=safety, 100=speed
  };

  /* Notifications */
  notifications: {
    weatherAlerts: boolean;
    altitudeWarnings: boolean;
    restReminders: boolean;
    trailUpdates: boolean;
    dailySummary: boolean;
    quietHoursEnabled: boolean;
    quietHoursStart: string; // "HH:MM"
    quietHoursEnd: string;
  };

  /* Privacy & Safety */
  privacy: {
    shareLocationWithContacts: boolean;
    anonymousUsageData: boolean;
    showProfilePublicly: boolean;
    emergencyContacts: { name: string; phone: string }[];
    dataRetention: "3months" | "1year" | "forever";
  };

  /* Subscription */
  subscription: {
    plan: "free" | "premium" | "pro";
    // Read-only mock data
  };

  /* App Preferences */
  app: {
    theme: "dark" | "light";
    units: "metric" | "imperial";
    language: string;
    mapStyle: "satellite" | "terrain" | "topo";
  };
}

const STORAGE_KEY = "sherpa-ai-settings";

export const DEFAULT_SETTINGS: Settings = {
  profile: {
    displayName: "Aabishkar Karki",
    email: "aabishkar@example.com",
    experience: "Intermediate",
    bio: "",
  },
  ai: {
    autoSuggestions: true,
    detailedExplanations: true,
    conservativeAlerts: false,
    riskTolerance: 3,
    acclimatizationPace: 3,
    safetyVsSpeedBias: 30,
  },
  notifications: {
    weatherAlerts: true,
    altitudeWarnings: true,
    restReminders: true,
    trailUpdates: true,
    dailySummary: false,
    quietHoursEnabled: false,
    quietHoursStart: "22:00",
    quietHoursEnd: "07:00",
  },
  privacy: {
    shareLocationWithContacts: true,
    anonymousUsageData: true,
    showProfilePublicly: false,
    emergencyContacts: [
      { name: "Ram Karki", phone: "+977-9841234567" },
    ],
    dataRetention: "1year",
  },
  subscription: {
    plan: "premium",
  },
  app: {
    theme: "dark",
    units: "metric",
    language: "en",
    mapStyle: "terrain",
  },
};

export function getSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: Settings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}
