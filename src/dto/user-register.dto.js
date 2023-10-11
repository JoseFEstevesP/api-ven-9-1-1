import { regExpPassword } from '#Constants/reg-exp.js';
import {
  ciDTOSchemas,
  emailDTOSchemas,
  idDTOSchemas,
  nameDTOSchemas,
  passwordDTOSchemas,
  surnameDTOSchemas,
} from '#Dto/dto-types.js';
import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
const registerDTOSchema = Type.Object(
  {
    uid: idDTOSchemas,
    ci: ciDTOSchemas,
    name: nameDTOSchemas,
    surname: surnameDTOSchemas,
    email: emailDTOSchemas,
    password: passwordDTOSchemas,
    uidRol: idDTOSchemas,
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
addFormats(ajv, ['email', 'uuid']);
addErrors(ajv);
const validateSchema = ajv.compile(registerDTOSchema);
const userRegisterDTO = (req, res, next) => {
  const isDTOValid = validateSchema(req.body);
  if (!isDTOValid)
    return res
      .status(400)
      .send({ errors: validateSchema.errors.map((error) => error.message) });
  next();
};
export default userRegisterDTO;
