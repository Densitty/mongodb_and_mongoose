const assert = require("assert");
const Friend = require("../src/friendSchema");

describe("Testing subdocuments", () => {
  it("can create a subdocument", (done) => {
    // create a friend with a nested document
    const joe = new Friend({
      name: "Joe",
      posts: [{ title: "My first day at school" }],
    });

    // persist to db
    joe
      .save()
      .then(() => {
        return Friend.findOne({ name: "Joe" });
      })
      .then((friend) => {
        // console.log(friend._doc.posts[0]);
        assert(friend._doc.posts[0].title === "My first day at school");
        done();
      });
  });
});
