const assert = require("assert");
const Friend = require("../src/friendSchema");

describe("Virtual types", () => {
  it("postCount returns the number of posts", (done) => {
    const joe = new Friend({
      name: "Joe",
      posts: [{ title: "Dancing Forest" }],
    });

    joe
      .save()
      .then(() => Friend.findOne({ name: "Joe" }))
      .then((friend) => {
        // console.log(friend.postCount);
        assert(friend.postCount === 1);
        done();
      });
  });
});
