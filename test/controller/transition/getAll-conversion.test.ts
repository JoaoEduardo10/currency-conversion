import { IGetAllConversionRepository } from "../../../src/server/controller/transition/protocols";
import { GetAllConversionController } from "../../../src/server/controller/transition/getAll-conversion";
import { TOmitDestinationValue } from "../../../src/server/types/globals-types";

const mockReq = {
  params: {
    transitionId: "",
  },
  headers: {
    userId: "123",
  },
  body: {},
};

class MockGetAllCoversionrepository implements IGetAllConversionRepository {
  async getAll(userId: string): Promise<TOmitDestinationValue[]> {
    return [
      {
        acheat_at: new Date(),
        conversionRate: 2,
        destinationCurrency: "BRL",
        id: userId,
        origintionCurrency: "EUR",
        originValue: 30,
        userId,
      },
    ];
  }
}

describe("create-coversion controller", () => {
  it("shuold returns a transition end status code 201", async () => {
    const repository = new MockGetAllCoversionrepository();

    const controller = new GetAllConversionController(repository);

    const { body, statusCode } = await controller.handle(mockReq);

    expect(statusCode).toBe(200);
    expect(body).toBeTruthy();
    expect(body.length).toBe(1);
  }, 10001);
});
