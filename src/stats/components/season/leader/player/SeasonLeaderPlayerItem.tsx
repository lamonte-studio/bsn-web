import Link from 'next/link';

type Props = {
  player: {
    id: string;
    avatarUrl: string;
    name: string;
    position: string;
    jerseyNumber: string;
  };
  statValue: number;
};

export default function SeasonLeaderPlayerItem({ player, statValue }: Props) {
  return (
    <Link
      href={`/jugadores/${player.id}`}
      className="flex items-center p-2 hover:bg-gray-100"
    >
      <img
        src={player.avatarUrl}
        alt={player.name}
        className="w-10 h-10 rounded-full mr-4"
      />
      <div className="flex-1">
        <div className="font-medium">
          {player.name}{' '}
          <span className="text-sm text-gray-500">
            #{player.jerseyNumber} - {player.position}
          </span>
        </div>
      </div>
      <div className="font-semibold">{statValue}</div>
    </Link>
  );
}
