import { DATE_TIME_TZ_FORMAT } from '@/constants';
import { DAILY_MATCHES, MATCH_TEAM_PLAYERS_BOXSCORE } from '@/graphql/match';
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

  const { data, loading, error } = useQuery<DailyMatchesResponse>(
    DAILY_MATCHES,
    {
      variables: { fromDate, toDate },
      fetchPolicy: 'network-only',
      pollInterval: 30 * 1000, // 30 seconds in milliseconds
    },
  );

  if (error) {
    console.error(error);
  }

  return { data: data?.matches ?? [], loading, error };
}

type MatchTeamPlayersBoxScoreResponse = {
  matchPlayersBoxscore: {
    player: {
      providerId: string;
      name: string;
      nickname: string;
      shirtNumber: string;
      playingPosition: string;
    };
    boxscore: {
      minutes: number;
      points: number;
      reboundsTotal: number;
      assists: number;
      fieldGoalsMade: number;
      fieldGoalsAttempted: number;
      fieldGoalsPercentage: number;
      threePointersMade: number;
      threePointersAttempted: number;
      threePointersPercentage: number;
      freeThrowsMade: number;
      freeThrowsAttempted: number;
      freeThrowsPercentage: number;
      foulsPersonal: number;
      steals: number;
      blocks: number;
      turnovers: number;
      plusMinusPoints: number;
    };
  }[];
};

export function useMatchTeamPlayersBoxscore(
  providerMatchId: string,
  providerTeamId: string,
  usePolling = false,
) {
  const { data, loading, error } = useQuery<MatchTeamPlayersBoxScoreResponse>(
    MATCH_TEAM_PLAYERS_BOXSCORE,
    {
      variables: {
        geniusMatchId: 0,
        geniusTeamId: 0,
        providerMatchId,
        providerTeamId,
      },
      fetchPolicy: 'network-only',
      pollInterval: usePolling ? 120 * 1000 : 0, // 120 seconds in milliseconds
    },
  );

  if (error) {
    console.error(error);
  }

  return { data: data?.matchPlayersBoxscore ?? [], loading, error };
}
