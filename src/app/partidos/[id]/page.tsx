import { getClient } from '@/apollo-client';
import { MATCH_STATUS } from '@/constants';
import {
  HEAD_TO_HEAD_MATCHES,
  MATCH,
  MATCH_PERIODS_BOXSCORE,
  MATCH_TEAMS_BOXSCORE,
} from '@/graphql/match';
import {
  MATCH_LEADERS_STATS,
  SEASON_TEAM_LEADER_PLAYER_STATS,
} from '@/graphql/stats';
import { TEAM_DETAIL, TEAM_STATS } from '@/graphql/team';
import CompletedMatchPage from '@/match/client/components/page/CompletedMatchPage';
import LiveMatchPage from '@/match/client/components/page/LiveMatchPage';
import ScheduledMatchPage from '@/match/client/components/page/ScheduledMatchPage';
import { MatchType } from '@/match/types';
import {
  isCompletedMatchForUi,
  isDevForcedLiveMatchPage,
  isLiveMatchPageStatus,
  isScheduledMatchPageStatus,
  shouldUseLiveMatchPageLayout,
} from '@/match/utils/matchStatus';
import {
  SEASON_TEAM_LEADERS_CONNECTION_FIRST,
  SEASON_TEAM_LEADERS_DISPLAY_TOP,
} from '@/constants';

/*
 * Página de detalle de partido: el layout (live / finalizado / programado) y los datos extra
 * (líderes, períodos, H2H) siguen `isCompletedMatchForUi`, `isLiveMatchPageStatus` e
 * `isScheduledMatchPageStatus`, usando `providerFixtureStatus` cuando el proveedor y el `status`
 * interno no van sincronizados.
 */
type LeadersCategoryStatsType = {
  player: {
    providerId: string;
    avatarUrl?: string | null;
    name: string;
  };
  value: number;
};

