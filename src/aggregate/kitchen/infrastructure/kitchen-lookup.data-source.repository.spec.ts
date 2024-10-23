import { KitchenLookupDataSourceRepository } from "./kitchen-lookup.data-source.repository";
import { MongoDBClient } from '../../../utils/mongodb-client';
import { Result } from "../../../utils/shared/result";
import { Types } from "mongoose";
import { ApiError } from "../../../utils/shared/api-error";

const spyRetrieveKitchenById = jest.spyOn(MongoDBClient.prototype, 'retrieveKitchenById');

const kitchenLookupRepository = new KitchenLookupDataSourceRepository();

describe(`${KitchenLookupDataSourceRepository.name}`, () => {
  describe(`${KitchenLookupDataSourceRepository.prototype.getKitchenById.name}`, () => {
    describe(`when a kitchen is found`, () => {
      it('should return a valid kitchen object', async () => {
        spyRetrieveKitchenById.mockResolvedValue(
          Result.ok({
            _id: new Types.ObjectId(),
            name: 'Kitchen 1',
            picture: 'https://picsum.photos/200',
            hours: '10:00 AM - 10:00 PM',
            foodCategory: ['Category 1','Category 2'],
            rating: [4.5, 5],
            menu: [
              {
                name: 'Menu Item 1',
                description: 'Menu Item 1 Description',
                price: 10,
                picture: 'https://picsum.photos/200',
                allergens: ['Allergen 1','Allergen 2'],
                composableChoices: [
                  {
                    title: 'Choice 1',
                    required: true,
                    choices: [
                      {
                        name: 'Choice 1.1',
                        extraPrice: '1.00',
                      },
                      {
                        name: 'Choice 1.2',
                        extraPrice: '2.00',
                      },
                    ],
                    maxChoices: 1,
                  },
                  {
                    title: 'Choice 2',
                    required: false,
                    choices: [
                      {
                        name: 'Choice 2.1',
                        extraPrice: '1.00',
                      },
                      {
                        name: 'Choice 2.2',
                        extraPrice: '2.00',
                      },
                    ],
                    maxChoices: 2,
                  },
                ],
              }
            ]
          })
        );

        const result = await kitchenLookupRepository.getKitchenById("1");

        expect(result.isSuccess).toBeTruthy()
      });
    });

    describe(`when a kitchen is not found`, () => {
      it('should return a 404 api error', async () => {
        spyRetrieveKitchenById.mockRejectedValue(
          new ApiError(404, 'Kitchen not found')
        );

        const result = await kitchenLookupRepository.getKitchenById('not found');

        expect(result.isSuccess).toBeFalsy();
      });
    });

    describe(`when a kitchen is found but is missing some required properties`, () => {
      it('should return a valid kitchen object', async () => {
        spyRetrieveKitchenById.mockRejectedValue(
          new ApiError(500, 'Kitchen object malformed')
        );

        const result = await kitchenLookupRepository.getKitchenById("1");

        expect(result.isSuccess).toBeFalsy();
      });
    });
  })
});
