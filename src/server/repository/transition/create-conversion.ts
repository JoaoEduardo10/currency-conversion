import {
  ICreateConversionParams,
  ICreateConversionRepository,
} from "../../controller/transition/protocols";
import { Transition } from "../../models/mongo-models/Transition";
import { TOmitDestinationValue } from "../../types/globals-types";

export class MongoCreateConversionRepository
  implements ICreateConversionRepository
{
  async create(
    params: ICreateConversionParams
  ): Promise<TOmitDestinationValue> {
    const transition = await Transition.create({ ...params });

    const {
      _id,
      acheat_at,
      conversionRate,
      destinationCurrency,
      origintionCurrency,
      originValue,
      userId,
    } = transition!;

    return {
      id: _id.toHexString(),
      acheat_at,
      conversionRate,
      destinationCurrency,
      origintionCurrency,
      originValue,
      userId,
    };
  }
}
