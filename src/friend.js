const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create a schema of friends
const FriendSchema = new Schema({
  name: String,
});

// create a model from the schema
const Friend = mongoose.model("friend", FriendSchema);

module.exports = Friend;
