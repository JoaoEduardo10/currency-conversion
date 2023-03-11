import { IUser } from "../../models/protocols";

export interface ICreateUserParams {
  name: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  create(params: ICreateUserParams): Promise<IUser>;
}
