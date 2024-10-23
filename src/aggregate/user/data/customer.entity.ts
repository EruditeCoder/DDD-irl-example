import mongoose from "mongoose";

export interface Customer {
  _id: mongoose.Types.ObjectId,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  allergies?: String[],
  address: Address,
  notificationPreferences: NotificationPreferences,
  phone: PhoneNumber,
  paymentMethods?: PaymentMethod[],
  cart?: Order
}

interface Address {
  address1: string,
  address2?: string,
  city: string,
  state: string,
  zip: string,
  country: string,
}

interface PhoneNumber {
  countryCode: number,
  areaCode: number,
  localNumber1: number,
  localNumber2: number
}

interface Order {
  customerId: mongoose.Types.ObjectId,
  kitchenName: string,
  kitchenId: mongoose.Types.ObjectId,
  count: number,
  orderItems: ChosenMenuItem[],
  subtotal: number,
  tip: number,
  taxes: number,
  total: number,
  requestedCompletionTime: Date,
  isDelivery: boolean,
  deliveryFee?: number,
  deliveryAddress?: Address,
  estimatedDeliveryTime?: Date,
  actualCompletionTime: Date,
  paymentMethod: PaymentMethod,
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
}

interface ChosenMenuItem {
  orderItem: MenuItem,
  choices: Choice[],
  name: string,
  quantity: number,
}

interface MenuItem {
  name: string,
  description: string,
  price: number,
  picture: string,
  allergens: String[],
  composableChoices: AddOnChoices[],
}

interface Choice {
  name: string,
  extraPrice?: string,
}

interface AddOnChoices {
  title: string,
  required: boolean,
  choices: Choice[]
  maxChoices?: number,
}

interface NotificationPreferences {
  email: boolean,
  phone: boolean,
  text: boolean,
  push: boolean
}

// Stripe's PaymentMethod object
interface PaymentMethod {
  id: string,
  object: string,
  billing_details: {
    address: {
      city: string,
      country: string,
      line1: string,
      line2: string,
      postal_code: string,
      state: string
    },
  } // ... incomplete, more information at https://stripe.com/docs/api/payment_methods/object#payment_method_object-id
}
