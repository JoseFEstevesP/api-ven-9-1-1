import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import {
  idDTOSchemas,
  permissionsDTOSchemas,
  quantityDTOSchemas,
  valueDTOSchemas,
} from './dto-types.js';
const updateDTOSchema = Type.Object(
  {
    uid: idDTOSchemas,
    product: permissionsDTOSchemas,
    serial: permissionsDTOSchemas,
    brand: permissionsDTOSchemas,
    model: permissionsDTOSchemas,
    dateOfPurchase: permissionsDTOSchemas,
    value: valueDTOSchemas,
    quantity: quantityDTOSchemas,
    supplier: permissionsDTOSchemas,
    warranty: permissionsDTOSchemas,
    orderNumber: permissionsDTOSchemas,
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
const validateSchema = ajv.compile(updateDTOSchema);
const purchaseUpdateDTO = (req, res, next) => {
  const isDTOValid = validateSchema(req.body);
  if (!isDTOValid)
    return res.status(400).send({
      errors: validateSchema.errors.map((error) => {
        return { [error.instancePath.split('/')[1]]: error.message };
      }),
    });
  next();
};
export default purchaseUpdateDTO;
