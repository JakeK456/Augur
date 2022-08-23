const { gql } = require("apollo-server-express");

const typeDefs = gql`
  "Unix time stamp in milliseconds."
  scalar Date

  type Query {
    "Find the logged in user."
    me: User
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
`;

module.exports = typeDefs;
