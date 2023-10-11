import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import {
  ciDTOSchemas,
  nameDTOSchemas,
  surnameDTOSchemas,
} from '#Dto/dto-types.js';
import { regExpPassword } from '#Constants/reg-exp.js';
const updateDataDTOSchema = Type.Object(
  {
    name: nameDTOSchemas,
    ci: ciDTOSchemas,
    surname: surnameDTOSchemas,
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: 'El formato del objeto no es valido',
    },
  }
);
const ajv = new Ajv({ allErrors: true })
  .addKeyword('kind')
  .addKeyword('modifier');
ajv.addFormat('password', regExpPassword);
addErrors(ajv);
const validateSchema = ajv.compile(updateDataDTOSchema);
const userUpdateDataDTO = (req, res, next) => {
  const isDTOValid = validateSchema(req.body);
  if (!isDTOValid)
    return res
      .status(400)
      .send({ errors: validateSchema.errors.map((error) => error.message) });
  next();
};
export default userUpdateDataDTO;
