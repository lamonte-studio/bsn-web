'use client';

import { useEffect } from 'react';

type AdSlotProps = {
  adUnit: string;
  size: [number, number];
  elementId: string;
};

export default function AdSlot({ adUnit, size, elementId }: AdSlotProps) {
  useEffect(() => {
    const { googletag } = window;
    if (googletag) {
      googletag.cmd.push(() => {
        // Define and display the ad slot
        googletag.defineSlot(adUnit, size, elementId)
          .addService(googletag.pubads());
        googletag.display(elementId);
      });
    }

    // Cleanup function: essential for Next.js to prevent memory leaks and stale ads on route changes
    return () => {
      if (googletag) {
        googletag.cmd.push(() => {
          googletag.destroySlots([/* Pass the specific slot, if needed, or destroy all */]);
        });
      }
    };
  }, [adUnit, size, elementId]);

  return <div id={elementId} style={{ minHeight: size[1] }}></div>;
}
