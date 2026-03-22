'use client';

import { CASTR_LIVE_PLAYER_URL } from '@/constants';

type Props = {
  /** Full Castr player URL (defaults to `CASTR_LIVE_PLAYER_URL`). */
  src?: string;
};

export function CastrLivePlayer({ src = CASTR_LIVE_PLAYER_URL }: Props) {
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
