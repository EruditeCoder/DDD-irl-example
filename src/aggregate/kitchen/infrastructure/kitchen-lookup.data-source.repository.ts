import dotenv from "dotenv";
import { Kitchen } from "../data/kitchen.entity";
import { MongoDBClient } from "../../../utils/mongodb-client";
import { KitchenLookupRepository } from "./kitchen-lookup.repository";
import { Result } from "../../../utils/shared/result";
import { ApiError } from "../../../utils/shared/api-error";

dotenv.config();

export class KitchenLookupDataSourceRepository implements KitchenLookupRepository {
  private mongoDBClient = new MongoDBClient(process.env.mongoDBUri);

  constructor() {}

  async getKitchenById(kitchenId: string): Promise<Result<Kitchen | ApiError>> {
    try {
      const result = await this.mongoDBClient.retrieveKitchenById(kitchenId);

      return result;
    } catch (e) {
      return Result.fail(new ApiError(500, `Internal server error: ${e}`));
    }
  }

  async getKitchensByName(kitchenName: string): Promise<Result<Kitchen[]>> {
    try {
      const result = await this.mongoDBClient.retrieveKitchensByName(kitchenName);

      return result;
    } catch (e) {
      return Result.fail(new ApiError(500, `Internal server error: ${e}`));
    }
  }
}
