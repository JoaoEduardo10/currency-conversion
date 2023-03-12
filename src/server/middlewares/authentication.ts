import { RequestHandler } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ICreateConversionParams } from "../controller/transition/protocols";
import { Unauthorized } from "../helpers/api-error";
import { IJwt, validateJwt } from "../helpers/jsonWebToken";

export const authentication: RequestHandler<
  {},
  {},
  ICreateConversionParams
> = async (req, _res, next) => {
  const authentication = req.headers.authorization as string;

  const [type, token] = authentication.split(" ");

  if (type != "Bearer") {
    throw new Unauthorized("User not logged in, add a type");
  }

  if (!token) {
    throw new Unauthorized("User not logged in, add a token");
  }

  const newToken = validateJwt(token) as JwtPayload & IJwt;

  req.body.userId = newToken.id as string;

  next();
};
