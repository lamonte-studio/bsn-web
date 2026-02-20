'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import moment from 'moment';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@/shared/client/components/ui';
import MatchCompetitor from '../competitor/MatchCompetitor';
import { getFirstWord } from '@/utils/text';
import { MATCH_DATE_FORMAT, MATCH_TIME_FORMAT } from '@/constants';

type Props = {
  matchProviderId?: string;
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
  matchProviderId,
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
    <Card className="w-[308px]">
      <CardHeader className="border-b border-b-[rgba(255,255,255,0.05)] mx-5">
        <div className="flex flex-row justify-between items-center">
          <p className="font-barlow font-medium leading-[24px] text-sm text-[rgba(255,255,255,0.8)]">
            {moment(startAt).format(MATCH_DATE_FORMAT)}
          </p>
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
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex flex-row justify-between items-center gap-3">
              <div className="flex-1">
                <MatchCompetitor
                  code={visitorTeam.code}
                  name={getFirstWord(visitorTeam.nickname)}
                  city={visitorTeam.city}
                  ranking={visitorTeamStandings}
                  avatarSize={33}
                />
              </div>
              <p className="font-special-gothic-condensed-one text-[32px] text-white">
                {moment(startAt).format(MATCH_TIME_FORMAT)}
              </p>
            </div>
            <div className="flex flex-row justify-between items-center gap-3">
              <div className="flex-1">
                <MatchCompetitor
                  code={homeTeam.code}
                  name={getFirstWord(homeTeam.nickname)}
                  city={homeTeam.city}
                  ranking={homeTeamStandings}
                  avatarSize={33}
                />
              </div>
              <div className="flex h-[48px] items-center"></div>
            </div>
          </div>
        </div>
        <div>
          <Link
            href={`/partidos/${matchProviderId}`}
            className="bg-[rgba(15,15,15,0.19)] border border-[rgba(255,255,255,0.21)] block text-center rounded-[18px] p-[5px]"
            style={{ backdropFilter: 'blur(40px)' }}
          >
            <span className="text-[15px] text-white">
              Ver previa
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
