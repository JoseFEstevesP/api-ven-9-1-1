import rolDeleteController from '#Controllers/rol-delete.controller.js';
import rolReadController from '#Controllers/rol-read.controller.js';
import rolReadOfLimitController from '#Controllers/rol-readOfLimit.controller.js';
import rolRegisterController from '#Controllers/rol-register.controller.js';
import rolReportController from '#Controllers/rol-report.controller.js';
import rolSearchController from '#Controllers/rol-search.controller.js';
import rolSearchItemController from '#Controllers/rol-searchItem.controller.js';
import rolUpdateController from '#Controllers/rol-update.controller.js';
import deleteDTO from '#Dto/delete.dto.js';
import rolRegisterDTO from '#Dto/rol-register.dto.js';
import gaPermissions from '#Middleware/rol-GA.middleware.js';
import pdfPermissions from '#Middleware/rol-pdf.middleware.js';
import createRolPermissions from '#Middleware/rol/rol-createRol.middleware.js';
import deleteRolPermissions from '#Middleware/rol/rol-deleteRol.middleware.js';
import readRolPermissions from '#Middleware/rol/rol-readRol.middleware.js';
import updateRolPermissions from '#Middleware/rol/rol-updateRol.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const rolRoutes = Router();

rolRoutes.post(
  '/register',
  userJWTDTO,
  gaPermissions,
  createRolPermissions,
  rolRegisterDTO,
  rolRegisterController
);
rolRoutes.get(
  '/list',
  userJWTDTO,
  gaPermissions,
  readRolPermissions,
  rolReadController
);
rolRoutes.get(
  '/list_of_limit',
  userJWTDTO,
  gaPermissions,
  readRolPermissions,
  rolReadOfLimitController
);
rolRoutes.get(
  '/item/:uid',
  userJWTDTO,
  gaPermissions,
  readRolPermissions,
  rolSearchItemController
);
rolRoutes.get(
  '/search/:search',
  userJWTDTO,
  gaPermissions,
  readRolPermissions,
  rolSearchController
);
rolRoutes.get(
  '/report',
  userJWTDTO,
  gaPermissions,
  pdfPermissions,
  rolReportController
);
rolRoutes.patch(
  '/update',
  userJWTDTO,
  gaPermissions,
  updateRolPermissions,
  rolRegisterDTO,
  rolUpdateController
);
rolRoutes.delete(
  '/delete',
  userJWTDTO,
  gaPermissions,
  deleteRolPermissions,
  deleteDTO,
  rolDeleteController
);

export default rolRoutes;
