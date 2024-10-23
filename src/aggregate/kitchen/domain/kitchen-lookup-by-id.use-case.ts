import { KitchenLookupRepository } from "../infrastructure/kitchen-lookup.repository";
import { Result } from "../../../utils/shared/result";
import { Kitchen } from "../data/kitchen.entity";
import { ApiError } from "../../../utils/shared/api-error";

export class KitchenLookupByIdUseCase {
  constructor(
    private readonly kitchenLookupRepository: KitchenLookupRepository,
  ) {}

  async execute(kitchenId: string): Promise<Result<Kitchen | ApiError>> {
    try {
      const kitchen = await this.kitchenLookupRepository.getKitchenById(kitchenId);
      return kitchen;
    } catch (e) {
      return Result.fail(new ApiError(500, `Internal server error: ${e}`));
    }
  }
}
