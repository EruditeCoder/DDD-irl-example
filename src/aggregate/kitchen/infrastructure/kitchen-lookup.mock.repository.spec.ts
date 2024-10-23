import { KitchenLookupMockRepository } from "./kitchen-lookup.mock.repository";

const kitchenLookupRepository = new KitchenLookupMockRepository();

describe(`${KitchenLookupMockRepository.name}`, () => {
  describe(`${KitchenLookupMockRepository.prototype.getKitchenById.name}`, () => {
    describe(`when a kitchen is found`, () => {
      it('should return a valid kitchen object', async () => {
        const result = await kitchenLookupRepository.getKitchenById('lookupWithFoundKitchen');

        expect(result.isSuccess).toBeTruthy()
      });
    });

    describe(`when a kitchen is not found`, () => {
      it('should return a 404 api error', async () => {
        const result = await kitchenLookupRepository.getKitchenById('not found');

        expect(result.isSuccess).toBeFalsy();
      });
    });
  })
});
