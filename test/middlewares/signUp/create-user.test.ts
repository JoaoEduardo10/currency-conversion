import { User } from "../../../src/server/models/mongo-models/User";
import { serverTest } from "../../jest.setup";

describe("create-user middleware", () => {
  beforeEach(async () => {
    await User.create({
      name: "test",
      email: "test1@gmail.com",
      password: "123",
    });
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  it("should retun status code 400 for not sending the email", async () => {
    const { statusCode, body } = await serverTest
      .post("/v1/users")
      .send({ name: "test", password: "123" });

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "add one email" });
  });

  it("should retun status code 400 for not sending the name", async () => {
    const { statusCode, body } = await serverTest
      .post("/v1/users")
      .send({ email: "test@gmai.com", password: "123" });

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "add one name" });
  });

  it("should retun status code 400 for not sending the password", async () => {
    const { statusCode, body } = await serverTest
      .post("/v1/users")
      .send({ name: "test", email: "test@gmai.com" });

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "add one password" });
  });

  it("should retun status code 400 by email being invalid", async () => {
    const { statusCode, body } = await serverTest
      .post("/v1/users")
      .send({ name: "test", email: "test", password: "123" });

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "Invalid email format!" });
  });

  it("should retun status code 400 by email already registered", async () => {
    const { statusCode, body } = await serverTest
      .post("/v1/users")
      .send({ name: "test", email: "test1@gmail.com", password: "123" });

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "Email already registered" });
  });
});
