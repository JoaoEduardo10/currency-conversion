import { RequestHandler } from "express";
import { Bad_Request } from "../../helpers/api-error";
import { currencyConversion } from "../../helpers/currencyConverter";
import { ITransition } from "../../models/protocols";
import { TOmitId } from "../../types/globals-types";

export const createCoversionMiddlware: RequestHandler<
  {},
  {},
  TOmitId<ITransition>
> = async (req, _res, next) => {
  const { destinationCurrency, originValue, origintionCurrency } = req.body;

  if (!originValue) {
    throw new Bad_Request("originValue is required");
  }

  if (!destinationCurrency) {
    throw new Bad_Request("destinationCurrency is required");
  }

  if (!["BRL", "USD", "JPY"].includes(destinationCurrency)) {
    throw new Bad_Request("it is allowed to convert to BRL, USD, JPY");
  }

  if (!["EUR"].includes(origintionCurrency)) {
    throw new Bad_Request("In origintionCurrency only the EUR is allowed");
  }

  if (!origintionCurrency) {
    throw new Bad_Request("origintionCurrency is required");
  }

  const transition = await currencyConversion(req.body);

  req.body = { ...transition };

  next();
};
