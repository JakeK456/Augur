const { gql } = require("apollo-server-express");

const typeDefs = gql`
  "Unix time stamp in milliseconds."
  scalar Date

  type Query {
    "Find the logged in user."
    me: User
    ticker(ticker: String!, timeSpan: String!): TickerData
  }

  type Mutation {
    createUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
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
`;

module.exports = typeDefs;
