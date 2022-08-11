const assert = require("assert");
const Friend = require("../src/friend");

describe("Deleting a friend document", () => {
  let joe;

  beforeEach((done) => {
    joe = new Friend({ name: "Joe" });
    joe.save().then(() => done());
  });

  it("model instance remove", (done) => {
    joe
      .remove()
      .then(() => {
        Friend.findOne({ name: "Joe" });
      })
      .then((user) => {
        // console.log(user);
        assert(user === undefined);
        done();
      });
  });

  it("class method remove", (done) => {
    Friend.remove({ name: "Joe" })
      .then(() => {
        Friend.findOne({ name: "Joe" });
      })
      .then((user) => {
        assert(user === undefined);
        done();
      });
  });

  it("class method findOneAndRemove", (done) => {
    Friend.findOneAndRemove({ name: "Joe" })
      .then(() => {
        Friend.findOne({ name: "Joe" });
      })
      .then((user) => {
        assert(user === undefined);
        done();
      });
  });

  it("class method findByIdAndRemove", (done) => {
    Friend.findByIdAndRemove({ _id: joe._id })
      .then(() => {
        Friend.findOne({ name: "Joe" });
      })
      .then((user) => {
        assert(user === undefined);
        done();
      });
  });
});
