/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUser } from "../../models/protocols";
import { TOmitPassword } from "../../types/globals-types";
import { IController, IRequest, IResponse } from "../protocols";
import { ICreateUserParams, ICreateUserRepository } from "./protocols";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    req: IRequest<ICreateUserParams>
  ): Promise<IResponse<TOmitPassword<IUser>>> {
    const { email, name, password } = req.body!;

    const user = await this.createUserRepository.create({
      email,
      name,
      password,
    });

    const { password: _passowrdCreated, ...newUser } = user;

    return {
      body: newUser,
      statusCode: 201,
    };
  }
}
