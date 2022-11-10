const mongoose = require("mongoose");
const PostSchema = require("./postSchema");
const posts = require("./postSchema");

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

// middleware
FriendSchema.pre("remove", function (next) {
  // when a friend is remove, remove all blog posts associated with it
  const BlogPost = mongoose.model("blogPost");

  // console.log(this._doc.blogPosts[0]);

  // in the blogPost model, remove every post whose id matches the id of the of blogPosts found in a user instance we want to remove
  BlogPost.remove({ _id: { $in: this.blogPosts } }).then(() => next());
});

// create a model from the schema
const Friend = mongoose.model("friend", FriendSchema);

module.exports = Friend;
