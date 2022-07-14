import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String, $after: String, $first: Int) {
  repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword, after: $after, first: $first) {
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

export const USER_REVIEWS = gql`
query {
  me {
    id
    username
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          repositoryId
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



export const REPO_BY_ID = gql`
query repoById ($id: ID!, $first: Int, $after: String) {
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
    reviews(first: $first, after: $after) {
      edges {
        node {
          id
          text
          rating
          repositoryId
          createdAt
          user {
            id
            username
          }
        }
        cursor
      }
       pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
}
`
