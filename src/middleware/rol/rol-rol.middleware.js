import { permissions } from '#Constants/permissions.js';
import { validatePermissions } from '#Functions/validatePermissions.js';

const rolPermissions = async (req, res, next) => {
  const { uidRol } = req;
  const validate = await validatePermissions({
    uidRol,
    per: permissions.rol,
  });
  if (!validate)
    return res.status(401).send({ errors: ['Usuario no autorizado'] });
  next();
};

export default rolPermissions;
