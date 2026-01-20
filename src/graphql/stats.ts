import { gql } from '@apollo/client';

export const SEASON_TOP_PLAYER_LEADER_STATS_BY_CATEGORY = gql`
  query getSeasonTopPlayerLeaderStatsByCategory($statsCode: String!, $first: Int!) {
    seasonPlayerStatsConnection(
      statsCode: $statsCode
      first: $first
    ) {
      edges {
        node {
          player {
            providerId
            avatarUrl
            name
            playingPosition
            teamCode
            teamName
          }
          value
        }
      }
    }
  }
`;

export const STANDINGS_TABLE_BASIC = gql`
  query getStandingsTable {
    standings {
      groups {
        name
        teams {
          name
          nickname
          code
          competitionStandings {
            won
            lost
            percentageWon
            homeWins
            homeLosses
            awayWins
            awayLosses
          }
        }
      }
    }
  }
`;
