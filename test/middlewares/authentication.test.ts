import { User } from "../../src/server/models/mongo-models/User";
import { serverTest } from "../jest.setup";

describe("authentication middlewares", () => {
  const user = {
    email: "",
    token: "",
  };

  beforeEach(async () => {
    const createUser = await serverTest.post("/v1/users").send({
      name: "test10",
      password: "123",
      email: "test6@gmail.com",
    });

    user.email = createUser.body.email;

    const loginUser = await serverTest.post("/v1/login").send({
      password: "123",
      email: user.email,
    });

    user.token = loginUser.body;
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  it("shuold returns status code 201 with a currency transition", async () => {
    const { statusCode, body } = await serverTest
      .post("/v1/transition")
      .set({});

    expect(statusCode).toBe(401);
    expect(body).toEqual({ error: "not authenticated" });
  });

  it("shuold returns status code 201 with a currency transition", async () => {
    const { statusCode, body } = await serverTest
      .post("/v1/transition")
      .set({ Authorization: `${user.token}` });

    expect(statusCode).toBe(401);
    expect(body).toEqual({ error: "User not logged in, add a type" });
  });

  it("shuold returns status code 201 with a currency transition", async () => {
    const { statusCode, body } = await serverTest
      .post("/v1/transition")
      .set({ Authorization: `Bearer` });

    expect(statusCode).toBe(401);
    expect(body).toEqual({ error: "User not logged in, add a token" });
  });

  it("shuold returns status code 201 with a currency transition", async () => {
    const { statusCode, body } = await serverTest
      .post("/v1/transition")
      .set({ Authorization: `Bearer ${1233}` });

    expect(statusCode).toBe(500);
    expect(body).toEqual({ error: "jwt malformed" });
  });
});
