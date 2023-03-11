import { IUser } from "../../models/protocols";

export interface ILoginUser {
  password: string;
  email: string;
}

export interface ILoginUserRepository {
  login(email: string): Promise<IUser>;
}
