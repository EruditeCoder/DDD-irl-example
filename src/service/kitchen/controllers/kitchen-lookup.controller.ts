import { KitchenLookupByIdUseCase } from "../../../aggregate/kitchen/domain/kitchen-lookup-by-id.use-case";
import { KitchenLookupMockRepository } from "../../../aggregate/kitchen/infrastructure/kitchen-lookup.mock.repository";
import {
  KitchenLookupDataSourceRepository
} from "../../../aggregate/kitchen/infrastructure/kitchen-lookup.data-source.repository";
import { KitchensLookupByNameUseCase } from "../../../aggregate/kitchen/domain/kitchens-lookup-by-name.use-case";
import { ApiError } from "../../../utils/shared/api-error";
import { Kitchen } from "../../../aggregate/kitchen/data/kitchen.entity";

interface Input {
  kitchenId: string,
  kitchenName: string
}

export class KitchenLookupController {
  private readonly kitchenLookupByIdUseCase: KitchenLookupByIdUseCase;
  private readonly kitchensLookupByNameUseCase: KitchensLookupByNameUseCase;

  constructor(
    private readonly useMock: boolean
  ) {
    const kitchenLookupRepository = useMock
      ? new KitchenLookupMockRepository()
      : new KitchenLookupDataSourceRepository();

    this.kitchenLookupByIdUseCase = new KitchenLookupByIdUseCase(kitchenLookupRepository);
    this.kitchensLookupByNameUseCase = new KitchensLookupByNameUseCase(kitchenLookupRepository);
  }

  async validate(input: Input): Promise<any> {
    return (!(!input.kitchenId && !input.kitchenName));
  }

  async process(input: Input): Promise<Kitchen | Kitchen[] | ApiError> {
    let kitchen;

    if (input.kitchenId) {
      kitchen = await this.kitchenLookupByIdUseCase.execute(input.kitchenId);
    } else {
      kitchen = await this.kitchensLookupByNameUseCase.execute(input.kitchenName);
    }

    if (kitchen.isSuccess) {
      return kitchen.getValue();
    } else {
      return kitchen.errorValue();
    }
  }
}
