import { RequestHandler } from "express";
import { ILoginUser } from "../../controller/signIn/protocols";
import { Not_Fould } from "../../helpers/api-error";
import { validatePassowdHash } from "../../helpers/bcrypt";
import { User } from "../../models/mongo-models/User";

export const loginUserMiddleware: RequestHandler<{}, {}, ILoginUser> = async (
  req,
  res,
  next
) => {
  const { email, password } = req.body;

  if (!email) {
    throw new Not_Fould("Add a email");
  }

  if (!password) {
    throw new Not_Fould("Add a password");
  }

  const validateEmail = await User.findOne({ email });

  if (!validateEmail) {
    throw new Not_Fould("Invalid email");
  }

  const checkingPassword = await validatePassowdHash(
    password,
    validateEmail.password
  );

  if (!checkingPassword) {
    throw new Not_Fould("Invalid password");
  }

  next();
};
