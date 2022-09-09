const { gql } = require("apollo-server-express");

const typeDefs = gql`
  "Unix time stamp in milliseconds."
  scalar Date

  type Query {
    "Find the logged in user."
    me: User
    ticker(ticker: String!, timeSpan: String!): TickerData
    numPredictions: NumPredictions
  }

  type Mutation {
    createUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    makePrediction(
      ticker: String!
      coordinates: [CoordsInput!]!
      timeSpan: String!
    ): Prediction
  }

  type Auth {
    token: String!
    user: User!
  }

  type User {
    _id: ID!
    email: String!
    lastLogin: Date!
  }

  type TickerData {
    ticker: String!
    x: [Float]!
    y: [Float]!
  }

  type Prediction {
    ticker: String!
  }

  input CoordsInput {
    x: Float!
    y: Float!
  }

  type Coords {
    x: Float!
    y: Float!
  }

  type NumPredictions {
    numPredictions: Int!
  }
`;

module.exports = typeDefs;
