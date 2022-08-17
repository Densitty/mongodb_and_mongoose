const mongoose = require("mongoose");
const Friend = require("../src/friendSchema");
const BlogPost = require("../src/blogpostSchema");
const Comment = require("../src/commentSchema");
const assert = require("assert");

describe("Testing Associations", () => {
  // initialize our variables
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new Friend({ name: "Joe" });
    blogPost = new BlogPost({
      title: "A lion!",
      content: "A lion is a wild animal. It has a big head.",
    });
    comment = new Comment({
      content: "It is also regarded as the king of the jungle",
    });

    // associate joe to a blog post, i.e. joe made the post above
    joe._doc.blogPosts.unshift(blogPost);
    blogPost._doc.comments.unshift(comment);
    // associate joe with the comment made
    comment._doc.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() => {
      // console.log(joe._doc);
      done();
    });
  });

  it("saves a relation between a user and a blogpost", (done) => {
    Friend.findOne({ name: "Joe" })
      .populate("blogPosts")
      .then((friend) => {
        // console.log(friend._doc.blogPosts[0]);
        // console.log(friend._doc.blogPosts[0]._doc.comments);
        assert(friend._doc.blogPosts[0].title === "A lion!");
        done();
      });
  });

  it("saves all association relation", (done) => {
    Friend.findOne({ name: "Joe" })
      .populate({
        path: "blogPosts", // load all blogPosts in friend
        populate: {
          path: "comments", // load all comments in each blog in a blogPosts
          model: "comment",
          populate: {
            path: "friend",
            model: "friend",
          },
        },
      })
      .then((friend) => {
        // console.log(friend._doc.blogPosts[0].comments[0]._doc);
        // console.log(friend.blogPosts[0].comments[0]._doc.user.name);
        assert(friend.name === "Joe");
        assert(friend.blogPosts[0].title === "A lion!");
        assert(
          friend.blogPosts[0].comments[0].content ===
            "It is also regarded as the king of the jungle"
        );
        assert(friend.blogPosts[0].comments[0]._doc.user.name === "Joe");
        done();
      });
  });
});
