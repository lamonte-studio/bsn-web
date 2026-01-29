import React, { useMemo } from 'react';
import moment from 'moment';
import { MATCH_DATE_FORMAT } from '@/constants';
import TeamLogoAvatar from '@/team/components/avatar/TeamLogoAvatar';

type Props = {
  startAt: string;
  homeTeam: {
    code: string;
    score: string;
    color: string;
  };
  visitorTeam: {
    code: string;
    score: string;
    color: string;
  };
  venue: {
    name: string;
  };
  overtimePeriods?: number;
};

export default function CompletedMatchScoreBoard({
  startAt,
  homeTeam,
  visitorTeam,
  venue,
  overtimePeriods = 0,
}: Props) {
  const isHomeTeamWinner = useMemo(() => {
    return parseInt(homeTeam.score, 10) > parseInt(visitorTeam.score, 10);
  }, [homeTeam.score, visitorTeam.score]);

  const isVisitorTeamWinner = useMemo(() => {
    return parseInt(visitorTeam.score, 10) > parseInt(homeTeam.score, 10);
  }, [homeTeam.score, visitorTeam.score]);

  return (
    <div>
      <div className="flex flex-row flex-1 justify-between items-center gap-4">
        <div className="flex flex-row items-center gap-4">
          <a href={`/equipos/${homeTeam.code}`}>
            <div
              className="flex flex-row items-center justify-center border rounded-full  h-[60px] w-[60px]"
              style={{
                borderColor:
                  homeTeam.color != null
                    ? homeTeam.color
                    : 'rgba(255, 255, 255, 0.5)',
              }}
            >
              <TeamLogoAvatar teamCode={homeTeam.code} size={42} />
            </div>
          </a>
          <div className="flex flex-row items-center gap-2">
            <p
              className="font-special-gothic-condensed-one text-6xl text-neutral-60"
              style={{
                color: isHomeTeamWinner ? homeTeam.color : 'inherit',
              }}
            >
              {homeTeam.score}
            </p>
            <img
              src="/assets/images/icons/icon-caret-winner.png"
              height="9"
              width="7"
              style={{
                opacity: isHomeTeamWinner ? 1 : 0,
              }}
            />
          </div>
        </div>
        <div>
          <p className="font-barlow font-semibold text-base">
            Final {overtimePeriods > 0 ? `${overtimePeriods}OT` : ''}
          </p>
        </div>
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-row items-center gap-2">
            <img
              src="/assets/images/icons/icon-caret-winner.png"
              className="rotate-180"
              height="9"
              width="7"
              style={{
                opacity: isVisitorTeamWinner ? 1 : 0,
              }}
            />
            <p
              className="font-special-gothic-condensed-one text-6xl text-neutral-60"
              style={{
                color: isVisitorTeamWinner ? visitorTeam.color : 'inherit',
              }}
            >
              {visitorTeam.score}
            </p>
          </div>
          <a href={`/team/${visitorTeam.code}`}>
            <div
              className="flex flex-row items-center justify-center border rounded-full  h-[60px] w-[60px]"
              style={{
                borderColor:
                  visitorTeam.color != null
                    ? visitorTeam.color
                    : 'rgba(255, 255, 255, 0.5)',
              }}
            >
              <TeamLogoAvatar teamCode={visitorTeam.code} size={42} />
            </div>
          </a>
        </div>
      </div>
      <div className="flex flex-row flex-1 justify-between items-start gap-4">
        <div className="flex flex-row items-center mt-2 w-[60px]">
          <p className="font-special-gothic-condensed-one text-6xl">
            {homeTeam.code}
          </p>
        </div>
        <div className="flex flex-col flex-1 items-center gap-2">
          <div className="w-[80%]">
            <p className="font-barlow text-center text-sm">
              {moment(startAt).format(MATCH_DATE_FORMAT)}
            </p>
          </div>
          <div className="flex flex-row justify-center gap-2 w-[80%]">
            <img
              src="/assets/images/icons/icon-map-pin.png"
              height="11"
              width="9"
            />
            <p className="font-barlow text-sm text-center">{venue.name}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-2 w-[60px]">
          <p className="font-special-gothic-condensed-one text-6xl">
            {visitorTeam.code}
          </p>
        </div>
      </div>
    </div>
  );
}
