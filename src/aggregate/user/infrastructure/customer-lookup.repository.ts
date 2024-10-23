import { Result } from "../../../utils/shared/result";
import { Customer } from "../data/customer.entity";
import { ApiError } from "../../../utils/shared/api-error";

export interface CustomerLookupRepository {
  getCustomerById(customerId: string): Promise<Result<Customer | ApiError>>;
}
