const assert = require("assert");
const Friend = require("../src/friend");

describe("Test to create a friend", () => {
  // saving a friend to the db test
  it("saves a friend", (done) => {
    // create an instance
    const friendJoe = new Friend({ name: "Joe" });
    // save the instace doc in db
    friendJoe.save().then(() => {
      // run an assertion here to check whether friendJoe is new or not
      // if isNew is false, it means the doc has been saved to db
      assert(!friendJoe.isNew);
      done();
    });
  });
});
