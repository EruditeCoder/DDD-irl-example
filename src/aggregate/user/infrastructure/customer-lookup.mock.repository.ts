import mongoose from "mongoose";
import { Result } from "../../../utils/shared/result";
import { ApiError } from "../../../utils/shared/api-error";
import { Customer } from "../data/customer.entity";
import { CustomerLookupRepository } from "./customer-lookup.repository";

enum MockedCustomer {
  lookupWithFoundCustomer = 'lookupWithFoundCustomer',
}

export class CustomerLookupMockRepository implements CustomerLookupRepository {
  constructor() {}

  async getCustomerById(customerId: string): Promise<Result<Customer | ApiError>> {
    if (customerId === MockedCustomer.lookupWithFoundCustomer) {
      return Result.ok({
        _id: new mongoose.Types.ObjectId(),
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@email.com',
        password: 'password',
        address: {
          address1: '123 Main St',
          address2: 'Apt 1',
          city: 'New York City',
          state: 'NY',
          zip: '10001',
          country: 'USA'
        },
        notificationPreferences: {
          email: true,
          phone: true,
          text: true,
          push: true
        },
        phone: {
          countryCode: 1,
          areaCode: 212,
          localNumber1: 555,
          localNumber2: 5555
        }
      });
    }

    return Result.fail(new ApiError(404, 'Customer not found'))
  }
}
