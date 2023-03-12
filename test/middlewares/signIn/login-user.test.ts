import { createPassowrdHash } from "../../../src/server/helpers/bcrypt";
import { User } from "../../../src/server/models/mongo-models/User";
import { serverTest } from "../../jest.setup";

describe("login-user middleware", () => {
  const user = {
    password: "",
    email: "",
    id: "",
  };

  beforeEach(async () => {
    const body = await User.create({
      name: "test3",
      email: "test3@gmail.com",
      password: await createPassowrdHash("123"),
    });

    user.email = body.email;
    user.password = body.password;
    user.id = body.id;
  });

  afterEach(async () => {
    await User.findByIdAndDelete(user.id);
  });

  it("should an error for not sending the email with status 401", async () => {
    const { body, statusCode } = await serverTest
      .post("/v1/login")
      .send({ password: "123" });

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "Add a email" });
  });

  it("should an error for not sending the password with status 401", async () => {
    const { body, statusCode } = await serverTest
      .post("/v1/login")
      .send({ email: user.email });

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "Add a password" });
  });

  it("should an error for not sending the password with status 401", async () => {
    const { body, statusCode } = await serverTest
      .post("/v1/login")
      .send({ email: user.email });

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "Add a password" });
  });

  it("should an error for not finding the email the with status 401", async () => {
    const { body, statusCode } = await serverTest
      .post("/v1/login")
      .send({ email: "error@gmail.com", password: "123" });

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "Invalid email" });
  });

  it("should an error for sending the wrong email with status 401", async () => {
    const { body, statusCode } = await serverTest
      .post("/v1/login")
      .send({ email: user.email, password: "124" });

    expect(statusCode).toBe(404);
    expect(body).toEqual({ error: "Invalid password" });
  });
});
