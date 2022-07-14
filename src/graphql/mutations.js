
import { gql } from '@apollo/client';

export const SIGN_IN = gql`
mutation signIn ($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`

export const REVIEW_REPO = gql`
mutation($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String) {
  createReview(review: { ownerName: $ownerName, rating: $rating, repositoryName: $repositoryName,
  text: $text }) {
    repositoryId
  }
}
`

export const CREATE_USER = gql`
mutation CreateUser($username: String!, $password: String!) {
  createUser(user: {username: $username, password: $password}) {
    username
  }
}
`

export const DELETE_REVIEW = gql`
mutation($deleteReviewId: ID!) {
  deleteReview(id: $deleteReviewId)
}
`