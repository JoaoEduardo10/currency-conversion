/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from "express";
import { IRequest } from "../../controller/protocols";
import { GetAllConversionController } from "../../controller/transition/getAll-conversion";
import { MongoGetAllConversionRepositor } from "../../repository/transition/getAll-conversion";

export const getAllConversionRouter: RequestHandler = async (req, res) => {
  const mongoGetAllConversionRepository = new MongoGetAllConversionRepositor();

  const getAllConversionController = new GetAllConversionController(
    mongoGetAllConversionRepository
  );

  const { body, statusCode } = await getAllConversionController.handle(
    req as IRequest<any>
  );

  res.status(statusCode).json(body);
};
