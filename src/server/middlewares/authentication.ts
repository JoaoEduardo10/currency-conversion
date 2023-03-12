import { RequestHandler } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Unauthorized } from "../helpers/api-error";
import { IJwt, validateJwt } from "../helpers/jsonWebToken";
import { ITransition } from "../models/protocols";
import { TOmitId } from "../types/globals-types";

export const authentication: RequestHandler<
  {},
  {},
  TOmitId<ITransition>
> = async (req, _res, next) => {
  const authentication = req.headers.authorization as string;

  if (!authentication) {
    throw new Unauthorized("not authenticated");
  }

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
