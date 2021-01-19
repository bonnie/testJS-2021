const request = require("supertest");
const app = require("./server.js");

describe("test server", () => {
  beforeEach(async () => {
    server = await app.listen(4000);
    global.agent = request.agent(server);
  });

  afterEach(async () => {
    await server.close();
  });
  describe("ice cream flavors", () => {
    test("responds with status 200 the GET method", () => {
      return request(server)
        .get("/flavors")
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    });
    test("response has expected number of ice cream flavors, and each has a name and image", () => {
      return request(server)
        .get("/flavors")
        .then((response) => {
          expect(response.body.length).toBe(4);
          response.body.forEach((flavor) => {
            expect(typeof flavor.name).toBe("string");
            expect(typeof flavor.imagePath).toBe("string");
          });
        });
    });
  });
});
