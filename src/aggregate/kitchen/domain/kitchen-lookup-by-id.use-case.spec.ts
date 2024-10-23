import { KitchenLookupByIdUseCase } from "./kitchen-lookup-by-id.use-case";
import { KitchenLookupMockRepository } from "../infrastructure/kitchen-lookup.mock.repository";

const kitchenLookupUseCase = new KitchenLookupByIdUseCase(new KitchenLookupMockRepository());

describe(`${KitchenLookupByIdUseCase.name}`, () => {
  describe(`${KitchenLookupByIdUseCase.prototype.execute.name}`, () => {
    describe(`when everything works as expected`, () => {
      it('should return a valid kitchen object', async () => {
        const result = await kitchenLookupUseCase.execute("lookupWithFoundKitchen");

        expect(result.isSuccess).toBeTruthy()
      });
    });
  })
});
