/**
 * Ustaad Auth Utility
 * Uses the same localStorage key as the login page ("loggedInUser").
 * Swappable for real session/cookie logic later.
 */

export interface LoggedInUser {
  id: string;
  email: string;
  role: "car_owner" | "garage_owner";
  name: string;
}

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("loggedInUser");
}

export function getLoggedInUser(): LoggedInUser | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("loggedInUser");
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function hasRole(requiredRole: "car_owner" | "garage_owner"): boolean {
  const user = getLoggedInUser();
  return user?.role === requiredRole;
}

export function getUserRole(): "car_owner" | "garage_owner" | null {
  return getLoggedInUser()?.role ?? null;
}

export function logout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("loggedInUser");
}