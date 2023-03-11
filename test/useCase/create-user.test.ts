import { User } from "../../src/server/models/mongo-models/User";
import { serverTest } from "../jest.setup";

describe("create-user useCase", () => {
  afterEach(async () => {
    await User.deleteMany();
  });

  it("should a created user and a status code 201", async () => {
    const { body, statusCode } = await serverTest
      .post("/v1/users")
      .send({ name: "test", email: "eduardo@gmail.com", password: "123" });

    expect(statusCode).toBe(201);
    expect(body).toBeTruthy();
  });
});
