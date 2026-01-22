'use client';

import { useMemo } from 'react';
import moment from 'moment';
import cx from 'classnames';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@/shared/client/components/ui';
import MatchCompetitor from '../competitor/MatchCompetitor';
import MatchVideoCover from '../media/MatchVideoCover';
import { MATCH_DATE_FORMAT } from '@/constants';

type Props = {
  startAt: string;
  homeTeam: {
    code: string;
    nickname: string;
    city: string;
    score: string;
    competitionStandings?: {
      won: number;
      lost: number;
    };
  };
  visitorTeam: {
    code: string;
    nickname: string;
    city: string;
    score: string;
    competitionStandings?: {
      won: number;
      lost: number;
    };
  };
  overtimePeriods?: number;
  youtubeId?: string;
  isFinals?: boolean;
  finalsDescription?: string;
};

export default function CompletedMatchCard({
  startAt,
  homeTeam,
  visitorTeam,
  overtimePeriods = 0,
  youtubeId,
  isFinals = false,
  finalsDescription = '',
}: Props) {
  const isHomeTeamWinner = useMemo(
    () => parseInt(homeTeam.score) > parseInt(visitorTeam.score),
    [homeTeam, visitorTeam],
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <p className="font-barlow text-base">
            Final {overtimePeriods > 0 ? `${overtimePeriods}OT` : ''}
          </p>
          <p className="font-barlow text-base text-neutral-80">
            {moment(startAt).format(MATCH_DATE_FORMAT)}
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-row justify-between items-center gap-3">
              <div className="flex-1">
                <MatchCompetitor
                  code={visitorTeam.code}
                  name={visitorTeam.nickname}
                  city={visitorTeam.city}
                  disabled={isHomeTeamWinner}
                />
              </div>
              <div
                className={cx('flex flex-row items-center gap-2', {
                  'pr-[12px]': isHomeTeamWinner,
                })}
              >
                <p
                  className={cx('font-special-gothic-condensed-one text-4xl', {
                    'text-neutral-50': isHomeTeamWinner,
                  })}
                >
                  {visitorTeam.score}
                </p>
                {!isHomeTeamWinner && (
                  <img
                    src="/assets/images/icons/icon-caret-winner.png"
                    style={{ width: 7, height: 9 }}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-row justify-between items-center gap-3">
              <div className="flex-1">
                <MatchCompetitor
                  code={homeTeam.code}
                  name={homeTeam.nickname}
                  city={homeTeam.city}
                  disabled={!isHomeTeamWinner}
                />
              </div>
              <div
                className={cx('flex flex-row items-center gap-2', {
                  'pr-[12px]': !isHomeTeamWinner,
                })}
              >
                <p
                  className={cx('font-special-gothic-condensed-one text-4xl', {
                    'text-neutral-50': !isHomeTeamWinner,
                  })}
                >
                  {homeTeam.score}
                </p>
                {isHomeTeamWinner && (
                  <img
                    src="/assets/images/icons/icon-caret-winner.png"
                    style={{ width: 7, height: 9 }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {youtubeId && (
          <div className="mb-2 mt-4">
            <MatchVideoCover
              coverUrl={`https://img.youtube.com/vi/${youtubeId}/0.jpg`}
            />
          </div>
        )}
      </CardBody>
      {isFinals && (
        <CardFooter>
          <div className="flex flex-row justify-center items-center">
            <p className="font-barlow text-sm text-neutral-90">
              {finalsDescription}
            </p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
