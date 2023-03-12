import {
  ICreateConversionParams,
  ICreateConversionRepository,
} from "../../../src/server/controller/transition/protocols";
import { CreateCoversionController } from "../../../src/server/controller/transition/create-conversion";
import { TOmitDestinationValue } from "../../../src/server/types/globals-types";
import { IRequest } from "../../../src/server/controller/protocols";
import { ITransition } from "../../../src/server/models/protocols";

const mockReq: IRequest<Omit<ITransition, "id">> = {
  params: {
    transitionId: "",
  },
  headers: {
    userId: "",
  },
  body: {
    conversionRate: 1.5,
    destinationCurrency: "BRL",
    originValue: 22,
    origintionCurrency: "EUR",
    userId: "123",
    destinationValue: 20,
    acheat_at: new Date(),
  },
};

class MockCreateCoversionrepository implements ICreateConversionRepository {
  async create(
    params: ICreateConversionParams
  ): Promise<TOmitDestinationValue> {
    const {
      conversionRate,
      destinationCurrency,
      originValue,
      origintionCurrency,
      userId,
    } = params;

    return {
      acheat_at: new Date(),
      conversionRate,
      destinationCurrency,
      id: userId,
      origintionCurrency,
      originValue,
      userId,
    };
  }
}

describe("create-coversion controller", () => {
  it("shuold returns a transition end status code 201", async () => {
    const repository = new MockCreateCoversionrepository();

    const controller = new CreateCoversionController(repository);

    const { body, statusCode } = await controller.handle(mockReq);

    expect(statusCode).toBe(201);
    expect(body).toBeTruthy();
  }, 10001);
});
