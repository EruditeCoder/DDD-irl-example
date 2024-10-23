import { Result } from "../../../utils/shared/result";
import { ApiError } from "../../../utils/shared/api-error";
import { Customer } from "../data/customer.entity";
import { CustomerLookupRepository } from "./customer-lookup.repository";
import { MongoDBClient } from "../../../utils/mongodb-client";

export class CustomerLookupDataSourceRepository implements CustomerLookupRepository {
  private mongoDBClient = new MongoDBClient(process.env.mongoDBUri);

  constructor() {}

  async getCustomerById(customerId: string): Promise<Result<Customer | ApiError>> {
    try {
      const customer = await this.mongoDBClient.retrieveCustomerById(customerId);

      return customer;
    } catch (e) {
      return Result.fail(new ApiError(500, `Internal server error: ${e}`))
    }
  }
}
