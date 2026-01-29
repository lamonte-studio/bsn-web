'use client';

import { DEFAULT_MEDIA_PROVIDER, MATCH_STATUS } from '@/constants';
import { MatchType } from '@/match/types';
import DefaultSlider from '@/shared/client/components/slider/DefaultSlider';
import moment from 'moment';
import Link from 'next/link';
import { useMemo } from 'react';
import LiveMatchCard from '../components/card/LiveMatchCard';
import CompletedMatchCard from '../components/card/CompletedMatchCard';
import ScheduledMatchCard from '../components/card/ScheduledMatchCard';
import { useTodayMatches } from '../hooks/matches';

export default function DailyMatchesSliderWidget() {
  const { data, loading, error } = useTodayMatches(moment().format('YYYY-MM-DD'));

  const sortedMatches = useMemo(() => {
    return data.slice().sort((a: MatchType, b: MatchType) => {
      if (
        [
          MATCH_STATUS.READY,
          MATCH_STATUS.IN_PROGRESS,
          MATCH_STATUS.PERIOD_BREAK,
        ].includes(a.status)
      ) {
        return -1;
      }

      if (
        [
          MATCH_STATUS.READY,
          MATCH_STATUS.IN_PROGRESS,
          MATCH_STATUS.PERIOD_BREAK,
        ].includes(b.status)
      ) {
        return 1;
      }

      return 0;
    });
  }, [data]);

  if (loading) {
    return <div>Cargando partidos...</div>;
  }

  return (
    <DefaultSlider
      data={sortedMatches}
      render={(item: MatchType) => (
        <div key={`match-${item.providerId}`}>
          {![
            MATCH_STATUS.COMPLETE,
            MATCH_STATUS.FINISHED,
            MATCH_STATUS.SCHEDULED,
          ].includes(item.status ?? '') && (
            <LiveMatchCard
              homeTeam={item.homeTeam}
              visitorTeam={item.visitorTeam}
              currentQuarter={item.currentPeriod}
              currentTime={item.currentTime}
              mediaProvider={item.channel || DEFAULT_MEDIA_PROVIDER}
              status={item.status}
              overtimePeriods={item.overtimePeriods}
              isFinals={item.isFinals}
              finalsDescription={item.finalsDescription}
            />
          )}
          {[MATCH_STATUS.COMPLETE, MATCH_STATUS.FINISHED].includes(
            item.status,
          ) && (
            <CompletedMatchCard
              matchProviderId={item.providerId}
              startAt={item.startAt}
              homeTeam={item.homeTeam}
              visitorTeam={item.visitorTeam}
              overtimePeriods={item.overtimePeriods}
              isFinals={item.isFinals}
              finalsDescription={item.finalsDescription}
            />
          )}
          {[MATCH_STATUS.SCHEDULED].includes(item.status) && (
            <ScheduledMatchCard
              matchProviderId={item.providerId}
              startAt={item.startAt}
              homeTeam={item.homeTeam}
              visitorTeam={item.visitorTeam}
              mediaProvider={item.channel || DEFAULT_MEDIA_PROVIDER}
              ticketUrl={item.homeTeam.ticketUrl}
              isFinals={item.isFinals}
              finalsDescription={item.finalsDescription}
            />
          )}
        </div>
      )}
    />
  );
}
