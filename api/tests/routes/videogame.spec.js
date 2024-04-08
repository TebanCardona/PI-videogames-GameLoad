const request = require("supertest");
const { expect } = require("chai");
const app = require("../../src/app.js");
const session = require("supertest-session");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app);
const videogame = {
  name: "Super Mario Bros",
  description: "asd",
  platforms: [],
};
describe("Videogame routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Videogame.sync({ force: true }).then(() => Videogame.create(videogame))
  );
  describe("GET /videogames", () => {
    it("/Get. Should 200 or 201", (done) => {
      agent.get("/videogames").expect(200).end(done());
    });
    it("/Post. Should 201 when all info have", (done) => {
      agent
        .post("/videogames")
        .send({
          name: "asd",
          description: "pa tu pa",
          platforms: ["asd"],
          genres: ["qhubo pa"],
        })
        .expect(201)
        .end(done());
    });
    it("/Post. Should 404 when nothing info have ", (done) => {
      agent.post("/videogames").send({}).expect(404).end(done());
    });
  });
});

describe("Routes Genres", () => {
  it("Should 200 get", (done) => {
    agent.get("/genres").expect(200).end(done());
  });
});

describe("Routes Platforms", () => {
  it("Should 200 get", () => {
    agent.get("/platforms").expect(200).end(done());
  });
});
