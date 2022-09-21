const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { User, Prediction } = require("../models");
const { signToken } = require("../util/auth");
const { dateScalar } = require("./customScalars");
const fetch = require("node-fetch");
const moment = require("moment");
require("dotenv").config();
const { convertLabelToTimeSpan, setLineColor } = require("../util/graph");
const ProfilePicture = require("../models/ProfilePicture");

const TIME_SPAN_MULTIPLIER = 4;

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
      const { ticker, timeSpan } = args;

      if (ticker === "") {
        throw new UserInputError(`Input cannot be empty string.`);
      }

      try {
        const { multiplier, time, subtract, span } =
          convertLabelToTimeSpan(timeSpan);
        const tAgo = moment().subtract(subtract, span).format("YYYY-MM-DD");
        const tCurrent = moment().format("YYYY-MM-DD");
        const pgUrl = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/${multiplier}/${time}/${tAgo}/${tCurrent}?adjusted=true&sort=asc&apiKey=${process.env.PG_KEY}`;
        const response = await fetch(pgUrl);
        const rawdata = await response.json();

        if (response.status === 429) {
          throw new Error(
            "API call limited to 5 calls per minute... please wait."
          );
        }

        let x = [];
        let y = [];
        let coords = [];

        rawdata.results.forEach((obj) => {
          x.push(obj.t);
          y.push(obj.c);
          coords.push({ x: obj.t, y: obj.c });
        });

        const graphData = {
          ticker,
          datasets: [
            { data: coords, borderColor: setLineColor(y), borderDash: [] },
            {
              data: [coords[coords.length - 1]],
              borderColor: "#a7a7a7", // grey
              borderDash: [5, 5],
            },
          ],
        };

        return graphData;
      } catch (error) {
        throw error;
      }
    },
    numPredictions: async (parent, args, ctx) => {
      if (!ctx.user) {
        throw new AuthenticationError("Must be logged in.");
      }
      const count = await Prediction.countDocuments({ userId: ctx.user._id });
      return { numPredictions: count };
    },
    cards: async (parent, args, ctx) => {
      const predictions = await Prediction.find({
        userId: ctx.user._id,
        ticker: args.ticker,
      })
        .sort({ createdAt: -1 })
        .limit(12);
      const retval = predictions.map((prediction) => ({
        predictionId: prediction._id,
        ticker: prediction.ticker,
        startDate: prediction.createdAt,
        endDate: prediction.coordinates[prediction.coordinates.length - 1].x,
      }));
      return retval;
    },
    // TODO!!!! MAKE SURE PREDICTION.LENGTH > 1 !!!
    displayGraph: async (parent, args, ctx) => {
      const prediction = await Prediction.findById(args.predictionId);
      const predictionStart = prediction.coordinates[0].x;
      const predictionEnd =
        prediction.coordinates[prediction.coordinates.length - 1].x;
      const timeDiff = predictionEnd - predictionStart;
      const timeSpan = timeDiff * TIME_SPAN_MULTIPLIER;

      const tStart = moment(predictionEnd)
        .subtract(timeSpan, "milliseconds")
        .format("YYYY-MM-DD");
      const tEnd = moment(predictionEnd).format("YYYY-MM-DD");
      const multiplier = 1;
      const time = "day";
      const pgUrl = `https://api.polygon.io/v2/aggs/ticker/${prediction.ticker}/range/${multiplier}/${time}/${tStart}/${tEnd}?adjusted=true&sort=asc&apiKey=${process.env.PG_KEY}`;

      const response = await fetch(pgUrl);
      const rawdata = await response.json();

      let x = [];
      let y = [];
      let coords = [];

      rawdata.results.forEach((obj) => {
        x.push(obj.t);
        y.push(obj.c);
        coords.push({ x: obj.t, y: obj.c });
      });

      const graphData = {
        ticker: "test",
        datasets: [
          { data: coords, borderColor: setLineColor(y), borderDash: [] },
          {
            data: prediction.coordinates,
            borderColor: "#a7a7a7",
            borderDash: [5, 5],
          },
        ],
      };

      return graphData;
    },
    profilePicture: async (parent, args, ctx) => {
      if (!ctx.user) {
        throw new AuthenticationError("Must be logged in.");
      }
      const profilePicture = await ProfilePicture.findOne({
        userId: ctx.user._id,
      });
      return { url: profilePicture.url };
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      console.log(args);
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
    makePrediction: async (parent, args, ctx) => {
      const user = await Prediction.create({ userId: ctx.user._id, ...args });
      return { ...args };
    },
    setProfilePicture: async (parent, args, ctx) => {
      try {
        const { url } = args;
        const query = { userId: ctx.user._id };
        const update = { url };
        const options = { upsert: true };
        await ProfilePicture.findOneAndUpdate(query, update, options);
        return { ...args };
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
