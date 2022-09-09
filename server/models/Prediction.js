const { Schema, model } = require("mongoose");

const predictionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  ticker: {
    type: String,
    required: true,
  },
  coordinates: { type: Array, default: [] },
  timeSpan: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
});

const Prediction = model("Prediction", predictionSchema);

module.exports = Prediction;
