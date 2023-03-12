import { User } from "../../../src/server/models/mongo-models/User";
import { Transition } from "../../../src/server/models/mongo-models/Transition";
import { serverTest } from "../../jest.setup";

describe("create-conversion useCase", () => {
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
    await Transition.deleteMany();
  });

  it("shuold returns status code 201 with a currency transition", async () => {
    const { statusCode, body } = await serverTest
      .post("/v1/transition")
      .set({ Authorization: `Bearer ${user.token}` })
      .send({
        originValue: 30,
        destinationCurrency: "BRL",
        origintionCurrency: "EUR",
      });

    expect(statusCode).toBe(201);
    expect(body).toBeTruthy();
  }, 20001);
});
