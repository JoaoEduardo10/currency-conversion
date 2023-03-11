import { CreateUserController } from "../../../src/server/controller/signUp/create-user";
import {
  ICreateUserParams,
  ICreateUserRepository,
} from "../../../src/server/controller/signUp/protocols";
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

class MockCreateRepository implements ICreateUserRepository {
  async create(params: ICreateUserParams): Promise<IUser> {
    const { email, name, password } = params;

    return { id: "123", email, name, password };
  }
}

describe("create-user controller", () => {
  it("shuold returns a user created from the createRepository without the password and status code 201", async () => {
    const repository = new MockCreateRepository();

    const controller = new CreateUserController(repository);

    const { body, statusCode } = await controller.handle(mockReq);

    expect(statusCode).toBe(201);
    expect(body.email).toBe(mockReq.body.email);
    expect(typeof body.id).toBe("string");
    expect(body.name).toBe(mockReq.body.name);
  });
});
