const mongoose = require("mongoose");

// setup and make connection to the mongodb server
mongoose.connect("mongodb://localhost/friends_test", { useMongoClient: true });

mongoose.connection
  .once("open", () => console.log("Good to go"))
  .on("error", (err) => console.log("Warning: ", err));
