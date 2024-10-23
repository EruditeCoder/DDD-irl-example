import { Result  } from "../../../utils/shared/result";
import { ApiError } from "../../../utils/shared/api-error";
import { Customer } from "../data/customer.entity";
import { CustomerLookupRepository } from "../infrastructure/customer-lookup.repository";

export class CustomerLookupByIdUseCase {
  constructor(
    private readonly customerLookupRepository: CustomerLookupRepository,
  ) {}

  async execute(customerId: string): Promise<Result<Customer | ApiError>> {
    try {
      const customer = await this.customerLookupRepository.getCustomerById(customerId);
      return customer;
    } catch (e) {
      return Result.fail(new ApiError(500, `Internal server error: ${e}`));
    }
  }
}
