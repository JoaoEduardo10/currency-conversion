import { User } from "../../../src/server/models/mongo-models/User";
import { MongoCreateUserRepository } from "../../../src/server/repository/signUp/create-user";

export const createUser = {
  name: "test",
  email: "test",
  password: "test@gmail.com",
};

describe("create-user Repository", () => {
  afterEach(async () => {
    await User.deleteMany();
  });

  it("should return a created user", async () => {
    const repository = await new MongoCreateUserRepository().create({
      ...createUser,
    });

    expect(typeof repository.id).toBe("string");
    expect(repository.email).toBe(createUser.email);
    expect(repository.name).toBe(createUser.name);
    expect(repository.password).toBe(createUser.password);
  });
});
