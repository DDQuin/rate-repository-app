import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query {
    repositories {
      totalCount
      edges {
        node {
          id
          name
          ownerName
          createdAt
          fullName
          reviewCount
          ratingAverage
          forksCount
          stargazersCount
          description
          language
          ownerAvatarUrl
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const USER_SIGNED = gql `
query {
    me {
      id
      username
    }
  }
`

export const REPO_BY_ID = gql`
query repoById ($id: ID!) {
  repository(id: $id) {
    id
    url
    name
    ownerName
    createdAt
    fullName
    reviewCount
    ratingAverage
    forksCount
    stargazersCount
    description
    language    
    ownerAvatarUrl
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`
