import { getClient } from '@/apollo-client';
import { MATCH_STATUS } from '@/constants';
import {
  HEAD_TO_HEAD_MATCHES,
  MATCH,
  MATCH_PERIODS_BOXSCORE,
  MATCH_TEAMS_BOXSCORE,
} from '@/graphql/match';
import { MATCH_LEADERS_STATS, SEASON_TEAM_LEADER_PLAYER_STATS } from '@/graphql/stats';
import CompletedMatchPage from '@/match/client/components/page/CompletedMatchPage';
import LiveMatchPage from '@/match/client/components/page/LiveMatchPage';
import ScheduledMatchPage from '@/match/client/components/page/ScheduledMatchPage';
import type { MatchTeamComparisonBoxScore } from '@/match/components/stats/MatchTeamStatsComparison';
import { MatchType } from '@/match/types';

type LeadersCategoryStatsType = {
  player: {
    providerId: string;
    avatarUrl: string;
    name: string;
  };
  value: number;
};

type MatchPlayerBoxScore = {
  player: {
    providerId: string;
    name: string;
    avatarUrl: string;
    teamCode?: string;
    team?: {
      code: string;
      name: string;
    };
  };
  boxscore: {
    points: number;
    reboundsTotal: number;
    assists: number;
    steals: number;
    blocks: number;
    threePointersMade: number;
  };
};

type MatchResponse = {
  match: MatchType;
  homeTeamBoxScore: MatchTeamComparisonBoxScore;
  visitorTeamBoxScore: MatchTeamComparisonBoxScore;
  homeTeamPointsLeaders: LeadersCategoryStatsType[];
  homeTeamAssistsLeaders: LeadersCategoryStatsType[];
  homeTeamReboundsLeaders: LeadersCategoryStatsType[];
  visitorTeamPointsLeaders: LeadersCategoryStatsType[];
  visitorTeamAssistsLeaders: LeadersCategoryStatsType[];
  visitorTeamReboundsLeaders: LeadersCategoryStatsType[];
  headToHeadMatches: MatchType[];
  homeTeamPlayersBoxScore: MatchPlayerBoxScore[];
  visitorTeamPlayersBoxScore: MatchPlayerBoxScore[];
  pointsLeaders: MatchPlayerBoxScore[];
  reboundsLeaders: MatchPlayerBoxScore[];
  assistsLeaders: MatchPlayerBoxScore[];
  stealsLeaders: MatchPlayerBoxScore[];
  blocksLeaders: MatchPlayerBoxScore[];
  threePointersMadeLeaders: MatchPlayerBoxScore[];
};

type MatchTeamsBoxScoreResponse = {
  matchTeamsBoxscore: MatchType;
};

type MatchPeriodsBoxScoreResponse = {
  matchPeriods: MatchType;
};

type MatchLeadersStatsResponse = {
  pointsLeaders: {
    edges: {
      node: MatchPlayerBoxScore;
    }[];
  };
  reboundsLeaders: {
    edges: {
      node: MatchPlayerBoxScore;
    }[];
  };
  assistsLeaders: {
    edges: {
      node: MatchPlayerBoxScore;
    }[];
  };
  stealsLeaders: {
    edges: {
      node: MatchPlayerBoxScore;
    }[];
  };
  blocksLeaders: {
    edges: {
      node: MatchPlayerBoxScore;
    }[];
  };
  threePointersMadeLeaders: {
    edges: {
      node: MatchPlayerBoxScore;
    }[];
  };
};

type HeadToHeadMatchesResponse = {
  headToHeadMatchesConnection: {
    edges: {
      node: MatchType;
    }[];
  };
};

type MatchTeamLeadersResponse = {
  pointsLeaders: {
    edges: {
      node: LeadersCategoryStatsType;
    }[];
  };
  reboundsLeaders: {
    edges: {
      node: LeadersCategoryStatsType;
    }[];
  };
  assistsLeaders: {
    edges: {
      node: LeadersCategoryStatsType;
    }[];
  };
};

