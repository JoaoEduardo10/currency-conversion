import { User } from "../../../src/server/models/mongo-models/User";
import { Transition } from "../../../src/server/models/mongo-models/Transition";
import { serverTest } from "../../jest.setup";

describe("getAll useCase", () => {
  const user = {
    email: "",
    token: "",
  };

  beforeEach(async () => {
    const createUser = await serverTest.post("/v1/users").send({
      name: "test20",
      password: "123",
      email: "test500@gmail.com",
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
    await Transition.deleteMany();
  });

  it("shuold returns status code 200 with a currency transition", async () => {
    const { statusCode, body } = await serverTest
      .get("/v1/transition")
      .set({ Authorization: `Bearer ${user.token}` });

    expect(statusCode).toBe(200);
    expect(body).toBeTruthy();
  }, 30000);
});
