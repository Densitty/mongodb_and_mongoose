const assert = require("assert");
const Friend = require("../src/friend");

describe("Test to read a friend from a db", () => {
  let joe;

  beforeEach((done) => {
    joe = new Friend({ name: "Joe" });
    joe.save().then(() => done());
  });

  it("find all friends with a name of joe", (done) => {
    Friend.find({ name: "Joe" }).then((users) => {
      // console.log(users);
      // console.log(typeof users[0]._id);
      // console.log(typeof joe._id);
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });

  it("find a friend with a particular id", (done) => {
    Friend.findOne({ _id: joe._id }).then((user) => {
      // console.log(user._doc);
      assert(user.name === "Joe");
      done();
    });
  });
});