const fetchMatch = async (matchProviderId: string): Promise<MatchResponse> => {
  const { data, error } = await getClient().query<MatchResponse>({
    query: MATCH,
    variables: { geniusMatchId: 0, providerMatchId: matchProviderId },
  });

  if (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch match data');
  }

  const match = data?.match;

  if (match == null) {
    console.error('No match data found for provider ID:', matchProviderId);
    throw new Error('Match not found');
  }

  const response: MatchResponse = {
    match,
    homeTeamBoxScore: {
      fieldGoalsMade: 0,
      fieldGoalsAttempted: 0,
      fieldGoalsPercentage: 0,
      threePointersMade: 0,
      threePointersAttempted: 0,
      threePointersPercentage: 0,
      freeThrowsMade: 0,
      freeThrowsAttempted: 0,
      freeThrowsPercentage: 0,
      offensiveRebounds: 0,
      reboundsTotal: 0,
      assists: 0,
      turnovers: 0,
      steals: 0,
      blocks: 0,
      foulsPersonal: 0,
    },
    visitorTeamBoxScore: {
      fieldGoalsMade: 0,
      fieldGoalsAttempted: 0,
      fieldGoalsPercentage: 0,
      threePointersMade: 0,
      threePointersAttempted: 0,
      threePointersPercentage: 0,
      freeThrowsMade: 0,
      freeThrowsAttempted: 0,
      freeThrowsPercentage: 0,
      offensiveRebounds: 0,
      reboundsTotal: 0,
      assists: 0,
      turnovers: 0,
      steals: 0,
      blocks: 0,
      foulsPersonal: 0,
    },
    headToHeadMatches: [],
    homeTeamPointsLeaders: [],
    homeTeamAssistsLeaders: [],
    homeTeamReboundsLeaders: [],
    visitorTeamPointsLeaders: [],
    visitorTeamAssistsLeaders: [],
    visitorTeamReboundsLeaders: [],
    homeTeamPlayersBoxScore: [],
    visitorTeamPlayersBoxScore: [],
    pointsLeaders: [],
    reboundsLeaders: [],
    assistsLeaders: [],
    stealsLeaders: [],
    blocksLeaders: [],
    threePointersMadeLeaders: [],
  };

  if (match.status === MATCH_STATUS.SCHEDULED) {
    const { data: matchTeamsBoxScoreData } =
      await getClient().query<MatchTeamsBoxScoreResponse>({
        query: MATCH_TEAMS_BOXSCORE,
        variables: { geniusMatchId: 0, providerMatchId: matchProviderId },
      });

    const matchTeamsBoxScore = matchTeamsBoxScoreData?.matchTeamsBoxscore;

    if (matchTeamsBoxScore == null) {
      console.error(
        'No match teams boxscore data found for provider ID:',
        matchProviderId,
      );
      throw new Error('Match teams boxscore not found');
    }

    response.homeTeamBoxScore = {
      fieldGoalsMade: matchTeamsBoxScore.homeTeamBoxscore?.fieldGoalsMade ?? 0,
      fieldGoalsAttempted:
        matchTeamsBoxScore.homeTeamBoxscore?.fieldGoalsAttempted ?? 0,
      fieldGoalsPercentage:
        matchTeamsBoxScore.homeTeamBoxscore?.fieldGoalsPercentage ?? 0,
      threePointersMade:
        matchTeamsBoxScore.homeTeamBoxscore?.threePointersMade ?? 0,
      threePointersAttempted:
        matchTeamsBoxScore.homeTeamBoxscore?.threePointersAttempted ?? 0,
      threePointersPercentage:
        matchTeamsBoxScore.homeTeamBoxscore?.threePointersPercentage ?? 0,
      freeThrowsMade: matchTeamsBoxScore.homeTeamBoxscore?.freeThrowsMade ?? 0,
      freeThrowsAttempted:
        matchTeamsBoxScore.homeTeamBoxscore?.freeThrowsAttempted ?? 0,
      freeThrowsPercentage:
        matchTeamsBoxScore.homeTeamBoxscore?.freeThrowsPercentage ?? 0,
      offensiveRebounds:
        matchTeamsBoxScore.homeTeamBoxscore?.offensiveRebounds ?? 0,
      reboundsTotal: matchTeamsBoxScore.homeTeamBoxscore?.reboundsTotal ?? 0,
      assists: matchTeamsBoxScore.homeTeamBoxscore?.assists ?? 0,
      turnovers: matchTeamsBoxScore.homeTeamBoxscore?.turnovers ?? 0,
      steals: matchTeamsBoxScore.homeTeamBoxscore?.steals ?? 0,
      blocks: matchTeamsBoxScore.homeTeamBoxscore?.blocks ?? 0,
      foulsPersonal: matchTeamsBoxScore.homeTeamBoxscore?.foulsPersonal ?? 0,
    };
    response.visitorTeamBoxScore = {
      fieldGoalsMade:
        matchTeamsBoxScore.visitorTeamBoxscore?.fieldGoalsMade ?? 0,
      fieldGoalsAttempted:
        matchTeamsBoxScore.visitorTeamBoxscore?.fieldGoalsAttempted ?? 0,
      fieldGoalsPercentage:
        matchTeamsBoxScore.visitorTeamBoxscore?.fieldGoalsPercentage ?? 0,
      threePointersMade:
        matchTeamsBoxScore.visitorTeamBoxscore?.threePointersMade ?? 0,
      threePointersAttempted:
        matchTeamsBoxScore.visitorTeamBoxscore?.threePointersAttempted ?? 0,
      threePointersPercentage:
        matchTeamsBoxScore.visitorTeamBoxscore?.threePointersPercentage ?? 0,
      freeThrowsMade:
        matchTeamsBoxScore.visitorTeamBoxscore?.freeThrowsMade ?? 0,
      freeThrowsAttempted:
        matchTeamsBoxScore.visitorTeamBoxscore?.freeThrowsAttempted ?? 0,
      freeThrowsPercentage:
        matchTeamsBoxScore.visitorTeamBoxscore?.freeThrowsPercentage ?? 0,
      offensiveRebounds:
        matchTeamsBoxScore.visitorTeamBoxscore?.offensiveRebounds ?? 0,
      reboundsTotal:
        matchTeamsBoxScore.visitorTeamBoxscore?.reboundsTotal ?? 0,
      assists: matchTeamsBoxScore.visitorTeamBoxscore?.assists ?? 0,
      turnovers: matchTeamsBoxScore.visitorTeamBoxscore?.turnovers ?? 0,
      steals: matchTeamsBoxScore.visitorTeamBoxscore?.steals ?? 0,
      blocks: matchTeamsBoxScore.visitorTeamBoxscore?.blocks ?? 0,
      foulsPersonal: matchTeamsBoxScore.visitorTeamBoxscore?.foulsPersonal ?? 0,
    };

    const { data: headToHeadMatchesData } =
      await getClient().query<HeadToHeadMatchesResponse>({
        query: HEAD_TO_HEAD_MATCHES,
        variables: {
          teamCodeA: match.homeTeam.code,
          teamCodeB: match.visitorTeam.code,
          toDate: match.startAt,
          first: 5,
        },
      });
    response.headToHeadMatches =
      headToHeadMatchesData?.headToHeadMatchesConnection.edges.map((edge) => edge.node) ??
      [];

    const { data: matchHomeTeamLeadersData } =
      await getClient().query<MatchTeamLeadersResponse>({
        query: SEASON_TEAM_LEADER_PLAYER_STATS,
        variables: { teamCode: match.homeTeam.code, first: 3 },
      });

    response.homeTeamPointsLeaders =
      matchHomeTeamLeadersData?.pointsLeaders.edges.map((edge) => edge.node) ??
      [];
    response.homeTeamAssistsLeaders =
      matchHomeTeamLeadersData?.assistsLeaders.edges.map((edge) => edge.node) ??
      [];
    response.homeTeamReboundsLeaders =
      matchHomeTeamLeadersData?.reboundsLeaders.edges.map(
        (edge) => edge.node,
      ) ?? [];

    const { data: matchVisitorTeamLeadersData } =
      await getClient().query<MatchTeamLeadersResponse>({
        query: SEASON_TEAM_LEADER_PLAYER_STATS,
        variables: { teamCode: match.visitorTeam.code, first: 3 },
      });

    response.visitorTeamPointsLeaders =
      matchVisitorTeamLeadersData?.pointsLeaders.edges.map(
        (edge) => edge.node,
      ) ?? [];
    response.visitorTeamAssistsLeaders =
      matchVisitorTeamLeadersData?.assistsLeaders.edges.map(
        (edge) => edge.node,
      ) ?? [];
    response.visitorTeamReboundsLeaders =
      matchVisitorTeamLeadersData?.reboundsLeaders.edges.map(
        (edge) => edge.node,
      ) ?? [];
  }

  if ([MATCH_STATUS.COMPLETE, MATCH_STATUS.FINISHED].includes(match.status)) {
    const { data: matchTeamsBoxScoreData } =
      await getClient().query<MatchTeamsBoxScoreResponse>({
        query: MATCH_TEAMS_BOXSCORE,
        variables: { geniusMatchId: 0, providerMatchId: matchProviderId },
      });

    const matchTeamsBoxScore = matchTeamsBoxScoreData?.matchTeamsBoxscore;

    if (matchTeamsBoxScore == null) {
      console.error(
        'No match teams boxscore data found for provider ID:',
        matchProviderId,
      );
      throw new Error('Match teams boxscore not found');
    }

    response.homeTeamBoxScore = {
      fieldGoalsMade: matchTeamsBoxScore.homeTeamBoxscore?.fieldGoalsMade ?? 0,
      fieldGoalsAttempted:
        matchTeamsBoxScore.homeTeamBoxscore?.fieldGoalsAttempted ?? 0,
      fieldGoalsPercentage:
        matchTeamsBoxScore.homeTeamBoxscore?.fieldGoalsPercentage ?? 0,
      threePointersMade:
        matchTeamsBoxScore.homeTeamBoxscore?.threePointersMade ?? 0,
      threePointersAttempted:
        matchTeamsBoxScore.homeTeamBoxscore?.threePointersAttempted ?? 0,
      threePointersPercentage:
        matchTeamsBoxScore.homeTeamBoxscore?.threePointersPercentage ?? 0,
      freeThrowsMade: matchTeamsBoxScore.homeTeamBoxscore?.freeThrowsMade ?? 0,
      freeThrowsAttempted:
        matchTeamsBoxScore.homeTeamBoxscore?.freeThrowsAttempted ?? 0,
      freeThrowsPercentage:
        matchTeamsBoxScore.homeTeamBoxscore?.freeThrowsPercentage ?? 0,
      offensiveRebounds:
        matchTeamsBoxScore.homeTeamBoxscore?.offensiveRebounds ?? 0,
      reboundsTotal: matchTeamsBoxScore.homeTeamBoxscore?.reboundsTotal ?? 0,
      assists: matchTeamsBoxScore.homeTeamBoxscore?.assists ?? 0,
      turnovers: matchTeamsBoxScore.homeTeamBoxscore?.turnovers ?? 0,
      steals: matchTeamsBoxScore.homeTeamBoxscore?.steals ?? 0,
      blocks: matchTeamsBoxScore.homeTeamBoxscore?.blocks ?? 0,
      foulsPersonal: matchTeamsBoxScore.homeTeamBoxscore?.foulsPersonal ?? 0,
    };
    response.visitorTeamBoxScore = {
      fieldGoalsMade:
        matchTeamsBoxScore.visitorTeamBoxscore?.fieldGoalsMade ?? 0,
      fieldGoalsAttempted:
        matchTeamsBoxScore.visitorTeamBoxscore?.fieldGoalsAttempted ?? 0,
      fieldGoalsPercentage:
        matchTeamsBoxScore.visitorTeamBoxscore?.fieldGoalsPercentage ?? 0,
      threePointersMade:
        matchTeamsBoxScore.visitorTeamBoxscore?.threePointersMade ?? 0,
      threePointersAttempted:
        matchTeamsBoxScore.visitorTeamBoxscore?.threePointersAttempted ?? 0,
      threePointersPercentage:
        matchTeamsBoxScore.visitorTeamBoxscore?.threePointersPercentage ?? 0,
      freeThrowsMade:
        matchTeamsBoxScore.visitorTeamBoxscore?.freeThrowsMade ?? 0,
      freeThrowsAttempted:
        matchTeamsBoxScore.visitorTeamBoxscore?.freeThrowsAttempted ?? 0,
      freeThrowsPercentage:
        matchTeamsBoxScore.visitorTeamBoxscore?.freeThrowsPercentage ?? 0,
      offensiveRebounds:
        matchTeamsBoxScore.visitorTeamBoxscore?.offensiveRebounds ?? 0,
      reboundsTotal:
        matchTeamsBoxScore.visitorTeamBoxscore?.reboundsTotal ?? 0,
      assists: matchTeamsBoxScore.visitorTeamBoxscore?.assists ?? 0,
      turnovers: matchTeamsBoxScore.visitorTeamBoxscore?.turnovers ?? 0,
      steals: matchTeamsBoxScore.visitorTeamBoxscore?.steals ?? 0,
      blocks: matchTeamsBoxScore.visitorTeamBoxscore?.blocks ?? 0,
      foulsPersonal: matchTeamsBoxScore.visitorTeamBoxscore?.foulsPersonal ?? 0,
    };

    const { data: matchPeriodsBoxScoreData } =
      await getClient().query<MatchPeriodsBoxScoreResponse>({
        query: MATCH_PERIODS_BOXSCORE,
        variables: { geniusMatchId: 0, providerMatchId: matchProviderId },
      });

    const matchPeriodsBoxScore = matchPeriodsBoxScoreData?.matchPeriods;

    if (matchPeriodsBoxScore == null) {
      console.error(
        'No match periods boxscore data found for provider ID:',
        matchProviderId,
      );
      throw new Error('Match periods boxscore not found');
    }

    response.match = {
      ...response.match,
      periods: matchPeriodsBoxScore.periods,
    };

    const { data: matchLeadersStatsData } =
      await getClient().query<MatchLeadersStatsResponse>({
        query: MATCH_LEADERS_STATS,
        variables: { matchProviderId: matchProviderId, first: 3 },
      });

    response.pointsLeaders = matchLeadersStatsData?.pointsLeaders.edges.map(
      (edge) => edge.node,
    ) ?? [];
    response.reboundsLeaders = matchLeadersStatsData?.reboundsLeaders.edges.map(
      (edge) => edge.node,
    ) ?? [];
    response.assistsLeaders = matchLeadersStatsData?.assistsLeaders.edges.map(
      (edge) => edge.node,
    ) ?? [];
    response.stealsLeaders = matchLeadersStatsData?.stealsLeaders.edges.map(
      (edge) => edge.node,
    ) ?? [];
    response.blocksLeaders = matchLeadersStatsData?.blocksLeaders.edges.map(
      (edge) => edge.node,
    ) ?? [];
    response.threePointersMadeLeaders =
      matchLeadersStatsData?.threePointersMadeLeaders.edges.map(
        (edge) => edge.node,
      ) ?? [];
  }

  return response;
};

