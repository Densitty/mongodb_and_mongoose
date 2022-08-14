const { doesNotMatch } = require("assert");
const assert = require("assert");
const Friend = require("../src/friendSchema");

describe("Validating records", () => {
  it("friend requires a name", (done) => {
    const friend = new Friend({ name: undefined });
    const validationResult = friend.validateSync();
    // console.log("-----");
    // console.log(validationResult.errors.name.properties.message);
    const { message } = validationResult.errors.name.properties;

    assert(message === "Name is required.");
    done();
  });

  it("friend's name requires at least 3 characters long", (done) => {
    const friend = new Friend({ name: "Ky" });
    const validationResult = friend.validateSync();
    const { message } = validationResult.errors.name.properties;
    assert(
      message === "Name is required and must be at least 3 characters long."
    );
    done();
  });

  it("disallows invalid document from being saved", (done) => {
    const friend = new Friend({ name: "Ky" });

    friend
      .save()
      .then()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name.properties;
        assert(
          message === "Name is required and must be at least 3 characters long."
        );
        done();
      });
  });
});
