interface Ratings {
  rating: number,
  review: string,
  user: CustomerUser,
  createdAt: Date,
}

interface Kitchen {
  id: string,
  name: string,
  foodCategory: string[],
  rating: [number, number],
  menu: MenuItem[],
  picture: string,
  hours: string,
}

interface NotificationPreferences {
  email: boolean,
  phone: boolean,
  text: boolean,
  push: boolean
}

interface Address {
  address1: string,
  address2?: string,
  city: string,
  state: string,
  zip: number,
  country: string,
}

interface PhoneNumber {
  countryCode: number,
  areaCode: number,
  localNumber1: number,
  localNumber2: number
}

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
  } // ... incomplete
}

interface Order {
  customerId: number,
  kitchenName: string,
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
  actualDeliveryTime: Date, // or pickup time
  paymentMethod: PaymentMethod,
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
}

interface ChosenMenuItem {
  orderItem: MenuItem,
  choices: Choice[],
  name: string,
  quantity: number,
}

interface CustomerUser {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  allergies: String[],
  address: Address,
  notificationPreferences: NotificationPreferences,
  phone: PhoneNumber,
  paymentMethods: PaymentMethod[],
  cart: Order
}

interface ChefUser {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  address: Address,
  notificationPreferences: NotificationPreferences,
  phone: PhoneNumber,
  paymentMethods: PaymentMethod[],
  kitchen: Kitchen,
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

interface MenuItem {
  name: string,
  description: string,
  price: number,
  picture: string,
  allergens: String[],
  composableChoices: AddOnChoices[],
}

