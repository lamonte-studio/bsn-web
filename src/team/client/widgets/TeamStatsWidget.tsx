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
  { label: 'TO', key: 'turnoversAverage' },
  { label: 'STL', key: 'stealsAverage' },
  { label: 'BLK', key: 'blocksAverage' },
  { label: 'PF', key: 'foulsPersonalAverage' },
];

export default function TeamStatsWidget({ teamCode }: Props) {
  const { data, loading } = useTeamStats(teamCode);

  if (loading) {
    return <div>Cargando...</div>;
  }

  const standings = data?.competitionStandings;

  const renderTable = (values: Record<string, number> | 'zeros') => (
    <table className="w-full text-left">
      <thead>
        <tr>
          <th className="border-b border-b-[rgba(0,0,0,0.1)] py-3 pr-3">
            <span className="font-special-gothic-condensed-one text-[13px] tracking-[0.52px] text-[rgba(0,0,0,0.6)] uppercase">
              EQUIPO
            </span>
          </th>
          {STATS_HEADER.map((item) => (
            <th
              key={`header-${item.key}`}
              className="border-b border-b-[rgba(0,0,0,0.1)] py-3 px-2 text-center whitespace-nowrap w-[1%]"
            >
              <span className="font-special-gothic-condensed-one text-[13px] tracking-[1.17px] text-[rgba(0,0,0,0.6)] uppercase">
                {item.label}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="py-3 pr-3">
            <div className="flex flex-row items-center gap-2">
              <TeamLogoAvatar teamCode={data?.code ?? ''} size={20} />
              <span className="font-special-gothic-condensed-one text-[16px] leading-[1.4] tracking-[0.32px] text-black">
                {data?.name ?? ''}
              </span>
            </div>
          </td>
          {STATS_HEADER.map((item) => {
            const value =
              values === 'zeros'
                ? 0
                : (values[item.key] ?? standings?.[item.key as keyof typeof standings] ?? 0);
            const isPct = ['FG%', '3P%', 'FT%'].includes(item.label);
            return (
              <td key={`value-${item.key}`} className="py-3 px-2 text-center">
                <span className="font-barlow text-[13px] text-black">
                  {isPct ? numeral(Number(value)).format('0%') : value}
                </span>
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );

  return (
    <div className="space-y-10 md:space-y-12 lg:space-y-15">
      <div className="overflow-x-auto">{renderTable(standings ?? {})}</div>

      <div>
        <h2 className="font-special-gothic-condensed-one text-[24px] leading-none text-black tracking-[0.24px] mb-6 md:mb-8">
          Totales - Temporada 2026
        </h2>
        <div className="overflow-x-auto">{renderTable('zeros')}</div>
      </div>
    </div>
  );
}
