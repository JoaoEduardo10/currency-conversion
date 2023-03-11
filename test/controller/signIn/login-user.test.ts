import { LoginUserController } from "../../../src/server/controller/signIn/login-user";
import { ILoginUserRepository } from "../../../src/server/controller/signIn/protocols";
import { IUser } from "../../../src/server/models/protocols";

const mockReq = {
  params: {
    transitionId: "",
  },
  headers: {
    userId: "",
  },
  body: {
    name: "test",
    password: "123",
    email: "test@gmail.com",
  },
};

class MockLoginUserRepository implements ILoginUserRepository {
  async login(email: string): Promise<IUser> {
    return { id: "123", email, name: "test", password: "123" };
  }
}

describe("login-user controller", () => {
  it("should returns status 200 with a token", async () => {
    const repository = new MockLoginUserRepository();

    const controller = new LoginUserController(repository);

    const { body, statusCode } = await controller.handle(mockReq);

    expect(statusCode).toBe(200);
    expect(typeof body).toBe("string");
  });
});
