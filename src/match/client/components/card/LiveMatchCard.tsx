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

type Props = {
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
      <CardHeader>
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
              <p className="font-barlow font-semibold text-sm">
                {currentStatusLabel} - {currentPeriodTime}
              </p>
            )}
            {status === MATCH_STATUS.READY && (
              <p className="font-barlow font-semibold text-sm">Por comenzar</p>
            )}
            {status === MATCH_STATUS.DELAYED && (
              <p className="font-barlow font-semibold text-sm">Atrasado</p>
            )}
            {status === MATCH_STATUS.PERIOD_BREAK &&
              overtimePeriods === 0 &&
              currentQuarter === '2' && (
                <p className="font-barlow font-semibold text-sm">Mediotiempo</p>
              )}
            {status === MATCH_STATUS.PERIOD_BREAK &&
              overtimePeriods === 0 &&
              currentQuarter !== '2' && (
                <p className="font-barlow font-semibold text-sm">
                  Fin de Q{currentQuarter}
                </p>
              )}
            {status === MATCH_STATUS.PERIOD_BREAK && overtimePeriods > 0 && (
              <p className="font-barlow font-semibold text-sm">
                Fin de OT{overtimePeriods > 1 ? overtimePeriods : ''}
              </p>
            )}
            {status === MATCH_STATUS.INTERRUPTED && (
              <p className="font-barlow font-semibold text-sm">Interrumpido</p>
            )}
            {status === MATCH_STATUS.RESCHEDULED && (
              <p className="font-barlow font-semibold text-sm">Reprogramado</p>
            )}
          </div>
          <div className="flex flex-row items-center gap-2">
            <img src="/assets/images/icons/icon-tv.png" />
            <p className="font-barlow text-xs text-neutral-50">
              {mediaProvider}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col flex-1 gap-4">
            <div className="flex flex-row justify-between items-center gap-4">
              <div className="flex-1">
                <MatchCompetitor
                  code={visitorTeam.code}
                  name={visitorTeam.nickname}
                  city={visitorTeam.city}
                  avatarSpaceHorizontal={14}
                />
              </div>
              <div className="flex flex-row items-center gap-2">
                <p className="font-special-gothic-condensed-one text-4xl">
                  {visitorTeam.score}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center gap-4">
              <div className="flex-1">
                <MatchCompetitor
                  code={homeTeam.code}
                  name={homeTeam.nickname}
                  city={homeTeam.city}
                  avatarSpaceHorizontal={14}
                />
              </div>
              <div className="flex flex-row items-center gap-2">
                <p className="font-special-gothic-condensed-one text-4xl">
                  {homeTeam.score}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 pb-3">
          <div className="bg-[rgba(54,54,54,0.19)] border border-[rgba(85,85,85,0.7)] flex flex-row justify-center items-center gap-2 px-6 py-3 rounded-lg w-full">
            <img src="/assets/images/icons/icon-view-livestream.png" />
            <p className="font-special-gothic-condensed-one text-base">
              Ver en vivo
            </p>
          </div>
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
