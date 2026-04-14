'use client';

import { useEffect, useRef } from 'react';

export default function SportRadarLeadersWidget() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = widgetRef.current;
    if (!container) return;

    const script = document.createElement('script');
    script.src = 'https://widget.eui.connect.sportradar.com/widget.js';
    script.dataset.type = 'statistics_leaders';
    script.dataset.websiteId = '312';
    script.dataset.useNativeStyles = 'false';
    script.onload = () => {
      setTimeout(() => {
        const leaders = document.querySelectorAll('.sw-leaders-non-leader-person-name, .sw-leaders-person-photo-link, .sw-leaders-top-person-name');
        leaders.forEach((leader) => {
          const personId = leader.getAttribute('data-sw-person-link-person-id');
          leader.setAttribute('href', `/jugadores/${personId}`);
          (leader as HTMLElement).style.pointerEvents = 'auto !important';
        });
      }, 2500);
    };
    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return <div className="sport-radar-leaders-widget" ref={widgetRef} />;
}
