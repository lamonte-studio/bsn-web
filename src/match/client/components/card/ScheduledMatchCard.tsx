'use client';

import { useMemo } from 'react';
import moment from 'moment';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@/shared/client/components/ui';
import { MATCH_DATE_FORMAT, MATCH_TIME_FORMAT } from '@/constants';
import MatchCompetitor from '../competitor/MatchCompetitor';

type Props = {
  startAt: string;
  homeTeam: {
    code: string;
    nickname: string;
    competitionStandings?: {
      won: number;
      lost: number;
    };
    city: string;
  };
  visitorTeam: {
    code: string;
    nickname: string;
    competitionStandings?: {
      won: number;
      lost: number;
    };
    city: string;
  };
  ticketUrl?: string;
  mediaProvider: string;
  isFinals?: boolean;
  finalsDescription?: string;
};

export default function ScheduledMatchCard({
  startAt,
  homeTeam,
  visitorTeam,
  ticketUrl = '',
  mediaProvider,
  isFinals = false,
  finalsDescription = '',
}: Props) {
  const homeTeamStandings = useMemo(() => {
    if (homeTeam.competitionStandings != null) {
      return `${homeTeam.competitionStandings.won ?? 0}-${homeTeam.competitionStandings.lost ?? 0}`;
    }
    return '';
  }, [homeTeam.competitionStandings]);

  const visitorTeamStandings = useMemo(() => {
    if (visitorTeam.competitionStandings != null) {
      return `${visitorTeam.competitionStandings.won ?? 0}-${visitorTeam.competitionStandings.lost ?? 0}`;
    }
    return '';
  }, [visitorTeam.competitionStandings]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <p className="font-barlow text-base">
            {moment(startAt).format(MATCH_DATE_FORMAT)}
          </p>
          <div className="flex flex-row items-center gap-2">
            <img src="/assets/images/icons/icon-tv.png" />
            <p className="font-barlow text-sm text-neutral-60">
              {mediaProvider}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex flex-row justify-between items-center gap-3">
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex flex-row items-start gap-3">
              <div className="flex-1">
                <MatchCompetitor
                  code={visitorTeam.code}
                  name={visitorTeam.nickname}
                  city={visitorTeam.city}
                  ranking={visitorTeamStandings}
                />
              </div>
              <p className="font-special-gothic-condensed-one text-3xl">
                {moment(startAt).format(MATCH_TIME_FORMAT)}
              </p>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="flex-1">
                <MatchCompetitor
                  code={homeTeam.code}
                  name={homeTeam.nickname}
                  city={homeTeam.city}
                  ranking={homeTeamStandings}
                />
              </div>
              <button className="border border-[rgba(255,255,255,0.2)] flex flex-row justify-center items-center px-6 py-2">
                <img src="/assets/images/icons/icon-ticket.png" />
                <span className="font-special-gothic-condensed-one text-base text-white">
                  Boletos
                </span>
              </button>
            </div>
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
