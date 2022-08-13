const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create a schema of friends
const FriendSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    validate: {
      validator: (name) => name.length >= 3,
      message: "Name is required and must be at least 3 characters long.",
    },
  },
  postCount: Number,
});

// create a model from the schema
const Friend = mongoose.model("friend", FriendSchema);

module.exports = Friend;
