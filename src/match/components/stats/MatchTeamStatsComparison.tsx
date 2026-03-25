import TeamLogoAvatar from '@/team/components/avatar/TeamLogoAvatar';
import numeral from 'numeral';

export type MatchTeamComparisonBoxScore = {
  fieldGoalsMade: number;
  fieldGoalsAttempted: number;
  fieldGoalsPercentage: number;
  threePointersMade: number;
  threePointersAttempted: number;
  threePointersPercentage: number;
  freeThrowsMade: number;
  freeThrowsAttempted: number;
  freeThrowsPercentage: number;
  offensiveRebounds: number;
  reboundsTotal: number;
  assists: number;
  turnovers: number;
  steals: number;
  blocks: number;
  foulsPersonal: number;
};

type StatItem = {
  key: string;
  label: string;
  field:
    | keyof MatchTeamComparisonBoxScore
    | [keyof MatchTeamComparisonBoxScore, keyof MatchTeamComparisonBoxScore];
};

type Props = {
  homeTeam: {
    code: string;
  };
  visitorTeam: {
    code: string;
  };
  homeTeamBoxScore: MatchTeamComparisonBoxScore;
  visitorTeamBoxScore: MatchTeamComparisonBoxScore;
};

const STAT_KEYS: StatItem[] = [
  { key: 'FG', label: 'FG', field: ['fieldGoalsMade', 'fieldGoalsAttempted'] },
  { key: 'FG%', label: 'FG%', field: 'fieldGoalsPercentage' },
  { key: '3PT%', label: '3PT%', field: 'threePointersPercentage' },
  { key: '3PT', label: '3PT', field: ['threePointersMade', 'threePointersAttempted'] },
  { key: 'FT', label: 'FT', field: ['freeThrowsMade', 'freeThrowsAttempted'] },
  { key: 'FT%', label: 'FT%', field: 'freeThrowsPercentage' },
  { key: 'REB', label: 'REB', field: 'reboundsTotal' },
  { key: 'OREB', label: 'OREB', field: 'offensiveRebounds' },
  { key: 'AST', label: 'AST', field: 'assists' },
  { key: 'STL', label: 'STL', field: 'steals' },
  { key: 'BLK', label: 'BLK', field: 'blocks' },
  { key: 'TO', label: 'TO', field: 'turnovers' },
  { key: 'PF', label: 'PF', field: 'foulsPersonal' },
];

const PERCENTAGE_STATS = new Set(['FG%', '3PT%', 'FT%']);

/**
 * Synergy / GraphQL often returns shooting % as 0–100 (e.g. 45.5).
 * Numeral's `0.0%` format expects a 0–1 fraction and multiplies by 100, so
 * passing 45.5 would render as ~4550%. Normalize to decimal before formatting.
 */
function shootingPercentToDecimal(value: number): number {
  if (value == null || Number.isNaN(value)) return 0;
  return value > 1 ? value / 100 : value;
}

export default function MatchTeamStatsComparison({
  homeTeam,
  visitorTeam,
  homeTeamBoxScore,
  visitorTeamBoxScore,
}: Props) {
  const getStatValue = (
    boxScore: MatchTeamComparisonBoxScore,
    stat: StatItem,
  ): number | string => {
    if (Array.isArray(stat.field)) {
      return `${boxScore[stat.field[0]]}/${boxScore[stat.field[1]]}`;
    }
    if (PERCENTAGE_STATS.has(stat.key)) {
      const raw = boxScore[stat.field];
      return numeral(shootingPercentToDecimal(raw)).format('0.0%');
    }
    return boxScore[stat.field];
  };

  const getStatNumericValue = (
    boxScore: MatchTeamComparisonBoxScore,
    stat: StatItem,
  ): number => {
    if (Array.isArray(stat.field)) {
      return boxScore[stat.field[0]];
    }
    if (PERCENTAGE_STATS.has(stat.key)) {
      return shootingPercentToDecimal(boxScore[stat.field]);
    }
    return boxScore[stat.field];
  };

  return (
    <div className="border border-[#EAEAEA] flex-1 rounded-[12px] bg-white shadow-[0px_1px_3px_0px_#14181F0A]">
      <div className="px-[30px] pt-[24px] flex flex-row justify-between items-center">
        <div>
          <h3 className="text-[22px] text-black md:text-[24px]">
            Comparación de equipos
          </h3>
        </div>
      </div>
      <div className="px-[30px] py-[24px]">
        <div className="flex flex-row justify-between items-center gap-2 py-3">
          <div className="w-[80px]">
            <TeamLogoAvatar teamCode={visitorTeam.code} size={40} />
          </div>
          <div className="grow"></div>
          <div className="w-[80px]">
            <TeamLogoAvatar teamCode={homeTeam.code} size={40} />
          </div>
        </div>
        <div className="divide-y divide-[rgba(0,0,0,0.07)]">
          {STAT_KEYS.map((stat) => (
            <div
              key={`match-team-stats-comparison-${stat.key}`}
              className="flex flex-row justify-between items-center gap-2 py-2"
            >
              <div className="w-[80px]">
                <p
                  className="text-center text-[19px]"
                  style={{
                    color:
                      getStatNumericValue(homeTeamBoxScore, stat) <
                      getStatNumericValue(visitorTeamBoxScore, stat)
                        ? '#000000'
                        : 'rgba(0, 0, 0, 0.5)',
                  }}
                >
                  {getStatValue(visitorTeamBoxScore, stat)}
                </p>
              </div>
              <div className="grow">
                <p className="font-barlow-condensed font-semibold text-center text-[15px] text-[rgba(0,0,0,0.4)]">
                  {stat.label}
                </p>
              </div>
              <div className="w-[80px]">
                <p
                  className="text-center text-[19px]"
                  style={{
                    color:
                      getStatNumericValue(homeTeamBoxScore, stat) >
                      getStatNumericValue(visitorTeamBoxScore, stat)
                        ? '#000000'
                        : 'rgba(0, 0, 0, 0.5)',
                  }}
                >
                  {getStatValue(homeTeamBoxScore, stat)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
