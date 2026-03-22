'use client';

import { MatchLiveStreamVideo } from './MatchLiveStreamVideo';

/** Castr embed — hardcoded (overrides GraphQL `streamUrl` for live games). */
const CASTR_LIVE_PLAYER_URL =
  'https://player.castr.com/live_2b3583f0256811f1b803d7b743b93ee0';

type Props = {
  /** From GraphQL `streamUrl` — ignored while {@link CASTR_LIVE_PLAYER_URL} is hardcoded. */
  streamUrl?: string | null;
};

function isLikelyHlsUrl(url: string): boolean {
  const u = url.trim().toLowerCase();
  return u.includes('.m3u8') || u.includes('application/x-mpegurl');
}

/**
 * Renders the live stream: HLS via hls.js, or iframe for player pages.
 */
export function LiveMatchStream({ streamUrl: _streamUrl }: Props) {
  const src = CASTR_LIVE_PLAYER_URL;

  if (!src) {
    return (
      <div className="relative w-full aspect-video bg-black rounded-[8px] overflow-hidden flex items-center justify-center text-center px-4 text-[rgba(255,255,255,0.5)] text-sm md:text-base">
        Transmisión no disponible.
      </div>
    );
  }

  if (isLikelyHlsUrl(src)) {
    return <MatchLiveStreamVideo src={src} />;
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-[8px] overflow-hidden">
      <iframe
        title="Transmisión en vivo"
        src={src}
        className="absolute inset-0 h-full w-full border-0"
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
