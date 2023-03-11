import { TOmitDestinationValue } from "../../types/globals-types";

export interface ICreateConversionParams {
  origintionCurrency: "EUR";
  destinationCurrency: "BRL" | "USD" | "EUR" | "JPY";
  originValue: number;
  conversionRate: number;
  userId: string;
}

export interface ICreateConversionRepository {
  create(params: ICreateConversionParams): Promise<TOmitDestinationValue>;
}
