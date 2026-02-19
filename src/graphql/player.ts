import { gql } from '@apollo/client';

export const PLAYER_PROFILE = gql`
  query getPlayerProfile($geniusId: Int!, $providerId: String) {
    player(geniusId: $geniusId, providerId: $providerId) {
      providerId
      name
      nickname
      avatarUrl
      playingPosition
      height
      weight
      dob
      nationality
      shirtNumber
      team {
        code
        name
        nickname
        colorPrimary
      }
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
`;