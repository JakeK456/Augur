import { gql } from "@apollo/client";

export const ME = gql`
  query me {
    me {
      _id
      firstName
      lastName
      lastLogin
      email
    }
  }
`;

export const TICKER = gql`
  query ticker($ticker: String!, $timeSpan: String!) {
    ticker(ticker: $ticker, timeSpan: $timeSpan) {
      ticker
      datasets {
        data {
          x
          y
        }
        borderColor
        borderDash
      }
    }
  }
`;

export const NUM_PREDICTIONS = gql`
  query numPredictions {
    numPredictions {
      numPredictions
    }
  }
`;

export const GET_CARDS = gql`
  query cards($ticker: String!) {
    cards(ticker: $ticker) {
      predictionId
      ticker
      startDate
      endDate
    }
  }
`;

export const GET_DISPLAY_GRAPH = gql`
  query displayGraph($predictionId: String!) {
    displayGraph(predictionId: $predictionId) {
      ticker
      datasets {
        data {
          x
          y
        }
        borderColor
        borderDash
      }
    }
  }
`;

export const PROFILE_PICTURE = gql`
  query profilePicture {
    profilePicture {
      url
    }
  }
`;

export const NEWS = gql`
  query news {
    news {
      uuid
      title
      source
      image_url
      url
    }
  }
`;

export const PROFILE = gql`
  query profile($accountId: String!) {
    profile(accountId: $accountId) {
      email
    }
  }
`;
