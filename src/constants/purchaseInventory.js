import ModelOptions from '#Class/ModelOptions.js';
import { validateConsumables } from '#Functions/validate/validateConsumables.js';
import { validateFurniture } from '#Functions/validate/validateFurniture.js';
import { validateTechnology } from '#Functions/validate/validateTechnology.js';
import { validateVehicle } from '#Functions/validate/validateVehicle.js';
import { Consumables } from '#Schemas/consumables.schema.js';
import { Furniture } from '#Schemas/furniture.schema.js';
import { Technology } from '#Schemas/technology.schema.js';
import { Vehicle } from '#Schemas/vehicle.schema.js';
import {
  consumablesMSG,
  furnitureMSG,
  technologyMSG,
  vehicleMSG,
} from './system.js';

export const inventoryData = {
  technology: ({ data, extraData }) => ({
    uid: data.uid,
    description: data.product,
    serial: data.serial,
    brand: data.brand,
    model: data.model,
    dateOfAcquisition: data.dateOfPurchase,
    quantity: data.quantity,
    condition: 'operativo',
    codeBN: 'No asignado',
    ...extraData,
  }),
  furniture: ({ data, extraData }) => ({
    uid: data.uid,
    description: data.product,
    serial: data.serial,
    quantity: data.quantity,
    condition: 'operativo',
    dateOfAcquisition: data.dateOfPurchase,
    codeBN: 'No asignado',
    ...extraData,
  }),
  vehicle: ({ data, extraData }) => ({
    uid: data.uid,
    description: data.product,
    brand: data.brand,
    model: data.model,
    place: 'No asignado',
    quantity: data.quantity,
    condition: 'operativo',
    dateOfAcquisition: data.dateOfPurchase,
    codeBN: 'No asignado',
    ...extraData,
  }),
  consumable: ({ data, extraData }) => ({
    uid: data.uid,
    description: data.product,
    brand: data.brand,
    model: data.model,
    serial: data.serial,
    quantity: data.quantity,
    dateOfAcquisition: data.dateOfPurchase,
    ...extraData,
  }),
};
export const inventoryModel = {
  technology: new ModelOptions({ Model: Technology }),
  furniture: new ModelOptions({ Model: Furniture }),
  vehicle: new ModelOptions({ Model: Vehicle }),
  consumable: new ModelOptions({ Model: Consumables }),
};
export const inventoryMSG = {
  technology: technologyMSG,
  furniture: furnitureMSG,
  vehicle: vehicleMSG,
  consumable: consumablesMSG,
};
export const inventoryValidate = {
  technology: validateTechnology,
  furniture: validateFurniture,
  vehicle: validateVehicle,
  consumable: validateConsumables,
};
