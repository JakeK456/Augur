const { Schema, model } = require("mongoose");

const profilePictureSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  url: {
    type: String,
    default: null,
  },
});

const ProfilePicture = model("ProfilePicture", profilePictureSchema);

module.exports = ProfilePicture;
