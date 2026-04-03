/**
 * Ustaad Auth Utility
 * Uses the same localStorage key as the login page ("loggedInUser").
 * Swappable for real session/cookie logic later.
 */
export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("loggedInUser");
}

export function getLoggedInUser(): Record<string, string> | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("loggedInUser");
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function logout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("loggedInUser");
}
