import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import {
  idDTOSchemas,
  permissionsDTOSchemas,
  placeDTOSchemas,
  quantityDTOSchemas,
} from './dto-types.js';
const registerDTOSchema = Type.Object(
  {
    uid: idDTOSchemas,
    description: permissionsDTOSchemas,
    brand: permissionsDTOSchemas,
    model: permissionsDTOSchemas,
    place: placeDTOSchemas,
    quantity: quantityDTOSchemas,
    condition: permissionsDTOSchemas,
    dateOfAcquisition: permissionsDTOSchemas,
    codeBN: permissionsDTOSchemas,
    fuelCapacity: permissionsDTOSchemas,
    currentFuel: permissionsDTOSchemas,
  },
  {
    additionalProperties: true,
    errorMessage: {
      additionalProperties: 'El formato del objeto no es valido',
    },
  }
);
const ajv = new Ajv({ allErrors: true })
  .addKeyword('kind')
  .addKeyword('modifier');
addFormats(ajv, ['uuid']);
addErrors(ajv);
const validateSchema = ajv.compile(registerDTOSchema);
const vehicleRegisterDTO = (req, res, next) => {
  const isDTOValid = validateSchema(req.body);
  if (!isDTOValid)
    return res.status(400).send({
      errors: validateSchema.errors.map((error) => {
        return { [error.instancePath.split('/')[1] || 'uid']: error.message };
      }),
    });
  next();
};
export default vehicleRegisterDTO;
