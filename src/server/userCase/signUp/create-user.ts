import { RequestHandler } from "express";
import { IRequest } from "../../controller/protocols";
import { CreateUserController } from "../../controller/signUp/create-user";
import { ICreateUserParams } from "../../controller/signUp/protocols";
import { MongoCreateUserRepository } from "../../repository/signUp/create-user";

export const createUserRouter: RequestHandler = async (req, res) => {
  const mongoCreateUserRepository = new MongoCreateUserRepository();

  const createUserController = new CreateUserController(
    mongoCreateUserRepository
  );

  const { body, statusCode } = await createUserController.handle(
    req as IRequest<ICreateUserParams>
  );

  res.status(statusCode).json(body);
};
