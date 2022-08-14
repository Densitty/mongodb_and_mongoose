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

  it("Can add a subdocument to an existing document", (done) => {
    // create the parent document
    const joe = new Friend({ name: "Joe", posts: [] });
    // persist to db and then fetch from the db and add sub-document
    joe
      .save()
      .then(() => {
        return Friend.findOne({ name: "Joe" });
      })
      .then((friend) => {
        friend._doc.posts.unshift({
          title: "Under the Hidden Shadow",
        });
        // then persist the subdoc by saving the
        return friend.save();
      })
      .then(() => {
        return Friend.findOne({ name: "Joe" });
      })
      .then((friend) => {
        // console.log(friend._doc.posts[0]._doc);
        assert(friend._doc.posts[0]._doc.title === "Under the Hidden Shadow");
        done();
      });
  });

  it("Remove existing nested document in a document", (done) => {
    const joe = new Friend({
      name: "Joe",
      posts: [{ title: "Alice in Brabey" }],
    });

    joe
      .save()
      .then(() => {
        return Friend.findOne({ name: "Joe" });
      })
      .then((friend) => {
        // console.log(friend._doc.posts[0]);
        const post = friend._doc.posts[0];
        post.remove();

        return friend.save();
      })
      .then(() => {
        return Friend.findOne({ name: "Joe" });
      })
      .then((friend) => {
        assert(friend._doc.posts.length === 0);
        done();
      });
  });
});
