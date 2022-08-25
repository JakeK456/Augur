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
  query ticker($ticker: String!) {
    ticker(ticker: $ticker) {
      ticker
    }
  }
`;
