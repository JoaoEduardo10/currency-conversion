import { User } from "../../../src/server/models/mongo-models/User";
import { serverTest } from "../../jest.setup";

describe("create-conversion middleware", () => {
  const user = {
    email: "",
    token: "",
  };

  beforeEach(async () => {
    const createUser = await serverTest.post("/v1/users").send({
      name: "test1",
      password: "123",
      email: "test50@gmail.com",
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

  it("shuold returns return a 400 error for not sending a originValue", async () => {
    const { statusCode, body } = await serverTest
      .post("/v1/transition")
      .set({ Authorization: `Bearer ${user.token}` })
      .send({
        destinationCurrency: "BRL",
        origintionCurrency: "EUR",
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "originValue is required" });
  });

  it("shuold returns return a 400 error for not sending a destinationCurrency", async () => {
    const { statusCode, body } = await serverTest
      .post("/v1/transition")
      .set({ Authorization: `Bearer ${user.token}` })
      .send({
        originValue: 30,
        origintionCurrency: "EUR",
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({ error: "destinationCurrency is required" });
  });

  it("shuold returns return a 400 error for not sending a origintionCurrency", async () => {
    const { statusCode, body } = await serverTest
      .post("/v1/transition")
      .set({ Authorization: `Bearer ${user.token}` })
      .send({
        originValue: 30,
        destinationCurrency: "BRL",
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({
      error: "In origintionCurrency only the EUR is allowed",
    });
  });

  it("shuold returns return a 400 error as destinationCurrency should only have BRL, USD end JP", async () => {
    const { statusCode, body } = await serverTest
      .post("/v1/transition")
      .set({ Authorization: `Bearer ${user.token}` })
      .send({
        originValue: 30,
        destinationCurrency: "TTT",
        origintionCurrenc: "EUR",
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({
      error: "it is allowed to convert to BRL, USD, JPY",
    });
  });

  it("shuold returns return a 400 error as destinationCurrency should only have EUR", async () => {
    const { statusCode, body } = await serverTest
      .post("/v1/transition")
      .set({ Authorization: `Bearer ${user.token}` })
      .send({
        originValue: 30,
        destinationCurrency: "BRL",
        origintionCurrenc: "USD",
      });

    expect(statusCode).toBe(400);
    expect(body).toEqual({
      error: "In origintionCurrency only the EUR is allowed",
    });
  });
});
