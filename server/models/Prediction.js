const { Schema, model } = require("mongoose");

const predictionSchema = new Schema({
  ticker: {
    type: String,
    required: true,
  },
  coordinates: { type: Array, default: [] },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Prediction = model("Prediction", predictionSchema);

module.exports = Prediction;
