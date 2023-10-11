import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import { emailDTOSchemas, passwordDTOSchemas } from '#Dto/dto-types.js';
import { regExpPassword } from '#Constants/reg-exp.js';
const updateEmailDTOSchema = Type.Object(
  {
    email: emailDTOSchemas,
    password: passwordDTOSchemas,
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
addFormats(ajv, ['email']);
addErrors(ajv);
const validateSchema = ajv.compile(updateEmailDTOSchema);
const userUpdateEmailDTO = (req, res, next) => {
  const isDTOValid = validateSchema(req.body);
  if (!isDTOValid)
    return res
      .status(400)
      .send({ errors: validateSchema.errors.map((error) => error.message) });
  next();
};
export default userUpdateEmailDTO;
