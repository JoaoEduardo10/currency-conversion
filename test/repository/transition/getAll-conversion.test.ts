import { Transition } from "../../../src/server/models/mongo-models/Transition";
import { User } from "../../../src/server/models/mongo-models/User";
import { MongoGetAllConversionRepositor } from "../../../src/server/repository/transition/getAll-conversion";
import { serverTest } from "../../jest.setup";

describe("create-conversion repositpory", () => {
  const user = {
    userId: "",
  };

  beforeEach(async () => {
    const createUser = await serverTest.post("/v1/users").send({
      email: "teste4@gmail.com",
      name: "test",
      password: "123",
    });

    user.userId = createUser.body.id;
  });

  afterEach(async () => {
    await User.deleteMany();
    await Transition.deleteMany();
  });

  it("should returns a transition", async () => {
    const repositpory = await new MongoGetAllConversionRepositor().getAll(
      user.userId
    );

    expect(repositpory).toBeTruthy();
  }, 10000);
});
