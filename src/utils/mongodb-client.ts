import mongoose from "mongoose";
import { Kitchen } from "../aggregate/kitchen/data/kitchen.entity";
import { Result } from "./shared/result";
import { ApiError } from "./shared/api-error";
import { KitchenEntityValidator } from "../aggregate/kitchen/data/kitchen-entity.validator";
import { Customer } from "../aggregate/user/data/customer.entity";
import { CustomerEntityValidator } from "../aggregate/user/data/customer-entity.validator";

export class MongoDBClient {
  private readonly options = {
    serverSelectionTimeoutMS: 10000
  };

  constructor(private readonly uri?: string) {
    this.uri = uri;
  }

  private createKitchenModel() {
    const kitchenSchema = new mongoose.Schema<Kitchen>({
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      name: { type: String, required: true },
      foodCategory: { type: [String], required: true },
      rating: { type: [Number, Number], required: true },
      menu:  {
        type: [{
          name: { type: String, required: true },
          description: { type: String, required: true },
          price: { type: Number, required: true },
          picture: { type: String, required: true },
          allergens: { type: [String], required: true },
          composableChoices: {
            type: [{
              title: { type: String, required: true },
              required: { type: Boolean, required: true },
              choices: {
                type: [{
                  name: { type: String, required: true },
                  extraPrice: { type: Number, required: false },
                }]
              },
              maxChoices: { type: Number, required: false },
            }],
          }
        }],
        required: true,
      },
      picture: { type: String, required: true },
      hours: { type: String, required: true }
    });

    return mongoose.model<Kitchen>('Kitchen', kitchenSchema);
  }

  private createCustomerModel() {
    const customerSchema = new mongoose.Schema({
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      firstName: {type: String, required: true},
      lastName: {type: String, required: true},
      email: {type: String, required: true},
      password: {type: String, required: true},
      allergies: [{type: String}],
      address: {
        address1: {type: String, required: true},
        address2: {type: String},
        city: {type: String, required: true},
        state: {type: String, required: true},
        zip: {type: String, required: true},
        country: {type: String, required: true}
      },
      notificationPreferences: {
        email: {type: Boolean, required: true},
        phone: {type: Boolean, required: true},
        text: {type: Boolean, required: true},
        push: {type: Boolean, required: true}
      },
      phone: {
        countryCode: {type: Number, required: true},
        areaCode: {type: Number, required: true},
        localNumber1: {type: Number, required: true},
        localNumber2: {type: Number, required: true}
      },
      paymentMethods: [{
        id: {type: String, required: true},
        object: {type: String, required: true},
        billing_details: {
          address: {
            city: {type: String},
            country: {type: String},
            line1: {type: String},
            line2: {type: String},
            postal_code: {type: String},
            state: {type: String}
          }
        }
      }],
      cart: {
        customerId: {type: mongoose.Types.ObjectId, required: true},
        kitchenName: {type: String, required: true},
        kitchenId: {type: mongoose.Types.ObjectId, required: true},
        count: {type: Number, required: true},
        orderItems: [{
          orderItem: {
            name: {type: String, required: true},
            description: {type: String, required: true},
            price: {type: Number, required: true},
            picture: {type: String, required: true},
            allergens: [{type: String}],
            composableChoices: [{
              title: {type: String, required: true},
              required: {type: Boolean, required: true},
              choices: [{
                name: {type: String, required: true},
                extraPrice: {type: String}
              }],
              maxChoices: {type: Number}
            }]
          },
          choices: [{
            name: {type: String, required: true},
            extraPrice: {type: String}
          }],
          name: {type: String, required: true},
          quantity: {type: Number, required: true}
        }],
        subtotal: {type: Number, required: true},
        tip: {type: Number, required: true},
        taxes: {type: Number, required: true},
        total: {type: Number, required: true},
        requestedCompletionTime: {type: Date, required: true},
        isDelivery: {type: Boolean, required: true},
        deliveryFee: {type: Number},
        deliveryAddress: {
          address1: {type: String},
          address2: {type: String},
          city: {type: String},
          state: {type: String},
          zip: {type: String},
          country: {type: String}

        }
      }
    });

    return mongoose.model<Kitchen>('Customer', customerSchema);
  }

  async retrieveKitchenById(id: string): Promise<Result<Kitchen | ApiError>> {
    if (!this.uri) {
      throw new Error('MongoDB URI is required')
    }

    if (!mongoose.models['Kitchen']) {
      this.createKitchenModel();
    }

    const client = await mongoose.connect(this.uri, this.options);

    const kitchen = await mongoose.models['Kitchen'].findById<Kitchen>(id).lean();

    if (!kitchen) {
      return Result.fail(new ApiError(404, 'Kitchen not found'));
    } else if (!KitchenEntityValidator.validate(kitchen)) {
      return Result.fail(new ApiError(500, 'Kitchen object malformed'));
    }

    await client.connection.close();

    return Result.ok(kitchen);
  }

  async retrieveKitchensByName(kitchenName: string): Promise<Result<Kitchen[]>> {
    if (!this.uri) {
      throw new Error('MongoDB URI is required')
    }

    // checks the global mongoose object to see if a model has already been initialized
    if (!mongoose.models['Kitchen']) {
      this.createKitchenModel();
    }

    const client = await mongoose.connect(this.uri, this.options);

    const kitchen = await mongoose.models['Kitchen'].find<Kitchen>(
      { name: { $regex: new RegExp(kitchenName.trim(), "i") } }).lean();

    if (!kitchen || kitchen.length === 0) {
      return Result.fail(new ApiError(404, 'Kitchens not found'));
    } else if (kitchen.some(k => !KitchenEntityValidator.validate(k))) {
      return Result.fail(new ApiError(500, 'Kitchen object malformed'));
    }

    await client.connection.close();

    return Result.ok(kitchen);
  }

  async retrieveCustomerById(id: string): Promise<Result<Customer | ApiError>> {
    if (!this.uri) {
      throw new Error('MongoDB URI is required')
    }

    if (!mongoose.models['Customer']) {
      this.createCustomerModel();
    }

    const client = await mongoose.connect(this.uri, this.options);

    const customer = await mongoose.models['Customer'].findById<Customer>(id).lean() as Customer;

    if (!customer) {
      return Result.fail(new ApiError(404, 'Customer not found'));
    } else if (!CustomerEntityValidator.validate(customer)) {
      return Result.fail(new ApiError(500, 'Customer object malformed'));
    }

    await client.connection.close();

    return Result.ok(customer);
  }
}
