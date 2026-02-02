import TeamLogoAvatar from '@/team/components/avatar/TeamLogoAvatar';

type Props = {
  homeTeam: {
    code: string;
  };
  visitorTeam: {
    code: string;
  };
  homeTeamBoxScore: Record<string, number>;
  visitorTeamBoxScore: Record<string, number>;
};

const STAT_KEYS = [
  { key: 'points', label: 'PTS' },
  { key: 'rebounds', label: 'REB' },
  { key: 'assists', label: 'AST' },
  { key: 'steals', label: 'STL' },
  { key: 'blocks', label: 'BLK' },
  { key: 'turnovers', label: 'TO' },
];

export default function MatchTeamStatsComparison({
  homeTeam,
  visitorTeam,
  homeTeamBoxScore,
  visitorTeamBoxScore,
}: Props) {
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
            <TeamLogoAvatar teamCode={homeTeam.code} size={40} />
          </div>
          <div className="grow"></div>
          <div className="w-[80px]">
            <TeamLogoAvatar teamCode={visitorTeam.code} size={40} />
          </div>
        </div>
        <div className="divide-y divide-[rgba(0,0,0,0.07)]">
          {STAT_KEYS.map(({ key, label }) => (
            <div
              key={`match-team-stats-comparison-${key}`}
              className="flex flex-row justify-between items-center gap-2 py-2"
            >
              <div className="w-[80px]">
                <p
                  className="text-center text-[19px]"
                  style={{
                    color:
                      homeTeamBoxScore[key] > visitorTeamBoxScore[key]
                        ? '#000000'
                        : 'rgba(0, 0, 0, 0.5)',
                  }}
                >
                  {homeTeamBoxScore[key]}
                </p>
              </div>
              <div className="grow">
                <p className="font-barlow-condensed font-semibold text-center text-[15px] text-[rgba(0,0,0,0.4)]">
                  {label}
                </p>
              </div>
              <div className="w-[80px]">
                <p
                  className="text-center text-[19px]"
                  style={{
                    color:
                      homeTeamBoxScore[key] < visitorTeamBoxScore[key]
                        ? '#000000'
                        : 'rgba(0, 0, 0, 0.5)',
                  }}
                >
                  {visitorTeamBoxScore[key]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
