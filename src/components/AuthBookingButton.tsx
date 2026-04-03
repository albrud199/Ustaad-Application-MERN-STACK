"use client";

import { useRouter, usePathname } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";

interface AuthBookingButtonProps {
  label?: string;
  icon?: string;
  className?: string;
  bookingPath?: string; // where to go after login / when logged in
}

/**
 * A button that checks auth before allowing booking.
 * - Logged in  → navigates to bookingPath (or checkout)
 * - Logged out → redirects to /login?returnUrl=currentPath
 */
export default function AuthBookingButton({
  label = "Book Spot",
  icon = "rocket_launch",
  className = "",
  bookingPath,
}: AuthBookingButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (isLoggedIn()) {
      // Already authenticated — go to booking destination or checkout
      router.push(bookingPath ?? "/checkout");
    } else {
      // Not logged in — send to login with return URL
      router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={className}
    >
      {label}
      {icon && (
        <span className="material-symbols-outlined text-sm ml-1 align-middle">{icon}</span>
      )}
    </button>
  );
}