export default async function PartidoPage({
  params,
}: PageProps<'/partidos/[id]'>) {
  const { id } = await params;
  const data: MatchResponse = await fetchMatch(id);

  return (
    <>
      {[MATCH_STATUS.IN_PROGRESS, MATCH_STATUS.PERIOD_BREAK].includes(
        data.match.status,
      ) && <LiveMatchPage match={data.match} />}
      {[MATCH_STATUS.COMPLETE, MATCH_STATUS.FINISHED].includes(
        data.match.status,
      ) && (
        <CompletedMatchPage
          match={data.match}
          homeTeamBoxScore={data.homeTeamBoxScore}
          visitorTeamBoxScore={data.visitorTeamBoxScore}
          pointsLeaders={data.pointsLeaders}
          reboundsLeaders={data.reboundsLeaders}
          assistsLeaders={data.assistsLeaders}
          stealsLeaders={data.stealsLeaders}
          blocksLeaders={data.blocksLeaders}
          threePointersMadeLeaders={data.threePointersMadeLeaders}
        />
      )}
      {[MATCH_STATUS.SCHEDULED, MATCH_STATUS.RESCHEDULED].includes(
        data.match.status,
      ) && (
        <ScheduledMatchPage
          match={data.match}
          homeTeamBoxScore={data.homeTeamBoxScore}
          visitorTeamBoxScore={data.visitorTeamBoxScore}
          headToHeadMatches={data.headToHeadMatches}
          homeTeamPointsLeaders={data.homeTeamPointsLeaders}
          homeTeamAssistsLeaders={data.homeTeamAssistsLeaders}
          homeTeamReboundsLeaders={data.homeTeamReboundsLeaders}
          visitorTeamPointsLeaders={data.visitorTeamPointsLeaders}
          visitorTeamAssistsLeaders={data.visitorTeamAssistsLeaders}
          visitorTeamReboundsLeaders={data.visitorTeamReboundsLeaders}
        />
      )}
    </>
  );
}
