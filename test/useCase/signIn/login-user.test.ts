import { User } from "../../../src/server/models/mongo-models/User";
import { serverTest } from "../../jest.setup";

const user = {
  email: "",
};

describe("login-user useCase", () => {
  beforeEach(async () => {
    const createUser = await serverTest.post("/v1/users").send({
      email: "test@gmail.com",
      password: "122",
      name: "test4e",
    });

    user.email = createUser.body.email;
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  it("should status code 200 with a vaid token", async () => {
    const { body, statusCode } = await serverTest
      .post("/v1/login")
      .send({ email: "test@gmail.com", password: "122" });

    expect(statusCode).toBe(200);
    expect(body).toBeTruthy();
  }, 30005);
});
