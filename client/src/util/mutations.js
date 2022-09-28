import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      token
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const MAKE_PREDICTION = gql`
  mutation MakePrediction(
    $ticker: String!
    $coordinates: [CoordsInput!]!
    $timeSpan: String!
  ) {
    makePrediction(
      ticker: $ticker
      coordinates: $coordinates
      timeSpan: $timeSpan
    ) {
      ticker
    }
  }
`;

export const SET_PROFILE_PICTURE = gql`
  mutation setProfilePicture($url: String!) {
    setProfilePicture(url: $url) {
      url
    }
  }
`;
