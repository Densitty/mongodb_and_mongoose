const mongoose = require("mongoose");
const assert = require("assert");
const Friend = require("../src/friendSchema");
const BlogPost = require("../src/blogpostSchema");

describe("Middleware", () => {
  let joe, blogPost;

  beforeEach((done) => {
    joe = new Friend({ name: "Joe" });
    blogPost = new BlogPost({
      title: "A lion!",
      content: "A lion is a wild animal. It has a big head.",
    });

    // associate joe to a blog post, i.e. joe made the post above
    joe._doc.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()]).then(() => {
      // console.log(joe._doc);
      done();
    });
  });

  it("users clean up all blogposts on removal of such user", (done) => {
    joe
      .remove()
      .then(() => {
        return BlogPost.count();
      })
      .then((count) => {
        console.log("Blogpost count is " + count);
        assert(count === 0);
        done();
      });
  });
});
