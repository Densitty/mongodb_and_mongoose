const assert = require("assert");
const Friend = require("../src/friendSchema");

describe("Test to read a friend from a db", () => {
  let joe, alice, kunmi, jane, zeb, clye;

  beforeEach((done) => {
    joe = new Friend({ name: "Joe" });
    alice = new Friend({ name: "Alice" });
    kunmi = new Friend({ name: "Kunmi" });
    jane = new Friend({ name: "Jane" });
    zeb = new Friend({ name: "Zeb" });
    clye = new Friend({ name: "Clye" });

    Promise.all([
      joe.save(),
      alice.save(),
      kunmi.save(),
      jane.save(),
      zeb.save(),
      clye.save(),
    ]).then(() => {
      done();
    });
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

  it("can skip and limit the result set", (done) => {
    // when the query is made, skip first 2 result and limit the result got to 2 docs
    Friend.find({})
      .sort({ name: 1 })
      .skip(2)
      .limit(2)
      .then((friends) => {
        // console.log(friends[0].name);
        // console.log(friends[1].name);
        assert(friends.length === 2);
        assert(friends[0].name === "Jane");
        assert(friends[1].name === "Joe");
        done();
      });
  });
});
