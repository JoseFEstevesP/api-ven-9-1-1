import { permissions } from '#Constants/permissions.js';
import { validatePermissions } from '#Functions/validatePermissions.js';

const pdfTechnologyPermissions = async (req, res, next) => {
  const { uidRol } = req;
  const validate = await validatePermissions({
    uidRol,
    per: permissions.pdfTechnology,
  });
  if (!validate)
    return res.status(401).send({ errors: ['Usuario no autorizado'] });
  next();
};

export default pdfTechnologyPermissions;
