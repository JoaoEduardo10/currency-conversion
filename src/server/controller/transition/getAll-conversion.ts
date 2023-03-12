/* eslint-disable @typescript-eslint/no-explicit-any */
import { TOmitDestinationValue } from "../../types/globals-types";
import { IController, IRequest, IResponse } from "../protocols";
import { IGetAllConversionRepository } from "./protocols";

export class GetAllConversionController implements IController {
  constructor(
    private readonly getAllConversionRepository: IGetAllConversionRepository
  ) {}

  async handle(
    req: IRequest<any>
  ): Promise<IResponse<TOmitDestinationValue[]>> {
    const userId = req.headers!.userId!;

    const transition = await this.getAllConversionRepository.getAll(userId);

    return {
      body: transition,
      statusCode: 200,
    };
  }
}
