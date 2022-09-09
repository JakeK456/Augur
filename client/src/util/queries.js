import { gql } from "@apollo/client";

export const ME = gql`
  query me {
    me {
      _id
      lastLogin
      email
    }
  }
`;

export const TICKER = gql`
  query ticker($ticker: String!, $timeSpan: String!) {
    ticker(ticker: $ticker, timeSpan: $timeSpan) {
      ticker
      x
      y
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