type MatchPlayerBoxScore = {
  player: {
    providerId: string;
    name: string;
    avatarUrl?: string | null;
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

type MatchTeamComparisonBox = {
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
};

type MatchResponse = {
  match: MatchType;
  homeTeamBoxScore: MatchTeamComparisonBox;
  visitorTeamBoxScore: MatchTeamComparisonBox;
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

/** `team(code)` — misma fuente que ficha de equipo; alinea W–L con la temporada actual. */
type TeamDetailStandingsResponse = {
  team?: {
    competitionStandings?: {
      won: number;
      lost: number;
    };
  };
};

type TeamSeasonStatsPerGameForComparison = {
  pointsAverage: number;
  reboundsTotalAverage: number;
  assistsAverage: number;
  stealsAverage: number;
  blocksAverage: number;
  turnoversAverage: number;
};

type TeamStatsForComparisonResponse = {
  team?: {
    seasonStats?: TeamSeasonStatsPerGameForComparison;
  };
};

function teamSeasonPerGameAveragesForScheduledComparison(
  stats: TeamSeasonStatsPerGameForComparison | undefined,
): MatchTeamComparisonBox {
  return {
    points: Number(stats?.pointsAverage ?? 0),
    rebounds: Number(stats?.reboundsTotalAverage ?? 0),
    assists: Number(stats?.assistsAverage ?? 0),
    steals: Number(stats?.stealsAverage ?? 0),
    blocks: Number(stats?.blocksAverage ?? 0),
    turnovers: Number(stats?.turnoversAverage ?? 0),
  };
}

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

  const devForceLive = isDevForcedLiveMatchPage(matchProviderId);

  const response: MatchResponse = {
    match,
    homeTeamBoxScore: {
      points: 0,
      rebounds: 0,
      assists: 0,
      steals: 0,
      blocks: 0,
      turnovers: 0,
    },
    visitorTeamBoxScore: {
      points: 0,
      rebounds: 0,
      assists: 0,
      steals: 0,
      blocks: 0,
      turnovers: 0,
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

  // Totales de equipo (boxscore agregado): aplica a en vivo, pre-partido y otros estados listados.
  // `devForceLive`: fixture finalizado en API pero vista live local → también cargar agregados.
  if (
    devForceLive ||
    [
      MATCH_STATUS.IN_PROGRESS,
      MATCH_STATUS.PERIOD_BREAK,
      MATCH_STATUS.PENDING,
      MATCH_STATUS.READY,
      MATCH_STATUS.SCHEDULED,
      MATCH_STATUS.DELAYED,
      MATCH_STATUS.INTERRUPTED,
      MATCH_STATUS.WARMUP,
      MATCH_STATUS.PREMATCH,
      MATCH_STATUS.ANTHEM,
      MATCH_STATUS.ONCOURT,
      MATCH_STATUS.STANDBY,
      MATCH_STATUS.COUNTDOWN,
      MATCH_STATUS.LOADED,
    ].includes(match.status)
  ) {
    try {
      const { data: matchTeamsBoxScoreData, error: teamsBoxError } =
        await getClient().query<MatchTeamsBoxScoreResponse>({
          query: MATCH_TEAMS_BOXSCORE,
          variables: { geniusMatchId: 0, providerMatchId: matchProviderId },
          errorPolicy: 'all',
        });

      if (teamsBoxError) {
        console.error(
          '[fetchMatch] MATCH_TEAMS_BOXSCORE GraphQL error:',
          matchProviderId,
          teamsBoxError,
        );
      }

      const matchTeamsBoxScore = matchTeamsBoxScoreData?.matchTeamsBoxscore;

      if (matchTeamsBoxScore != null) {
        response.homeTeamBoxScore = {
          points: matchTeamsBoxScore.homeTeamBoxscore?.points ?? 0,
          rebounds: matchTeamsBoxScore.homeTeamBoxscore?.reboundsTotal ?? 0,
          assists: matchTeamsBoxScore.homeTeamBoxscore?.assists ?? 0,
          steals: matchTeamsBoxScore.homeTeamBoxscore?.steals ?? 0,
          blocks: matchTeamsBoxScore.homeTeamBoxscore?.blocks ?? 0,
          turnovers: matchTeamsBoxScore.homeTeamBoxscore?.turnovers ?? 0,
        };
        response.visitorTeamBoxScore = {
          points: matchTeamsBoxScore.visitorTeamBoxscore?.points ?? 0,
          rebounds: matchTeamsBoxScore.visitorTeamBoxscore?.reboundsTotal ?? 0,
          assists: matchTeamsBoxScore.visitorTeamBoxscore?.assists ?? 0,
          steals: matchTeamsBoxScore.visitorTeamBoxscore?.steals ?? 0,
          blocks: matchTeamsBoxScore.visitorTeamBoxscore?.blocks ?? 0,
          turnovers: matchTeamsBoxScore.visitorTeamBoxscore?.turnovers ?? 0,
        };
      } else {
        console.warn(
          '[fetchMatch] matchTeamsBoxscore null or missing; keeping zero totals',
          matchProviderId,
        );
      }
    } catch (e) {
      console.error(
        '[fetchMatch] MATCH_TEAMS_BOXSCORE request failed:',
        matchProviderId,
        e,
      );
    }
  }

  // Programado o reprogramado: W–L desde `team`, cara a cara, líderes de TEMPORADA por equipo (no del juego).
  if (
    !devForceLive &&
    isScheduledMatchPageStatus(match.status, match.providerFixtureStatus)
  ) {
    const [
      { data: homeTeamDetail },
      { data: visitorTeamDetail },
      { data: homeTeamStatsData },
      { data: visitorTeamStatsData },
    ] = await Promise.all([
      getClient().query<TeamDetailStandingsResponse>({
        query: TEAM_DETAIL,
        variables: { code: match.homeTeam.code },
      }),
      getClient().query<TeamDetailStandingsResponse>({
        query: TEAM_DETAIL,
        variables: { code: match.visitorTeam.code },
      }),
      getClient().query<TeamStatsForComparisonResponse>({
        query: TEAM_STATS,
        variables: { code: match.homeTeam.code },
      }),
      getClient().query<TeamStatsForComparisonResponse>({
        query: TEAM_STATS,
        variables: { code: match.visitorTeam.code },
      }),
    ]);

    response.homeTeamBoxScore = teamSeasonPerGameAveragesForScheduledComparison(
      homeTeamStatsData?.team?.seasonStats,
    );
    response.visitorTeamBoxScore = teamSeasonPerGameAveragesForScheduledComparison(
      visitorTeamStatsData?.team?.seasonStats,
    );

    const homeFromTeam = homeTeamDetail?.team?.competitionStandings;
    const visitorFromTeam = visitorTeamDetail?.team?.competitionStandings;

    if (homeFromTeam != null || visitorFromTeam != null) {
      response.match = {
        ...response.match,
        homeTeam: {
          ...response.match.homeTeam,
          competitionStandings:
            homeFromTeam != null
              ? { won: homeFromTeam.won, lost: homeFromTeam.lost }
              : response.match.homeTeam.competitionStandings,
        },
        visitorTeam: {
          ...response.match.visitorTeam,
          competitionStandings:
            visitorFromTeam != null
              ? { won: visitorFromTeam.won, lost: visitorFromTeam.lost }
              : response.match.visitorTeam.competitionStandings,
        },
      };
    }

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
      headToHeadMatchesData?.headToHeadMatchesConnection.edges.map(
        (edge) => edge.node,
      ) ?? [];

    const [{ data: matchHomeTeamLeadersData }, { data: matchVisitorTeamLeadersData }] =
      await Promise.all([
        getClient().query<MatchTeamLeadersResponse>({
          query: SEASON_TEAM_LEADER_PLAYER_STATS,
          variables: {
            teamCode: match.homeTeam.code,
            first: SEASON_TEAM_LEADERS_CONNECTION_FIRST,
          },
        }),
        getClient().query<MatchTeamLeadersResponse>({
          query: SEASON_TEAM_LEADER_PLAYER_STATS,
          variables: {
            teamCode: match.visitorTeam.code,
            first: SEASON_TEAM_LEADERS_CONNECTION_FIRST,
          },
        }),
      ]);

    const top = SEASON_TEAM_LEADERS_DISPLAY_TOP;

    response.homeTeamPointsLeaders = (
      matchHomeTeamLeadersData?.pointsLeaders.edges ?? []
    )
      .slice(0, top)
      .map((edge) => edge.node);
    response.homeTeamAssistsLeaders = (
      matchHomeTeamLeadersData?.assistsLeaders.edges ?? []
    )
      .slice(0, top)
      .map((edge) => edge.node);
    response.homeTeamReboundsLeaders = (
      matchHomeTeamLeadersData?.reboundsLeaders.edges ?? []
    )
      .slice(0, top)
      .map((edge) => edge.node);

    response.visitorTeamPointsLeaders = (
      matchVisitorTeamLeadersData?.pointsLeaders.edges ?? []
    )
      .slice(0, top)
      .map((edge) => edge.node);
    response.visitorTeamAssistsLeaders = (
      matchVisitorTeamLeadersData?.assistsLeaders.edges ?? []
    )
      .slice(0, top)
      .map((edge) => edge.node);
    response.visitorTeamReboundsLeaders = (
      matchVisitorTeamLeadersData?.reboundsLeaders.edges ?? []
    )
      .slice(0, top)
      .map((edge) => edge.node);
  }

  // Partido cerrado: parciales + líderes del JUEGO (`matchLeadersConnection` por `matchProviderId`).
  if (
    !devForceLive &&
    isCompletedMatchForUi(match.status, match.providerFixtureStatus)
  ) {
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
        fetchPolicy: 'network-only',
      });

    response.pointsLeaders =
      matchLeadersStatsData?.pointsLeaders.edges.map((edge) => edge.node) ?? [];
    response.reboundsLeaders =
      matchLeadersStatsData?.reboundsLeaders.edges.map((edge) => edge.node) ??
      [];
    response.assistsLeaders =
      matchLeadersStatsData?.assistsLeaders.edges.map((edge) => edge.node) ??
      [];
    response.stealsLeaders =
      matchLeadersStatsData?.stealsLeaders.edges.map((edge) => edge.node) ?? [];
    response.blocksLeaders =
      matchLeadersStatsData?.blocksLeaders.edges.map((edge) => edge.node) ?? [];
    response.threePointersMadeLeaders =
      matchLeadersStatsData?.threePointersMadeLeaders.edges.map(
        (edge) => edge.node,
      ) ?? [];
  } else if (
    devForceLive ||
    isLiveMatchPageStatus(match.status, match.providerFixtureStatus)
  ) {
    // En vivo: mismos líderes con scope de partido que al finalizar (no líderes de liga ni solo un equipo).
    try {
      const { data: matchLeadersStatsData, error: liveLeadersError } =
        await getClient().query<MatchLeadersStatsResponse>({
          query: MATCH_LEADERS_STATS,
          variables: { matchProviderId: matchProviderId, first: 3 },
          fetchPolicy: 'network-only',
          errorPolicy: 'all',
        });

      if (liveLeadersError) {
        console.error(
          '[fetchMatch] live MATCH_LEADERS_STATS error:',
          matchProviderId,
          liveLeadersError,
        );
      }

      if (matchLeadersStatsData != null) {
        response.pointsLeaders =
          matchLeadersStatsData.pointsLeaders.edges.map((edge) => edge.node) ??
          [];
        response.reboundsLeaders =
          matchLeadersStatsData.reboundsLeaders.edges.map(
            (edge) => edge.node,
          ) ?? [];
        response.assistsLeaders =
          matchLeadersStatsData.assistsLeaders.edges.map(
            (edge) => edge.node,
          ) ?? [];
        response.stealsLeaders =
          matchLeadersStatsData.stealsLeaders.edges.map((edge) => edge.node) ??
          [];
        response.blocksLeaders =
          matchLeadersStatsData.blocksLeaders.edges.map((edge) => edge.node) ??
          [];
        response.threePointersMadeLeaders =
          matchLeadersStatsData.threePointersMadeLeaders.edges.map(
            (edge) => edge.node,
          ) ?? [];
      }
    } catch (e) {
      console.error(
        '[fetchMatch] live MATCH_LEADERS_STATS request failed:',
        matchProviderId,
        e,
      );
    }
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
      {/* Layout “En vivo” solo según estado del partido (no según streamUrl). */}
      {shouldUseLiveMatchPageLayout(data.match) && (
        <LiveMatchPage
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
      {/* Partido cerrado: mismo criterio que `!shouldUseLiveMatchPageLayout` cuando no es programado. */}
      {!isDevForcedLiveMatchPage(data.match.providerId) &&
        isCompletedMatchForUi(
          data.match.status,
          data.match.providerFixtureStatus,
        ) && (
        <CompletedMatchPage
          match={data.match}
          pointsLeaders={data.pointsLeaders}
          reboundsLeaders={data.reboundsLeaders}
          assistsLeaders={data.assistsLeaders}
          stealsLeaders={data.stealsLeaders}
          blocksLeaders={data.blocksLeaders}
          threePointersMadeLeaders={data.threePointersMadeLeaders}
        />
      )}
      {/* SCHEDULED / RESCHEDULED y no cerrado: antes solo se cargaba preview si `status === SCHEDULED`. */}
      {!isDevForcedLiveMatchPage(data.match.providerId) &&
        isScheduledMatchPageStatus(
          data.match.status,
          data.match.providerFixtureStatus,
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
