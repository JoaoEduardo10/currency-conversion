import { ITransition } from "../models/protocols";
import fetch, { Headers } from "node-fetch";

export interface IApiResponseConversion {
  info: {
    rate: number;
    timestamp: number;
  };
  query: {
    amount: number;
    from: string;
    to: string;
  };
  result: number;
  success: true;
}

const currencyConversion = async (transition: Omit<ITransition, "id">) => {
  const chaveKey = process.env.API_KEY as string;

  const myHeaders = new Headers();
  myHeaders.append("apikey", chaveKey);

  const currencyExchange = await fetch(
    `https://api.apilayer.com/exchangerates_data/convert?to=${transition.destinationCurrency}&from=${transition.origintionCurrency}&amount=${transition.originValue}`,
    {
      method: "Get",
      redirect: "follow",
      headers: myHeaders as Headers,
    }
  );

  const data: IApiResponseConversion = await currencyExchange.json();

  transition.conversionRate = Number(data.info.rate.toFixed(2));
  const destinationValue = data.result;

  return { ...transition, destinationValue };
};

export { currencyConversion };
