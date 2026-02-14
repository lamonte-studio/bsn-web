'use client';

import { useEffect } from 'react';

type AdSlotProps = {
  adUnit: string;
  size: [number, number];
  elementId: string;
};

export default function AdSlot({ adUnit, size, elementId }: AdSlotProps) {
  useEffect(() => {
    window.googletag = window.googletag || { cmd: [] };
    window.googletag.cmd.push(() => {
      setTimeout(() => {
        // Define and display the ad slot
        const slot = window.googletag.defineSlot(adUnit, size, elementId)
        if (slot) {
          slot.addService(window.googletag.pubads());
          window.googletag.display(elementId);
        }
      }, 500);
    });

    // Cleanup function: essential for Next.js to prevent memory leaks and stale ads on route changes
    return () => {
      window.googletag.cmd.push(() => {
        window.googletag.destroySlots([elementId]);
      });
    };
  }, [adUnit, size, elementId]);

  return <div id={elementId} style={{ minHeight: size[1] }}></div>;
}
