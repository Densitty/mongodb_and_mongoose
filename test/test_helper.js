const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// connect to mongodb server one time, and not before each test is run
before((done) => {
  // setup and make connection to the mongodb server
  mongoose.connect("mongodb://localhost:27017/friends_test", {
    useMongoClient: true,
  });

  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", (err) => console.log("Warning: ", err));
});

beforeEach((done) => {
  const { friends, comments, blogposts } = mongoose.connection.collections;
  friends.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
