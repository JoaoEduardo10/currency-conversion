import { Transition } from "../../../src/server/models/mongo-models/Transition";
import { MongoCreateConversionRepository } from "../../../src/server/repository/transition/create-conversion";

describe("create-conversion repositpory", () => {
  afterEach(async () => {
    await Transition.deleteMany();
  });

  it("should returns a transition", async () => {
    const repositpory = await new MongoCreateConversionRepository().create({
      conversionRate: 1.5,
      destinationCurrency: "BRL",
      origintionCurrency: "EUR",
      originValue: 20,
      userId: "123",
    });

    expect(repositpory.destinationCurrency).toBe("BRL");
    expect(repositpory.userId).toBe("123");
    expect(typeof repositpory.id).toBe("string");
    expect(repositpory.acheat_at).toBeTruthy();
    expect(repositpory.conversionRate).toBeTruthy();
    expect(repositpory.originValue).toBeTruthy();
    expect(repositpory.origintionCurrency).toBeTruthy();
  }, 10000);
});
