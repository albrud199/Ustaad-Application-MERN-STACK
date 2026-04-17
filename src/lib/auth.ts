/**
 * Ustaad Auth Utility
 * Uses the same localStorage key as the login page ("loggedInUser").
 * Supports car_owner, garage_owner, and admin roles.
 */

export type UserRole = "car_owner" | "garage_owner" | "admin";

export interface LoggedInUser {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface StoredAccount extends LoggedInUser {
  password: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
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

export function getStoredAccounts(): StoredAccount[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem("ustaad_accounts");
  if (!stored) return [];

  try {
    return JSON.parse(stored) as StoredAccount[];
  } catch {
    return [];
  }
}

export function saveStoredAccounts(accounts: StoredAccount[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("ustaad_accounts", JSON.stringify(accounts));
}

export function persistLoggedInUser(user: LoggedInUser): void {
  if (typeof window === "undefined") return;

  localStorage.setItem("loggedInUser", JSON.stringify(user));
  localStorage.setItem("ustaad_logged_in", "true");
}

export function hasRole(requiredRole: UserRole): boolean {
  const user = getLoggedInUser();
  return user?.role === requiredRole;
}

export function getUserRole(): UserRole | null {
  return getLoggedInUser()?.role ?? null;
}

export function isAdmin(): boolean {
  return hasRole("admin");
}

export function logout(): void {
  if (typeof window === "undefined") return;

  // Clear localStorage
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("ustaad_logged_in");

  localStorage.removeItem("token");

  // Clear cookies
  document.cookie = "auth_token=; path=/; max-age=0";

  // Redirect to login
  window.location.href = "/login";
}

