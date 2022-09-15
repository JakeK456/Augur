const { gql } = require("apollo-server-express");

const typeDefs = gql`
  "Unix time stamp in milliseconds."
  scalar Date

  type Query {
    "Find the logged in user."
    me: User
    ticker(ticker: String!, timeSpan: String!): GraphData!
    numPredictions: NumPredictions
    cards(ticker: String!): [Card]
    displayGraph(predictionId: String!): GraphData!
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

  type Card {
    predictionId: String!
    ticker: String!
    startDate: Float!
    endDate: Float!
  }

  type GraphData {
    ticker: String!
    datasets: [GraphDataset!]!
  }

  type GraphDataset {
    data: [Coords!]!
    borderColor: String!
    borderDash: [Int]
  }
`;

module.exports = typeDefs;
