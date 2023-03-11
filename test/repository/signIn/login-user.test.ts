import { User } from "../../../src/server/models/mongo-models/User";
import { MongoLoginUserRepository } from "../../../src/server/repository/signIn/login-user";

const user = {
  email: "",
};

describe("create-user Repository", () => {
  beforeEach(async () => {
    const createUser = await User.create({
      email: "test@gmail.com",
      password: "122",
      name: "test",
    });

    user.email = createUser.email;
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  it("should return a created user", async () => {
    const repository = await new MongoLoginUserRepository().login(user.email);

    expect(typeof repository.id).toBe("string");
    expect(repository.email).toBe(user.email);
    expect(repository.name).toBe("test");
    expect(typeof repository.password).toBe("string");
  });
});
