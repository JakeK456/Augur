const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../util/auth");
const { dateScalar } = require("./customScalars");
const fetch = require("node-fetch");
const moment = require("moment");
require("dotenv").config();

const resolvers = {
  Date: dateScalar,
  Query: {
    me: async (parent, args, ctx) => {
      // if ctx.user is undefined, then no token or an invalid token was
      // provided by the client.
      if (!ctx.user) {
        throw new AuthenticationError("Must be logged in.");
      }
      return User.findOne({ email: ctx.user.email });
    },
    ticker: async (parent, args) => {
      const { ticker } = args;
      const tMonthAgo = moment().subtract(1, "months").format("YYYY-MM-DD");
      const tCurrent = moment().format("YYYY-MM-DD");
      const pgUrl = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${tMonthAgo}/${tCurrent}?adjusted=true&sort=asc&apiKey=${process.env.PG_KEY}`;

      const response = await fetch(pgUrl);
      const rawdata = await response.json();

      let x = [];
      let y = [];

      rawdata.results.forEach((obj) => {
        y.push(obj.c);
        x.push(obj.t);
      });

      const data = {
        ticker,
        x,
        y,
      };

      return data;
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      try {
        const user = await User.create({ ...args });
        const token = await signToken(user);
        return { user, token };
      } catch (error) {
        if (error.name === "MongoError" && error.code === 11000) {
          const [[key, value]] = Object.entries(error.keyValue);
          throw new UserInputError(`${key} "${value}" already exists.`);
        }
        throw error;
      }
    },
    login: async (parent, args) => {
      const { email, password } = args;
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Invalid username or password");
      }
      const authentic = await user.isCorrectPassword(password);
      if (!authentic) {
        throw new AuthenticationError("Invalid username or password");
      }
      const token = await signToken(user);
      user.lastLogin = Date.now();
      await user.save();
      return { token, user };
    },
  },
};

module.exports = resolvers;
