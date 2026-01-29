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
import { MATCH_DATE_FORMAT } from '@/constants';
import Link from 'next/link';

type Props = {
  matchProviderId?: string;
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
  isFinals?: boolean;
  finalsDescription?: string;
};

export default function CompletedMatchCard({
  matchProviderId,
  startAt,
  homeTeam,
  visitorTeam,
  overtimePeriods = 0,
  isFinals = false,
  finalsDescription = '',
}: Props) {
  const isHomeTeamWinner = useMemo(
    () => parseInt(homeTeam.score) > parseInt(visitorTeam.score),
    [homeTeam, visitorTeam],
  );

  return (
    <Card>
      <CardHeader className="border-b border-b-[rgba(255,255,255,0.05)] mx-5">
        <div className="flex flex-row justify-between items-center">
          <p className="font-barlow-condensed font-semibold text-[15px] text-[rgba(255,255,255,0.9)]">
            Final {overtimePeriods > 0 ? `${overtimePeriods}OT` : ''}
          </p>
          <p className="font-barlow font-medium text-sm text-[rgba(255,255,255,0.8)]">
            {moment(startAt).format(MATCH_DATE_FORMAT)}
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex flex-row justify-between items-center mb-3">
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
                  className="font-special-gothic-condensed-one text-[32px]"
                  style={{
                    color: isHomeTeamWinner
                      ? 'rgba(255, 255, 255, 0.5)'
                      : '#ffffff',
                  }}
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
                  className="font-special-gothic-condensed-one text-[32px]"
                  style={{
                    color: !isHomeTeamWinner
                      ? 'rgba(255, 255, 255, 0.5)'
                      : '#ffffff',
                  }}
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
        <div>
          <Link
            href={`/partidos/${matchProviderId}`}
            className="bg-[rgba(15,15,15,0.19)] border border-[rgba(255,255,255,0.21)] block text-center rounded-[18px] p-[8px]"
            style={{ backdropFilter: 'blur(40px)' }}
          >
            <span className="font-special-gothic-condensed-one text-base text-white">
              Ver resultados
            </span>
          </Link>
        </div>
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
