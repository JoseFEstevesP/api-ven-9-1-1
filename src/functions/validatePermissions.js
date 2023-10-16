import { permissions } from '#Constants/permissions.js';
import { Rol } from '#Schemas/rol.schema.js';
export const validatePermissions = async ({ uidRol, per }) => {
  const isPermissionsRol = await Rol.findByPk(uidRol);
  const validate = isPermissionsRol?.permissions
    .split(',')
    .some((item) => item === per || item === permissions.super);
  return validate;
};
