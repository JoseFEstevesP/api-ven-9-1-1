import { permissions } from '#Constants/permissions.js';
import { validatePermissions } from '#Functions/validatePermissions.js';

const purchasePermissions = async (req, res, next) => {
  const { uidRol } = req;
  const validate = await validatePermissions({
    uidRol,
    per: permissions.purchase,
  });
  if (!validate)
    return res.status(401).send({ errors: ['Usuario no autorizado'] });
  next();
};

export default purchasePermissions;
