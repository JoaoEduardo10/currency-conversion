import { RequestHandler } from "express";
import { ICreateUserParams } from "../../controller/signUp/protocols";
import { Bad_Request } from "../../helpers/api-error";
import validator from "validator";
import { User } from "../../models/mongo-models/User";
import { createPassowrdHash } from "../../helpers/bcrypt";

export const createUserMiddleware: RequestHandler<
  {},
  {},
  ICreateUserParams
> = async (req, _res, next) => {
  const { email, name, password } = req.body;

  if (!email) {
    throw new Bad_Request("add one email");
  }

  if (!name) {
    throw new Bad_Request("add one name");
  }

  if (!password) {
    throw new Bad_Request("add one password");
  }

  const validateEmail = validator.isEmail(email);

  if (!validateEmail) {
    throw new Bad_Request("Invalid email format!");
  }

  const user = await User.findOne({ email });

  if (user) {
    throw new Bad_Request("Email already registered");
  }

  const newPassword = await createPassowrdHash(password);

  req.body.password = newPassword;

  next();
};
