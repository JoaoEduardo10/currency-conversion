import { RequestHandler } from "express";
import { IsItRecordAndNotAny } from "mongoose";
import { IRequest } from "../../controller/protocols";
import { CreateCoversionController } from "../../controller/transition/create-conversion";
import { ITransition } from "../../models/protocols";
import { MongoCreateConversionRepository } from "../../repository/transition/create-conversion";
import { TOmitId } from "../../types/globals-types";

export const createConversion: RequestHandler = async (req, res) => {
  const mongoCreateCoversionRepository = new MongoCreateConversionRepository();

  const createCoversionController = new CreateCoversionController(
    mongoCreateCoversionRepository
  );

  const { body, statusCode } = await createCoversionController.handle(
    req as IRequest<TOmitId<ITransition>>
  );

  res.status(statusCode).json(body);
};
