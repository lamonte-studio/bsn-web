import TeamLogoAvatar from '@/team/components/avatar/TeamLogoAvatar';
import { useMemo } from 'react';

export type PeriodScoreProps = {
  periodNumber: number;
  periodType: string;
  homeTeam: {
    score: number;
  };
  visitorTeam: {
    score: number;
  };
};

export type Props = {
  homeTeam: {
    code: string;
    nickname: string;
    competitionStandings: {
      won: number;
      lost: number;
    };
  };
  visitorTeam: {
    code: string;
    nickname: string;
    competitionStandings: {
      won: number;
      lost: number;
    };
  };
  quarters: PeriodScoreProps[];
};

export default function MatchQuarterScoreBoard({
  homeTeam,
  visitorTeam,
  quarters = [],
}: Props) {
  const homeTeamTotalScore = useMemo(() => {
    return quarters.reduce(
      (total, quarter) => total + quarter.homeTeam.score,
      0,
    );
  }, [quarters]);

  const visitorTeamTotalScore = useMemo(() => {
    return quarters.reduce(
      (total, quarter) => total + quarter.visitorTeam.score,
      0,
    );
  }, [quarters]);

  return (
    <div className="flex flex-row gap-6">
      <div className="flex flex-col items-start pt-10 gap-2">
        <div className="flex flex-row items-center gap-2">
          <TeamLogoAvatar teamCode={homeTeam.code} size={16} />
          <div className="flex flex-row items-center gap-2">
            <p className="font-special-gothic-condensed-one text-base">
              {homeTeam.nickname}
            </p>
            <p className="font-barlow text-xs">
              {homeTeam.competitionStandings?.won ?? 0}-
              {homeTeam.competitionStandings?.lost ?? 0}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <TeamLogoAvatar teamCode={visitorTeam.code} size={16} />
          <div className="flex flex-row items-center gap-2">
            <p className="font-special-gothic-condensed-one text-base">
              {visitorTeam.nickname}
            </p>
            <p className="font-barlow text-xs">
              {visitorTeam.competitionStandings?.won ?? 0}-
              {visitorTeam.competitionStandings?.lost ?? 0}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end flex-1">
        {quarters.map((quarter) => (
          <div
            key={`${quarter.periodType}-${quarter.periodNumber}`}
            className="flex flex-col gap-3 items-center w-[26px]"
          >
            <div>
              <p className="font-special-gothic-condensed-one text-sm">
                {quarter.periodType === 'OVERTIME'
                  ? `OT${quarter.periodNumber > 1 ? `${quarter.periodNumber}` : ''}`
                  : `Q${quarter.periodNumber}`}
              </p>
            </div>
            <div>
              <p className="font-barlow text-sm">{quarter.homeTeam.score}</p>
            </div>
            <div>
              <p className="font-barlow text-sm">{quarter.visitorTeam.score}</p>
            </div>
          </div>
        ))}
        <div className="flex flex-col gap-3 items-end w-[36px]">
          <div>
            <p className="font-special-gothic-condensed-one text-sm">FINAL</p>
          </div>
          <div>
            <p
              className="font-barlow text-sm"
              style={{
                color:
                  homeTeamTotalScore > visitorTeamTotalScore
                    ? 'inherit'
                    : '#cecece',
              }}
            >
              {homeTeamTotalScore}
            </p>
          </div>
          <div>
            <p
              className="font-barlow text-sm"
              style={{
                color:
                  visitorTeamTotalScore > homeTeamTotalScore
                    ? 'inherit'
                    : '#cecece',
              }}
            >
              {visitorTeamTotalScore}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
