import { RequestHandler } from "express";
import { IRequest } from "../../controller/protocols";
import { LoginUserController } from "../../controller/signIn/login-user";
import { ILoginUser } from "../../controller/signIn/protocols";
import { MongoLoginUserRepository } from "../../repository/signIn/login-user";

export const loginUserRouter: RequestHandler = async (req, res) => {
  const mongoLoginUserRepository = new MongoLoginUserRepository();

  const loginUserController = new LoginUserController(mongoLoginUserRepository);

  const { body, statusCode } = await loginUserController.handle(
    req as IRequest<ILoginUser>
  );

  res.status(statusCode).json(body);
};
