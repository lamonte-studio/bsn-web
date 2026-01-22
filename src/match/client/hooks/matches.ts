import { DATE_TIME_TZ_FORMAT } from '@/constants';
import { DAILY_MATCHES } from '@/graphql/match';
import { MatchType } from '@/match/types';
import { useQuery } from '@apollo/client/react';
import moment from 'moment';
import { useMemo } from 'react';

type DailyMatchesResponse = {
  matches: MatchType[];
};

export function useTodayMatches(date?: string) {
  const fromDate = useMemo(() => {
    const fromStartDate = moment(date).startOf('day');
    return fromStartDate.format(DATE_TIME_TZ_FORMAT);
  }, [date]);
  const toDate = useMemo(() => {
    const toEndDate = moment(date).endOf('day');
    return toEndDate.format(DATE_TIME_TZ_FORMAT);
  }, [date]);

  const { data, loading, error } = useQuery<DailyMatchesResponse>(DAILY_MATCHES, {
    variables: { fromDate, toDate },
    fetchPolicy: 'network-only',
    pollInterval: 30 * 1000, // 30 seconds in milliseconds
  });

  if (error) {
    console.error(error);
  }

  return { data: data?.matches ?? [], loading, error };
}
