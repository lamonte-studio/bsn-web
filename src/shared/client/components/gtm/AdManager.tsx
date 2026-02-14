'use client';

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AdManager() {
  const pathname = usePathname();

  useEffect(() => {
    // Destroy slots when route changes
    window.googletag = window.googletag || { cmd: [] };
    window.googletag.cmd.push(() => {
      window.googletag.destroySlots();
      window.googletag.pubads().refresh(); // Refresh ads to load new ones for the new route
    });
  }, [pathname]); // Triggers on navigation

  return null;
}
