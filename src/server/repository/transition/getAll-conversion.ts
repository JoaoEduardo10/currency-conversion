import { IGetAllConversionRepository } from "../../controller/transition/protocols";
import { Transition } from "../../models/mongo-models/Transition";
import { TOmitDestinationValue } from "../../types/globals-types";

export class MongoGetAllConversionRepositor
  implements IGetAllConversionRepository
{
  async getAll(userId: string): Promise<TOmitDestinationValue[]> {
    const transition = await Transition.find({}).where("userId").equals(userId);

    return transition.map(
      ({
        _id,
        acheat_at,
        conversionRate,
        destinationCurrency,
        origintionCurrency,
        originValue,
        userId: newUserId,
      }) => ({
        id: _id.toHexString(),
        acheat_at,
        conversionRate,
        destinationCurrency,
        origintionCurrency,
        originValue,
        userId: newUserId,
      })
    );
  }
}
