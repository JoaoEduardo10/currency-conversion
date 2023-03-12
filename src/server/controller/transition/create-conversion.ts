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
    const {
      conversionRate,
      destinationCurrency,
      originValue,
      origintionCurrency,
    } = req.body!;

    const transition = await this.createCoversionRepository.create({
      conversionRate,
      destinationCurrency,
      origintionCurrency,
      originValue,
      userId: req.body.userId as string,
    });

    return {
      body: { ...req.body, id: transition.id },
      statusCode: 201,
    };
  }
}
