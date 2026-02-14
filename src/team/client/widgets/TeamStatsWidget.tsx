import numeral from 'numeral';
import TeamLogoAvatar from '@/team/components/avatar/TeamLogoAvatar';

type Props = {
  teamCode: string;
};

const STATS_HEADER: Record<string, string>[] = [
  { label: 'PTS', key: 'points' },
  { label: 'FGM', key: 'fieldGoalsMade' },
  { label: 'FGA', key: 'fieldGoalsAttempted' },
  { label: 'FG%', key: 'fieldGoalPercentage' },
  { label: '3PM', key: 'threePointersMade' },
  { label: '3PA', key: 'threePointersAttempted' },
  { label: '3P%', key: 'threePointPercentage' },
  { label: 'FTM', key: 'freeThrowsMade' },
  { label: 'FTA', key: 'freeThrowsAttempted' },
  { label: 'FT%', key: 'freeThrowPercentage' },
  { label: 'OREB', key: 'offensiveRebounds' },
  { label: 'DREB', key: 'defensiveRebounds' },
  { label: 'REB', key: 'totalRebounds' },
  { label: 'AST', key: 'assists' },
  { label: 'TOV', key: 'turnovers' },
  { label: 'STL', key: 'steals' },
  { label: 'BLK', key: 'blocks' },
  { label: 'PF', key: 'personalFouls' },
];

type TeamStats = {
  team: {
    code: string;
    name: string;
  };
  stats: {
    points: number;
    fieldGoalsMade: number;
    fieldGoalsAttempted: number;
    fieldGoalPercentage: number;
    threePointersMade: number;
    threePointersAttempted: number;
    threePointPercentage: number;
    freeThrowsMade: number;
    freeThrowsAttempted: number;
    freeThrowPercentage: number;
    offensiveRebounds: number;
    defensiveRebounds: number;
    totalRebounds: number;
    assists: number;
    turnovers: number;
    steals: number;
    blocks: number;
    personalFouls: number;
  }
};

export default function TeamStatsWidget({ teamCode }: Props) {
  const data: TeamStats = {
    team: {
      code: 'CAG',
      name: 'Criollos de Caguas',
    },
    stats: {
      points: 102.5,
      fieldGoalsMade: 38.2,
      fieldGoalsAttempted: 85.6,
      fieldGoalPercentage: 44.7,
      threePointersMade: 10.5,
      threePointersAttempted: 28.3,
      threePointPercentage: 37.1,
      freeThrowsMade: 15.6,
      freeThrowsAttempted: 20.4,
      freeThrowPercentage: 76.5,
      offensiveRebounds: 10.2,
      defensiveRebounds: 35.4,
      totalRebounds: 45.6,
      assists: 25.3,
      turnovers: 12.8,
      steals: 8.5,
      blocks: 5.2,
      personalFouls: 18.7,
    }
  };
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
                <TeamLogoAvatar teamCode={data.team.code} size={30} />
                <span className="text-base">{data.team.name}</span>
              </div>
            </td>
            {STATS_HEADER.map((item) => (
              <td key={`value-${item.key}`} className="px-3 py-2 text-center">
                <span className="font-barlow text-[13px]">
                  {['FG%', '3PT%', 'FT%'].includes(item.label)
                    ? numeral(data.stats[item.key]).format('0.0%')
                    : data.stats[item.key]}
                </span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
