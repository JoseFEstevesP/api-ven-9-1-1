import { Type } from '@sinclair/typebox';
export const idDTOSchemas = Type.String({
  format: 'uuid',
  errorMessage: {
    type: 'El tipo de uid no es valido, debe de ser un string',
    format: 'El formato de uid no valido, debe de ser uuid4',
  },
});
export const ciDTOSchemas = Type.String({
  minLength: 6,
  maxLength: 9,
  errorMessage: {
    minLength: 'Ingrese una CI valida, mínimo 7 caracteres',
    maxLength: 'Ingrese una CI valida, máximo 8 caracteres',
  },
});
export const nameDTOSchemas = Type.String({
  minLength: 2,
  maxLength: 20,
  errorMessage: {
    minLength: 'El nombre debe de tener un mínimo de 2 caracteres de longitud',
    maxLength: 'El nombre debe de tener un máximo de 20 caracteres de longitud',
  },
});
export const surnameDTOSchemas = Type.String({
  minLength: 4,
  maxLength: 50,
  errorMessage: {
    minLength:
      'El apellido debe de tener un mínimo de 4 caracteres de longitud',
    maxLength:
      'El apellido debe de tener un máximo de 50 caracteres de longitud',
  },
});
export const emailDTOSchemas = Type.String({
  format: 'email',
  errorMessage: {
    type: 'El tipo de email no es valido, debe de ser un string',
    format: 'El formato de email no valido, debe de cumplir el RFC 5322',
  },
});
export const passwordDTOSchemas = Type.String({
  format: 'password',
  minLength: 10,
  maxLength: 25,
  errorMessage: {
    type: 'El tipo de clave no es valido, debe de ser un string',
    format:
      'El formato de clave no valido, debe de tener una minúscula, una mayúscula y un número',
    minLength: 'La clave debe de tener un mínimo de 10 caracteres de longitud',
    maxLength: 'La clave debe de tener un máximo de 25 caracteres de longitud',
  },
});
export const permissionsDTOSchemas = Type.String({
  errorMessage: {
    type: 'El tipo nota no es valido, debe de ser una cadena de texto',
  },
});
