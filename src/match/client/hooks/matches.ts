import { RECENT_CALENDAR, MATCH_TEAM_PLAYERS_BOXSCORE } from '@/graphql/match';
import { MatchType } from '@/match/types';
import { useQuery } from '@apollo/client/react';

type RecentCalendarResponse = {
  recentCalendarConnection: {
    edges: {
      node: MatchType;
    }[];
  };
};

export function useRecentCalendar(usePolling = false) {
  const { data, loading, error } = useQuery<RecentCalendarResponse>(
    RECENT_CALENDAR,
    {
      variables: { first: 9 },
      fetchPolicy: 'network-only',
      pollInterval: usePolling ? 30 * 1000 : 0, // 30 seconds in milliseconds
    },
  );

  if (error) {
    console.error(error);
  }

  return { data: data?.recentCalendarConnection.edges.map(edge => edge.node) ?? [], loading, error };
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
