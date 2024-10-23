import { Types } from "mongoose";
import { KitchenLookupRepository } from "./kitchen-lookup.repository";
import { Kitchen } from "../data/kitchen.entity";
import { Result } from "../../../utils/shared/result";
import { ApiError } from "../../../utils/shared/api-error";

enum MockedKitchen {
  lookupWithFoundKitchen = 'lookupWithFoundKitchen',
  lookupWithNotFoundKitchen = 'lookupWithNotFoundKitchen',
  lookupWithUnexpectedError = 'lookupWithUnexpectedError',
}

export class KitchenLookupMockRepository implements KitchenLookupRepository {
  constructor() {}

  async getKitchenById(kitchenId: string): Promise<Result<Kitchen | ApiError>> {
    if (kitchenId === MockedKitchen.lookupWithFoundKitchen) {
      return Result.ok({
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
        ],
      });
    }

    return Result.fail(new ApiError(404, 'Kitchen not found'))
  }

  async getKitchensByName(kitchenName: string): Promise<Result<Kitchen[] | ApiError>> {
    if (kitchenName === MockedKitchen.lookupWithFoundKitchen) {
      return Result.ok([{
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
        ],
      }, {
        _id: new Types.ObjectId(),
        name: 'Kitchen 2',
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
        ],
      }, {
        _id: new Types.ObjectId(),
        name: 'Kitchen 3',
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
        ],
      }]);
    }

    return Result.fail(new ApiError(404, 'Kitchens not found'))
  }
}
