const { gql } = require("apollo-server-express");

const typeDefs = gql`
  "Unix time stamp in milliseconds."
  scalar Date

  type Query {
    me: User
    ticker(ticker: String!, timeSpan: String!): GraphData!
    numPredictions: NumPredictions
    usersTickers: UsersTickers
    cards(ticker: String!, date: String!, order: String!): [Card]
    displayGraph(predictionId: String!): GraphData!
    profilePicture: ProfilePicture
    news: [NewsArticle]
    profile(accountId: String!): Profile!
  }

  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      username: String!
      email: String!
      password: String!
    ): Auth
    login(email: String!, password: String!): Auth
    makePrediction(
      ticker: String!
      coordinates: [CoordsInput!]!
      timeSpan: String!
    ): Prediction
    setProfilePicture(url: String): ProfilePicture
  }

  type NewsArticle {
    uuid: String!
    title: String!
    source: String!
    image_url: String!
    url: String!
  }

  type ProfilePicture {
    url: String
  }

  type Auth {
    token: String!
    user: User!
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    email: String!
    lastLogin: Date!
  }

  type TickerData {
    ticker: String!
    x: [Float]!
    y: [Float]!
  }

  type UsersTickers {
    usersTickers: [String!]
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

  type Profile {
    email: String!
  }
`;

module.exports = typeDefs;
