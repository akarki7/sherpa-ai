"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  /* Read persisted theme on mount */
  useEffect(() => {
    try {
      const raw = localStorage.getItem("sherpa-ai-settings");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.app?.theme === "light" || parsed?.app?.theme === "dark") {
          setThemeState(parsed.app.theme);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  /* Sync <html> class whenever theme changes */
  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [theme]);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    /* Also persist into the settings blob so the settings page stays in sync */
    try {
      const raw = localStorage.getItem("sherpa-ai-settings");
      const settings = raw ? JSON.parse(raw) : {};
      settings.app = { ...(settings.app || {}), theme: t };
      localStorage.setItem("sherpa-ai-settings", JSON.stringify(settings));
    } catch {
      // ignore
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
