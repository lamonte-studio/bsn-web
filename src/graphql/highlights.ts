import { gql } from '@apollo/client';

export const TOP_PERFORMANCES = gql`
  query getTopPerformances {
    topPerformances {
      items {
        title
        coverUrl
        playListId
        videoId
      }
    }
  }
`;

export const THE_ROUTE = gql`
  query getTheRoute {
    theRoute {
      items {
        title
        coverUrl
        playListId
        videoId
      }
    }
  }
`;
