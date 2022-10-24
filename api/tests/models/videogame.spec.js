const { Genre, Videogame, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Videogame model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe("Videogame", () => {
      it("should throw an error if name is null", (done) => {
        Videogame.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name, description and platforms", () => {
        Videogame.create({
          name: "Super Mario Bros",
          description: "asd",
          platforms: [],
        });
      });
    });
  });
  beforeEach(() => Genre.sync({ force: true }));
  describe("Genre", () => {
    it("should throw an error if name is null", (done) => {
      Genre.create({})
        .then(() => done(new Error("It requires a valid name")))
        .catch(() => done());
    });
    it("should work when its a valid name, description and platforms", () => {
      Genre.create({
        name: "Super Mario Bros",
      });
    });
  });
});
