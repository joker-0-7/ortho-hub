const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Test all functionality for questions", () => {
  let current = 1;
  let per = 10;
  it("get all questions", async () => {
    /*
    => Get all questions 
      - and use current to current page 
      - and use per to per in page
    => Send some data about questions 
      - [question, sources, subjects]

    */
    const response = await request(app)
      .get(`/api/v1/get-questions/${current}/${per}`)
      .expect(200);
    expect(response.body.length).toBeLessThanOrEqual(per);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          question: expect.any(String),
          sources: expect.any(Array),
          subjects: expect.any(Array),
        }),
        expect.not.objectContaining({
          answers: expect.anything(),
          isFree: expect.anything(),
          correct: expect.anything(),
        }),
      ])
    );
  });
  it("get last 5  questions", async () => {
    const response = await request(app)
      .get("/api/v1/last-questions")
      .expect(200);
    expect(response.body.length).toBeLessThanOrEqual(5);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          question: expect.any(String),
        }),
      ])
    );
  });
  it("should get question", async () => {
    const response = await request(app)
      .get("/api/v1/get-question/66ddafc324fa65460ff31b12")
      .expect(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        question: expect.any(String),
        answers: expect.any(Array),
        explanation: expect.any(String),
        sources: expect.any(Array),
        images: expect.any(Array),
      })
    );
  });
});
