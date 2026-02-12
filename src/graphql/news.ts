import { gql } from '@apollo/client';

export const LATEST_NEWS = gql`
  query getLatestNews($search: String, $first: Int!) {
    news(search: $search, first: $first) {
      edges {
        node {
          id
          title
          excerpt
          publishedAt
          imageUrl
          url
        }
      }
    }
  }
`;
