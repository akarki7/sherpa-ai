export interface User {
  name: string;
  email: string;
  experience: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

const STORAGE_KEY = "sherpa-ai-user";

export const DEFAULT_USER: User = {
  name: "Aabishkar Karki",
  email: "aabishkar@example.com",
  experience: "Intermediate",
};

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function storeUser(user: User): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearUser(): void {
  localStorage.removeItem(STORAGE_KEY);
}
