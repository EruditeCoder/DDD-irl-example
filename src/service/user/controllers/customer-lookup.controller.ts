import { ApiError } from "../../../utils/shared/api-error";
import { CustomerLookupByIdUseCase } from "../../../aggregate/user/domain/customer-lookup.use-case";
import { CustomerLookupMockRepository } from "../../../aggregate/user/infrastructure/customer-lookup.mock.repository";
import {
  CustomerLookupDataSourceRepository
} from "../../../aggregate/user/infrastructure/customer-lookup.data-source.repository";
import { Customer } from "../../../aggregate/user/data/customer.entity";

export class CustomerLookupController {
  private readonly customerLookupByIdUseCase: CustomerLookupByIdUseCase;

  constructor(
    private readonly useMock: boolean
  ) {
    const customerLookupRepository = useMock
      ? new CustomerLookupMockRepository()
      : new CustomerLookupDataSourceRepository();

    this.customerLookupByIdUseCase = new CustomerLookupByIdUseCase(customerLookupRepository);
  }

  async validate(customerId: string): Promise<any> {
    return (!!customerId);
  }

  async process(customerId: string): Promise<Customer | ApiError> {
    let customer = await this.customerLookupByIdUseCase.execute(customerId);

    if (customer.isSuccess) {
      return customer.getValue();
    } else {
      return customer.errorValue();
    }
  }
}
