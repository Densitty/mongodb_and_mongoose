const mongoose = require("mongoose");
const PostSchema = require("./postSchema");

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
  posts: [PostSchema],
  blogPosts: [{ type: Schema.Types.ObjectId, ref: "blogPost" }],
  likes: Number,
});

// a virtual field on a model
FriendSchema.virtual("postCount").get(function () {
  // console.log(this._doc.posts.length);
  return this.posts.length;
});

// create a model from the schema
const Friend = mongoose.model("friend", FriendSchema);

module.exports = Friend;
