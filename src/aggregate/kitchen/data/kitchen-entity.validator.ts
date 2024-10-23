import { Kitchen, MenuItem, AddOnChoices, Choice } from './kitchen.entity';

export class KitchenEntityValidator {
  static validate(kitchen: Kitchen): boolean {
    if (!kitchen._id || typeof kitchen._id !== 'object' || !kitchen._id.toHexString()) {
      return false;
    }

    if (!kitchen.name || kitchen.name.trim().length === 0) {
      return false;
    }

    if (!Array.isArray(kitchen.foodCategory) || kitchen.foodCategory.length === 0) {
      return false;
    }

    if (!Array.isArray(kitchen.rating) || kitchen.rating.length !== 2
      || typeof kitchen.rating[0] !== 'number' || typeof kitchen.rating[1] !== 'number') {
      return false;
    }

    if (!Array.isArray(kitchen.menu) || kitchen.menu.length === 0
      || !kitchen.menu.every((menuItem: MenuItem) => this.validateMenuItem(menuItem))) {
      return false;
    }

    if (!kitchen.picture || kitchen.picture.trim().length === 0) {
      return false;
    }

    if (!kitchen.hours || kitchen.hours.trim().length === 0) {
      return false;
    }

    return true;
  }

  static validateMenuItem(menuItem: MenuItem): boolean {
    if (!menuItem.name || menuItem.name.trim().length === 0) {
      return false;
    }

    if (!menuItem.description || menuItem.description.trim().length === 0) {
      return false;
    }

    if (typeof menuItem.price !== 'number' || menuItem.price <= 0) {
      return false;
    }

    if (!menuItem.picture || menuItem.picture.trim().length === 0) {
      return false;
    }

    if (!Array.isArray(menuItem.allergens)) {
      return false;
    }

    if (!Array.isArray(menuItem.composableChoices)
      || !menuItem.composableChoices.every((addOnChoice: AddOnChoices) =>
        this.validateAddOnChoices(addOnChoice))) {
      return false;
    }

    return true;
  }

  static validateAddOnChoices(addOnChoice: AddOnChoices): boolean {
    if (!addOnChoice.title || addOnChoice.title.trim().length === 0) {
      return false;
    }

    if (typeof addOnChoice.required !== 'boolean') {
      return false;
    }

    if (!Array.isArray(addOnChoice.choices)
      || !addOnChoice.choices.every((choice: Choice) => this.validateChoice(choice))) {
      return false;
    }

    if (addOnChoice.maxChoices !== undefined
      && (typeof addOnChoice.maxChoices !== 'number'
      || addOnChoice.maxChoices <= 0)) {
      return false;
    }

    return true;
  }

  static validateChoice(choice: Choice): boolean {
    if (!choice.name || choice.name.trim().length === 0) {
      return false;
    }

    if (choice.extraPrice !== undefined && (isNaN(Number(choice.extraPrice))
      || Number(choice.extraPrice) <= 0)) {
      return false;
    }

    return true;
  }

}
