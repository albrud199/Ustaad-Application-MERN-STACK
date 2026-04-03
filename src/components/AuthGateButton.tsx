'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

interface AuthGateButtonProps {
  href: string;
  returnTo: string;
  className?: string;
  children: React.ReactNode;
}

export default function AuthGateButton({ href, returnTo, className, children }: AuthGateButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("ustaad_logged_in") === "true";
    
    console.log("AuthGateButton clicked - Auth status:", isLoggedIn);
    
    if (isLoggedIn) {
      // Allow proceeding to the destination
      console.log("User authenticated, navigating to:", href);
      router.push(href);
    } else {
      // Redirect to login with return query param
      const loginUrl = `/login?returnTo=${encodeURIComponent(returnTo)}`;
      console.log("User not authenticated, redirecting to:", loginUrl);
      router.push(loginUrl);
    }
    
    // Reset loading state after navigation
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <button 
      type="button" 
      onClick={handleClick} 
      className={className}
      disabled={isLoading}
    >
      {children}
    </button>
  );
}
