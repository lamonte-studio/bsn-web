'use client';

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function AdManager() {
  const pathname = usePathname();
  const servicesEnabled = useRef(false);

  // Enable GPT services once on initial mount
  useEffect(() => {
    window.googletag = window.googletag || { cmd: [] };
    window.googletag.cmd.push(() => {
      if (!servicesEnabled.current) {
        window.googletag.pubads().enableSingleRequest();
        window.googletag.enableServices();
        servicesEnabled.current = true;
      }
    });
  }, []);

  // Destroy and refresh slots on route changes
  useEffect(() => {
    window.googletag = window.googletag || { cmd: [] };
    window.googletag.cmd.push(() => {
      window.googletag.destroySlots();
      window.googletag.pubads().refresh();
    });
  }, [pathname]);

  return null;
}
