/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const { request } = require("../../src/app.js");
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app);
const videogame = {
  name: "Super Mario Bros",
};

xdescribe("Videogame routes", () => {
  // before(() =>
  //   conn.authenticate().catch((err) => {
  //     console.error("Unable to connect to the database:", err);
  //   })
  // );
  // beforeEach(() =>
  //   Videogame.sync({ force: true }).then(() => Videogame.create(videogame))
  // );
  describe("GET /videogames", () => {
    it("should get 200", () =>
      request(app)
        .get("/videogames")
        .expect("Content-Type", /json/)
        .expect(200, {}, done));
  });
});

// describe("Routes of Videogames", () => {
//   describe("GET /videogames", () => {
//     it("Responds with 200", () => agent.get("/videogames").expect(200));
//   });
// });
// describe("Post /videogame", () => {
//   it("Should be status 200", () =>
//     agent
//       .post("/videogame")
//       .send({
//         name: "asd",
//         image: "asd",
//         description: "asdasdaasd",
//         rating: 1.5,
//         genres: ["Action", "Adventure", "RPG"],
//         platforms: [
//           "Nintendo Switch",
//           "PlayStation 5",
//           "Xbox Series S/X",
//           "Xbox One",
//           "PC",
//           "PlayStation 4",
//         ],
//       })
//       .expect(200));
// });
