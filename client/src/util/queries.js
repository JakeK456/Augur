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
