import { ITransition } from "../models/protocols";

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

// responsible for making the transition

const currencyConversion = async (
  transition: Omit<ITransition, "destinationValue">
) => {
  const chaveKey = process.env.API_KEY as string;

  const myHeaders = new Headers();
  myHeaders.append("apikey", chaveKey);

  const currencyExchange = await fetch(
    `https://api.apilayer.com/exchangerates_data/convert?to={${transition.destinationCurrency}}&from={${transition.origintionCurrency}}&amount={${transition.originValue}}`,
    {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    }
  );

  const data: IApiResponseConversion = await currencyExchange.json();

  transition.conversionRate = Number(data.info.rate.toFixed(2));
  const destinationValue = data.result;

  return { ...transition, destinationValue };
};

export { currencyConversion };
