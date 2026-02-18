'use client';

import numeral from 'numeral';
import TeamLogoAvatar from '@/team/components/avatar/TeamLogoAvatar';
import { useTeamStats } from '../hooks/teams';

type Props = {
  teamCode: string;
};

const STATS_HEADER: Record<string, string>[] = [
  { label: 'PTS', key: 'pointsAverage' },
  { label: 'FGM', key: 'fieldGoalsMadeAverage' },
  { label: 'FGA', key: 'fieldGoalsAttemptedAverage' },
  { label: 'FG%', key: 'fieldGoalsPercentage' },
  { label: '3PM', key: 'threePointersMadeAverage' },
  { label: '3PA', key: 'threePointersAttemptedAverage' },
  { label: '3P%', key: 'threePointersPercentage' },
  { label: 'FTM', key: 'freeThrowsMadeAverage' },
  { label: 'FTA', key: 'freeThrowsAttemptedAverage' },
  { label: 'FT%', key: 'freeThrowsPercentage' },
  { label: 'OREB', key: 'offensiveReboundsAverage' },
  { label: 'DREB', key: 'defensiveReboundsAverage' },
  { label: 'REB', key: 'reboundsTotalAverage' },
  { label: 'AST', key: 'assistsAverage' },
  { label: 'TOV', key: 'turnoversAverage' },
  { label: 'STL', key: 'stealsAverage' },
  { label: 'BLK', key: 'blocksAverage' },
  { label: 'PF', key: 'foulsPersonalAverage' },
];

export default function TeamStatsWidget({ teamCode }: Props) {
  const { data, loading } = useTeamStats(teamCode);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border-b border-b-[rgba(0,0,0,0.07)] px-3 py-2">
              <span className="text-[13px] text-[rgba(0,0,0,0.6)]">EQUIPO</span>
            </th>
            {STATS_HEADER.map((item) => (
              <th
                key={`header-${item.key}`}
                className="border-b border-b-[rgba(0,0,0,0.07)] px-3 py-2 text-center whitespace-nowrap w-[1%]"
              >
                <span className="text-[13px] text-[rgba(0,0,0,0.6)]">
                  {item.label}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-3 py-2">
              <div className="flex flex-row items-center gap-3">
                <TeamLogoAvatar teamCode={data?.code ?? ''} size={30} />
                <span className="text-base">{data?.name ?? ''}</span>
              </div>
            </td>
            {STATS_HEADER.map((item) => (
              <td key={`value-${item.key}`} className="px-3 py-2 text-center">
                <span className="font-barlow text-[13px]">
                  {['FG%', '3P%', 'FT%'].includes(item.label)
                    ? numeral(
                        data?.competitionStandings?.[
                          item.key as keyof typeof data.competitionStandings
                        ] ?? 0,
                      ).format('0.0%')
                    : (data?.competitionStandings?.[
                        item.key as keyof typeof data.competitionStandings
                      ] ?? 0)}
                </span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
