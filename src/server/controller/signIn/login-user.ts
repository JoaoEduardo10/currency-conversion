import { createJwt } from "../../helpers/jsonWebToken";
import { IController, IRequest, IResponse } from "../protocols";
import { ILoginUser, ILoginUserRepository } from "./protocols";

export class LoginUserController implements IController {
  constructor(private readonly loginUserRepository: ILoginUserRepository) {}

  async handle(req: IRequest<ILoginUser>): Promise<IResponse<string>> {
    const { email } = req.body!;

    const user = await this.loginUserRepository.login(email);

    const token = createJwt({ id: user.id });

    return {
      body: token,
      statusCode: 200,
    };
  }
}
