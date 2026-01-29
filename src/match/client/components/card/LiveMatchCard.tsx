'use client';

import { MATCH_STATUS } from '@/constants';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@/shared/client/components/ui';
import moment from 'moment';
import { useMemo } from 'react';
import Lottie from 'lottie-react';
import MatchCompetitor from '../competitor/MatchCompetitor';

import animationLiveStreamData from './live-stream.json';
import Link from 'next/link';

type Props = {
  matchProviderId?: string;
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
  status: string;
  currentQuarter?: string;
  currentTime?: string;
  mediaProvider?: string;
  overtimePeriods?: number;
  isFinals?: boolean;
  finalsDescription?: string;
};

export default function LiveMatchCard({
  matchProviderId,
  homeTeam,
  visitorTeam,
  status,
  currentQuarter = '',
  currentTime = '0:00',
  mediaProvider = '',
  overtimePeriods = 0,
  isFinals = false,
  finalsDescription = '',
}: Props) {
  const currentPeriodTime = useMemo(() => {
    if (!currentTime) {
      return '00:00';
    }
    return moment(currentTime, 'mm:ss:SS').format('m:ss');
  }, [currentTime]);

  const currentStatusLabel = useMemo(() => {
    let statusLabel = overtimePeriods > 0 ? 'OT' : `Q${currentQuarter}`;
    if (overtimePeriods > 1) {
      statusLabel += `${overtimePeriods}`;
    }
    return statusLabel;
  }, [overtimePeriods, currentQuarter]);

  return (
    <Card>
      <CardHeader className="border-b border-b-[rgba(255,255,255,0.05)] mx-5">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start items-center gap-2">
            <Lottie
              animationData={animationLiveStreamData}
              loop
              autoplay
              style={{ width: '16px', height: '16px' }}
            />
            {![
              MATCH_STATUS.READY,
              MATCH_STATUS.DELAYED,
              MATCH_STATUS.PERIOD_BREAK,
              MATCH_STATUS.INTERRUPTED,
              MATCH_STATUS.RESCHEDULED,
            ].includes(status) && (
              <p className="font-barlow-condensed font-semibold text-[15px] text-[rgba(255,255,255,0.9)]">
                {currentStatusLabel} - {currentPeriodTime}
              </p>
            )}
            {status === MATCH_STATUS.READY && (
              <p className="font-barlow-condensed font-semibold text-[15px] text-[rgba(255,255,255,0.9)]">
                Por comenzar
              </p>
            )}
            {status === MATCH_STATUS.DELAYED && (
              <p className="font-barlow-condensed font-semibold text-[15px] text-[rgba(255,255,255,0.9)]">
                Atrasado
              </p>
            )}
            {status === MATCH_STATUS.PERIOD_BREAK &&
              overtimePeriods === 0 &&
              currentQuarter === '2' && (
                <p className="font-barlow-condensed font-semibold text-[15px] text-[rgba(255,255,255,0.9)]">
                  Mediotiempo
                </p>
              )}
            {status === MATCH_STATUS.PERIOD_BREAK &&
              overtimePeriods === 0 &&
              currentQuarter !== '2' && (
                <p className="font-barlow-condensed font-semibold text-[15px] text-[rgba(255,255,255,0.9)]">
                  Fin de Q{currentQuarter}
                </p>
              )}
            {status === MATCH_STATUS.PERIOD_BREAK && overtimePeriods > 0 && (
              <p className="font-barlow-condensed font-semibold text-[15px] text-[rgba(255,255,255,0.9)]">
                Fin de OT{overtimePeriods > 1 ? overtimePeriods : ''}
              </p>
            )}
            {status === MATCH_STATUS.INTERRUPTED && (
              <p className="font-barlow-condensed font-semibold text-[15px] text-[rgba(255,255,255,0.9)]">
                Interrumpido
              </p>
            )}
            {status === MATCH_STATUS.RESCHEDULED && (
              <p className="font-barlow-condensed font-semibold text-[15px] text-[rgba(255,255,255,0.9)]">
                Reprogramado
              </p>
            )}
          </div>
          <div className="flex flex-row items-center gap-2">
            <img src="/assets/images/icons/icon-tv.png" />
            <p className="font-barlow font-medium text-sm text-[rgba(255,255,255,0.8)]">
              {mediaProvider}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex flex-row justify-between items-center mb-3">
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex flex-row justify-between items-center gap-3">
              <div className="flex-1">
                <MatchCompetitor
                  code={visitorTeam.code}
                  name={visitorTeam.nickname}
                  city={visitorTeam.city}
                  avatarSpaceHorizontal={14}
                />
              </div>
              <div className="flex flex-row items-center gap-2">
                <p className="font-special-gothic-condensed-one text-[32px] text-white">
                  {visitorTeam.score}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center gap-3">
              <div className="flex-1">
                <MatchCompetitor
                  code={homeTeam.code}
                  name={homeTeam.nickname}
                  city={homeTeam.city}
                  avatarSpaceHorizontal={14}
                />
              </div>
              <div className="flex flex-row items-center gap-2">
                <p className="font-special-gothic-condensed-one text-[32px] text-white">
                  {homeTeam.score}
                </p>
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
