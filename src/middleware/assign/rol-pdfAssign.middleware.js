import { permissions } from '#Constants/permissions.js';
import { validatePermissions } from '#Functions/validatePermissions.js';

const pdfAssignPermissions = async (req, res, next) => {
  const { uidRol } = req;
  const validate = await validatePermissions({
    uidRol,
    per: permissions.pdfAssign,
  });
  if (!validate)
    return res.status(401).send({ errors: ['Usuario no autorizado'] });
  next();
};

export default pdfAssignPermissions;
