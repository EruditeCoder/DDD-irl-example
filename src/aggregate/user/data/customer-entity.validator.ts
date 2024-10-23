import { Customer } from "./customer.entity";

// TODO: also validate optional properties
export class CustomerEntityValidator {
  public static validate(customer: Customer): boolean {
    return customer._id !== undefined
      && customer.firstName !== undefined
      && customer.lastName !== undefined
      && customer.email !== undefined
      && customer.password !== undefined
      && customer.address !== undefined
      && customer.notificationPreferences !== undefined
      && customer.phone !== undefined;
  }
}
