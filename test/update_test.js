const assert = require("assert");
const Friend = require("../src/friend");

describe("Testing to update a document", () => {
  let joe;

  beforeEach((done) => {
    joe = new Friend({ name: "Joe", postCount: 0 });
    joe.save().then(() => {
      done();
    });
  });

  function assertNameHelperFunc(assertion, name, done) {
    assertion
      .then(() => Friend.find({}))
      .then((friends) => {
        // console.log(friends);
        // test if total docs in collection is 1
        assert(friends.length === 1);
        // test if doc's name field has been changed
        assert(friends[0]._doc.name === name);
        done();
      });
  }

  it("updating by set and save on instance", (done) => {
    // update the ppty/field
    joe.set("name", "Eric");
    // persist to db (use a helper function)
    assertNameHelperFunc(joe.save(), "Eric", done);
    /* joe.save().then(() => {
      // find all docs in the collection
      Friend.find({}).then((friends) => {
        console.log(friends[0]._doc);
        // console.log(friends.length);
        // test if total docs is 1
        assert(friends.length === 1);
        // test if doc's name field has been changed
        assert(friends[0]._doc.name === "Eric");
        done();
      });
    }); */
  });

  it("Updating a doc based on model instance", (done) => {
    // joe.update({ name: "Erica" });
    // joe.save().then(() => {
    //   Friend.find({ name: "Joe" }).then((friends) => {
    //     console.log(friends);
    //   });
    //   done();
    // });
    assertNameHelperFunc(joe.update({ name: "Adrian" }), "Adrian", done);
  });

  it("A model class can update", (done) => {
    assertNameHelperFunc(
      Friend.update({ name: "Joe" }, { name: "Alday" }),
      "Alday",
      done
    );
  });

  it("A model class can update one record", (done) => {
    assertNameHelperFunc(
      Friend.updateOne({ name: "Joe" }, { name: "Felix" }),
      "Felix",
      done
    );
  });

  it("A model class can find a doc by Id and update", (done) => {
    assertNameHelperFunc(
      Friend.findByIdAndUpdate(joe._id, { name: "Oleg" }),
      "Oleg",
      done
    );
  });

  it("Increment the postCount on friend incremented by 1", (done) => {
    Friend.update({ name: "Joe" }, { $inc: { postCount: 1 } })
      .then(() => {
        console.log(Friend);
        return Friend.findOne({ name: "Joe" });
      })
      .then((friend) => {
        // console.log(friend._doc);
        assert(friend._doc.postCount === 1);
        done();
      });
  });
});
