import ShimmerLine from '@/shared/client/components/ui/ShimmerLine';
import { useMatchTeamPlayersBoxscore } from '../hooks/matches';

type Props = {
  matchProviderId: string;
  teamProviderId: string;
  usePolling?: boolean;
};

const BOXSCORE_HEADER = [
  'MIN',
  'PTS',
  'REB',
  'AST',
  'FG',
  '3PT',
  'FT',
  'PF',
  'STL',
  'BLK',
  'TOV',
  '+/-',
];

export default function MatchTeamBoxScoreWidget({
  matchProviderId,
  teamProviderId,
  usePolling = false,
}: Props) {
  const { data, loading } = useMatchTeamPlayersBoxscore(
    matchProviderId,
    teamProviderId,
    usePolling
  );

  if (loading) {
    return (
      <div className="space-y-1">
        <ShimmerLine height="40px" />
        <ShimmerLine height="40px" />
        <ShimmerLine height="40px" />
        <ShimmerLine height="40px" />
        <ShimmerLine height="40px" />
        <ShimmerLine height="40px" />
      </div>
    );
  }

  return (
    <div>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border-b border-b-[rgba(0,0,0,0.07)] px-3 py-2 whitespace-nowrap w-[1%]">
              <span className="text-[13px] text-[rgba(0,0,0,0.6)]">#</span>
            </th>
            <th className="border-b border-b-[rgba(0,0,0,0.07)] px-3 py-2">
              <span className="text-[13px] text-[rgba(0,0,0,0.6)]">
                JUGADOR
              </span>
            </th>
            {BOXSCORE_HEADER.map((header) => (
              <th
                key={header}
                className="border-b border-b-[rgba(0,0,0,0.07)] px-3 py-2 text-center whitespace-nowrap w-[1%]"
              >
                <span className="text-[13px] text-[rgba(0,0,0,0.6)]">
                  {header}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.player.providerId}>
              <td
                className="px-3 py-2"
                style={{
                  backgroundColor:
                    index % 2 == 0 ? 'transparent' : 'rgba(247, 247, 247, 0.7)',
                  borderTopLeftRadius: '8px',
                  borderBottomLeftRadius: '8px',
                }}
              >
                <span className="font-barlow text-[13px]">
                  {item.player.shirtNumber}
                </span>
              </td>
              <td
                className="px-3 py-2"
                style={{
                  backgroundColor:
                    index % 2 == 0 ? 'transparent' : 'rgba(247, 247, 247, 0.7)',
                }}
              >
                <span className="text-base">{item.player.name}</span>
                <span className="font-barlow text-[13px] text-[rgba(0,0,0,0.7)] ml-2">
                  {item.player.playingPosition}
                </span>
              </td>
              <td
                className="px-3 py-2 text-center"
                style={{
                  backgroundColor:
                    index % 2 == 0 ? 'transparent' : 'rgba(247, 247, 247, 0.7)',
                }}
              >
                <span className="font-barlow text-[13px]">{item.boxscore.minutes}</span>
              </td>
              <td
                className="px-3 py-2 text-center"
                style={{
                  backgroundColor:
                    index % 2 == 0 ? 'transparent' : 'rgba(247, 247, 247, 0.7)',
                }}
              >
                <span className="font-barlow text-[13px]">{item.boxscore.points}</span>
              </td>
              <td
                className="px-3 py-2 text-center"
                style={{
                  backgroundColor:
                    index % 2 == 0 ? 'transparent' : 'rgba(247, 247, 247, 0.7)',
                }}
              >
                <span className="font-barlow text-[13px]">{item.boxscore.reboundsTotal}</span>
              </td>
              <td
                className="px-3 py-2 text-center"
                style={{
                  backgroundColor:
                    index % 2 == 0 ? 'transparent' : 'rgba(247, 247, 247, 0.7)',
                }}
              >
                <span className="font-barlow text-[13px]">{item.boxscore.assists}</span>
              </td>
              <td
                className="px-3 py-2 text-center"
                style={{
                  backgroundColor:
                    index % 2 == 0 ? 'transparent' : 'rgba(247, 247, 247, 0.7)',
                }}
              >
                <span className="font-barlow text-[13px]">
                  {item.boxscore.fieldGoalsMade}/{item.boxscore.fieldGoalsAttempted}
                </span>
              </td>
              <td
                className="px-3 py-2 text-center"
                style={{
                  backgroundColor:
                    index % 2 == 0 ? 'transparent' : 'rgba(247, 247, 247, 0.7)',
                }}
              >
                <span className="font-barlow text-[13px]">
                  {item.boxscore.threePointersMade}/{item.boxscore.threePointersAttempted}
                </span>
              </td>
              <td
                className="px-3 py-2 text-center"
                style={{
                  backgroundColor:
                    index % 2 == 0 ? 'transparent' : 'rgba(247, 247, 247, 0.7)',
                }}
              >
                <span className="font-barlow text-[13px]">
                  {item.boxscore.freeThrowsMade}/{item.boxscore.freeThrowsAttempted}
                </span>
              </td>
              <td
                className="px-3 py-2 text-center"
                style={{
                  backgroundColor:
                    index % 2 == 0 ? 'transparent' : 'rgba(247, 247, 247, 0.7)',
                }}
              >
                <span className="font-barlow text-[13px]">
                  {item.boxscore.foulsPersonal}
                </span>
              </td>
              <td
                className="px-3 py-2 text-center"
                style={{
                  backgroundColor:
                    index % 2 == 0 ? 'transparent' : 'rgba(247, 247, 247, 0.7)',
                }}
              >
                <span className="font-barlow text-[13px]">{item.boxscore.steals}</span>
              </td>
              <td
                className="px-3 py-2 text-center"
                style={{
                  backgroundColor:
                    index % 2 == 0 ? 'transparent' : 'rgba(247, 247, 247, 0.7)',
                }}
              >
                <span className="font-barlow text-[13px]">{item.boxscore.blocks}</span>
              </td>
              <td
                className="px-3 py-2 text-center"
                style={{
                  backgroundColor:
                    index % 2 == 0 ? 'transparent' : 'rgba(247, 247, 247, 0.7)',
                }}
              >
                <span className="font-barlow text-[13px]">
                  {item.boxscore.turnovers}
                </span>
              </td>
              <td
                className="px-3 py-2 text-center"
                style={{
                  backgroundColor:
                    index % 2 == 0 ? 'transparent' : 'rgba(247, 247, 247, 0.7)',
                  borderTopRightRadius: '8px',
                  borderBottomRightRadius: '8px',
                }}
              >
                <span className="font-barlow text-[13px]">
                  {item.boxscore.plusMinusPoints}
                </span>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                className="px-3 py-2 text-center"
                colSpan={BOXSCORE_HEADER.length + 2}
              >
                No hay datos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
