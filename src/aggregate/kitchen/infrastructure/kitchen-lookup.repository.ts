import { Kitchen } from '../data/kitchen.entity';
import { Result } from "../../../utils/shared/result";
import {ApiError} from "../../../utils/shared/api-error";

export interface KitchenLookupRepository {
  getKitchenById(kitchenId: string): Promise<Result<Kitchen | ApiError>>;

  getKitchensByName(kitchenName: string): Promise<Result<Kitchen[] | ApiError>>;
}
