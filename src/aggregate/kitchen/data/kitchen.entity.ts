import mongoose from "mongoose";

export interface Kitchen {
  _id: mongoose.Types.ObjectId,
  name: string,
  foodCategory: String[],
  rating: [number, number],
  menu: MenuItem[],
  picture: string,
  hours: string,
}

export interface MenuItem {
  name: string,
  description: string,
  price: number,
  picture: string,
  allergens: String[],
  composableChoices: AddOnChoices[],
}

export interface Choice {
  name: string,
  extraPrice?: string,
}

export interface AddOnChoices {
  title: string,
  required: boolean,
  choices: Choice[]
  maxChoices?: number,
}
