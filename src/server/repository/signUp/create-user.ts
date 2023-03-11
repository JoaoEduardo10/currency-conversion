import {
  ICreateUserParams,
  ICreateUserRepository,
} from "../../controller/signUp/protocols";
import { User } from "../../models/mongo-models/User";
import { IUser } from "../../models/protocols";

export class MongoCreateUserRepository implements ICreateUserRepository {
  async create(params: ICreateUserParams): Promise<IUser> {
    const user = await User.create({ ...params });

    const { _id, name, password, email } = user!;

    return { id: _id.toHexString(), name, password, email };
  }
}
