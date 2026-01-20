import PlayerPhotoAvatar from '@/player/components/avatar/PlayerPhotoAvatar';
import Link from 'next/link';

type Props = {
  position: number;
  player: {
    id: string;
    avatarUrl: string;
    name: string;
    team?: {
      code: string;
      name: string;
    };
  };
  statValue: number;
};

export default function SeasonLeaderPlayerItem({
  position = 1,
  player,
  statValue,
}: Props) {
  return (
    <Link
      href={`/jugadores/${player.id}`}
      className="flex items-center p-2 gap-3 hover:bg-gray-100"
    >
      <div className="w-4 text-right">
        <span className="font-barlow text-base">{position}</span>
      </div>
      <div className="flex flex-1 flex-row items-center gap-3">
        <PlayerPhotoAvatar photoUrl={player.avatarUrl} size={45} name={player.name} />
        <div className="flex-1">
          <p className="font-special-gothic-condensed-one text-base/4">
            {player.name}
          </p>
          <p className="font-barlow text-xs text-gray-500">
            {player.team?.name}
          </p>
        </div>
      </div>
      <div className="font-special-gothic-condensed-one text-3xl">
        {statValue}
      </div>
    </Link>
  );
}
