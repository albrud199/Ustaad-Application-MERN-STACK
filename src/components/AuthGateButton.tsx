"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useCallback } from "react";

/**
 * A wrapper button that checks for authentication before performing an action.
 * Since there's no real auth backend yet, we use localStorage to track login status.
 * When a user is not logged in, clicking this button redirects to `/login`
 * with a `returnTo` query parameter so they can be redirected back after login.
 *
 * Usage:
 *   <AuthGateButton href="/checkout" className="..." returnTo="/parking-details">
 *     Reserve Now
 *   </AuthGateButton>
 */
export default function AuthGateButton({
  href,
  className,
  children,
  returnTo,
}: {
  href?: string;
  className?: string;
  children: ReactNode;
  returnTo?: string;
}) {
  const router = useRouter();

  const handleClick = useCallback(() => {
    // Check if user is logged in via localStorage flag
    const isLoggedIn =
      typeof window !== "undefined" &&
      localStorage.getItem("ustaad_logged_in") === "true";

    if (isLoggedIn) {
      // User is authenticated — proceed to destination
      if (href) router.push(href);
    } else {
      // Not authenticated — redirect to login with returnTo
      const target = returnTo || href || "/";
      router.push(`/login?returnTo=${encodeURIComponent(target)}`);
    }
  }, [href, returnTo, router]);

  return (
    <button type="button" className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
