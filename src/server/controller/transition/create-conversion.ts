import { ITransition } from "../../models/protocols";
import { IController, IRequest, IResponse } from "../protocols";
import { ICreateConversionRepository } from "./protocols";

export class CreateCoversionController implements IController {
  constructor(
    private readonly createCoversionRepository: ICreateConversionRepository
  ) {}

  async handle(
    req: IRequest<Omit<ITransition, "id">>
  ): Promise<IResponse<ITransition>> {
    const { destinationValue } = req.body;

    const transition = await this.createCoversionRepository.create({
      conversionRate: req.body.conversionRate,
      destinationCurrency: req.body.destinationCurrency,
      origintionCurrency: req.body.origintionCurrency,
      originValue: req.body.originValue,
      userId: req.body.userId as string,
    });

    const {
      acheat_at,
      conversionRate,
      destinationCurrency,
      id,
      originValue,
      origintionCurrency,
      userId,
    } = transition;

    return {
      body: {
        id,
        userId,
        origintionCurrency,
        originValue,
        destinationValue,
        destinationCurrency,
        conversionRate,
        acheat_at,
      },
      statusCode: 201,
    };
  }
}
