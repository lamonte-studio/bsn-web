import { gql } from '@apollo/client';

export const TEAM_DETAIL = gql`
  query getTeam($code: String!) {
    team(code: $code) {
      geniusId
      providerId
      name
      nickname
      code
      city
      group
      colorPrimary
      streamUrl
      ticketUrl
      competitionStandings {
        positionInGroup
        won
        lost
        drawn
        percentageWon
        homeWins
        homeLosses
        awayWins
        awayLosses
        pointsAverage
        reboundsTotalAverage
        assistsAverage
        fieldGoalsPercentage
      }
    }
  }
`;

export const TEAM_RECENT_CALENDAR = gql`
  query getTeamRecentCalendar(
    $code: String!
    $date: String!
    $first: Int!
    $after: String
  ) {
    teamRecentCalendarConnection(
      code: $code
      date: $date
      first: $first
      after: $after
    ) {
      edges {
        node {
          id
          startAt
          geniusId
          homeTeam {
            code
            score
          }
          visitorTeam {
            code
            score
          }
          overtimePeriods
          status
        }
      }
    }
  }
`;

export const TEAM_UPCOMING_CALENDAR = gql`
  query getTeamUpcomingCalendar(
    $code: String!
    $date: String!
    $first: Int!
    $after: String
  ) {
    teamUpcomingCalendarConnection(
      code: $code
      date: $date
      first: $first
      after: $after
    ) {
      edges {
        node {
          id
          startAt
          geniusId
          homeTeam {
            code
          }
          visitorTeam {
            code
          }
          status
        }
      }
    }
  }
`;

export const TEAM_PLAYERS_CONNECTION = gql`
  query getTeamPlayers($code: String!, $first: Int!, $after: String) {
    teamPlayersStatsConnection(code: $code, first: $first, after: $after) {
      edges {
        node {
          providerId
          name
          nickname
          avatarUrl
          dob
          height
          playingPosition
          shirtNumber
        }
      }
    }
  }
`;

export const TEAM_PLAYERS_STATS_CONNECTION = gql`
  query getTeamPlayersStats($code: String!, $first: Int!, $after: String) {
    teamPlayersStatsConnection(code: $code, first: $first, after: $after) {
      edges {
        node {
          providerId
          name
          nickname
          avatarUrl
          playingPosition
          stats {
            games
            minutes
            points
            pointsAvg
            fieldGoalsMadeAvg
            fieldGoalsAttemptedAvg
            fieldGoalsPercentage
            threePointersMadeAvg
            threePointersAttemptedAvg
            threePointersPercentage
            freeThrowsMadeAvg
            freeThrowsAttemptedAvg
            freeThrowsPercentage
            offensiveReboundsAvg
            defensiveReboundsAvg
            reboundsTotalAvg
            assistsAvg
            turnoversAvg
            stealsAvg
            blocksAvg
            foulsPersonalAvg
            plusMinusPointsAvg
          }
        }
      }
    }
  }
`;

export const TEAM_LEADERS_STATS_CONNECTION = gql`
  query getSeasonTeamLeaderPlayerStats($teamCode: String!, $first: Int!) {
    pointsLeaders: seasonPlayerStatsConnection(
      statsCode: "POINTS_AVG"
      teamCode: $teamCode
      first: $first
    ) {
      edges {
        node {
          player {
            providerId
            avatarUrl
            name
            playingPosition
          }
          value
        }
      }
    }
    reboundsLeaders: seasonPlayerStatsConnection(
      statsCode: "REBOUNDS_AVG"
      teamCode: $teamCode
      first: $first
    ) {
      edges {
        node {
          player {
            providerId
            avatarUrl
            name
            playingPosition
          }
          value
        }
      }
    }
    assistsLeaders: seasonPlayerStatsConnection(
      statsCode: "ASSISTS_AVG"
      teamCode: $teamCode
      first: $first
    ) {
      edges {
        node {
          player {
            providerId
            avatarUrl
            name
            playingPosition
          }
          value
        }
      }
    }
    blocksLeaders: seasonPlayerStatsConnection(
      statsCode: "BLOCKS_AVG"
      teamCode: $teamCode
      first: $first
    ) {
      edges {
        node {
          player {
            providerId
            avatarUrl
            name
            playingPosition
          }
          value
        }
      }
    }
    stealsLeaders: seasonPlayerStatsConnection(
      statsCode: "STEALS_AVG"
      teamCode: $teamCode
      first: $first
    ) {
      edges {
        node {
          player {
            providerId
            avatarUrl
            name
            playingPosition
          }
          value
        }
      }
    }
    fieldGoalsLeaders: seasonPlayerStatsConnection(
      statsCode: "FIELD_GOALS_AVG"
      teamCode: $teamCode
      first: $first
    ) {
      edges {
        node {
          player {
            providerId
            avatarUrl
            name
            playingPosition
          }
          value
        }
      }
    }
  }
`;