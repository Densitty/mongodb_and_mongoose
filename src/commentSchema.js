const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: String,
  writer: {
    type: Schema.Types.ObjectId,
    ref: "friend",
  },
});

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;
