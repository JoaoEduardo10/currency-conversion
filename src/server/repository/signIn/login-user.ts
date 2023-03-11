import { ILoginUserRepository } from "../../controller/signIn/protocols";
import { User } from "../../models/mongo-models/User";
import { IUser } from "../../models/protocols";

export class MongoLoginUserRepository implements ILoginUserRepository {
  async login(email: string): Promise<IUser> {
    const user = await User.findOne({ email });

    const { _id, name, password, email: newEmail } = user!;

    return { id: _id.toHexString(), name, password, email: newEmail };
  }
}
