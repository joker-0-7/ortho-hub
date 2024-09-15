// tests/users.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Users API", () => {
  it("should get all users", async () => {
    /*
    ==> use this params in route to use pagination (/:current/:per).
    ==> send some data to front end about users.
    ==> example returned data {_id, email, firstName, lastName, isVerified, createdAt}
    */
    const response = await request(app)
      .get("/api/v1/users/all/1/10")
      .expect(200);
    expect(response.body.length).toBeLessThanOrEqual(4);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          firstName: expect.any(String),
          lastName: expect.any(String),
          email: expect.any(String),
          isVerified: expect.any(Boolean),
        }),
        expect.not.objectContaining({
          password: expect.anything(),
        }),
      ])
    );
  });

  it("should get user", async () => {
    /*
    ==> use user._id in params to get user
    ==> return all user data to make a many changes exm(updating)
    */
    const response = await request(app)
      .get("/api/v1/users/user/66da0b60bd513eeb31e9e36b")
      .expect(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        firstName: expect.any(String),
        lastName: expect.any(String),
        email: expect.any(String),
        isVerified: expect.any(Boolean),
        isReset: expect.any(Boolean),
        role: expect.any(String),
        subscriptionEnd: expect.any(String),
      })
    );
  });
  it("login user", async () => {
    const user = { email: "obitomedic@gmail.com", password: "123456" };
    const response = await request(app)
      .post("/api/v1/users/login")
      .send(user)
      .expect(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: expect.any(Boolean),
        auth: expect.objectContaining({
          user: expect.objectContaining({
            firstName: expect.any(String),
            lastName: expect.any(String),
            email: expect.any(String),
          }),
          accessToken: expect.any(String),
        }),
      })
    );
  });
});
