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
import createRolPermissions from '#Middleware/rol/rol-createRol.middleware.js';
import deleteRolPermissions from '#Middleware/rol/rol-deleteRol.middleware.js';
import pdfRolPermissions from '#Middleware/rol/rol-pdfRol.middleware.js';
import readRolPermissions from '#Middleware/rol/rol-readRol.middleware.js';
import rolPermissions from '#Middleware/rol/rol-rol.middleware.js';
import updateRolPermissions from '#Middleware/rol/rol-updateRol.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const rolRoutes = Router();

rolRoutes.post(
  '/register',
  userJWTDTO,
  gaPermissions,
  rolPermissions,
  createRolPermissions,
  rolRegisterDTO,
  rolRegisterController
);
rolRoutes.get(
  '/list',
  userJWTDTO,
  gaPermissions,
  rolPermissions,
  readRolPermissions,
  rolReadController
);
rolRoutes.get(
  '/list_of_limit',
  userJWTDTO,
  gaPermissions,
  rolPermissions,
  readRolPermissions,
  rolReadOfLimitController
);
rolRoutes.get(
  '/item/:uid',
  userJWTDTO,
  gaPermissions,
  rolPermissions,
  readRolPermissions,
  rolSearchItemController
);
rolRoutes.get(
  '/search/:search',
  userJWTDTO,
  gaPermissions,
  rolPermissions,
  readRolPermissions,
  rolSearchController
);
rolRoutes.get(
  '/report',
  userJWTDTO,
  gaPermissions,
  rolPermissions,
  pdfRolPermissions,
  rolReportController
);
rolRoutes.patch(
  '/update',
  userJWTDTO,
  gaPermissions,
  rolPermissions,
  updateRolPermissions,
  rolRegisterDTO,
  rolUpdateController
);
rolRoutes.delete(
  '/delete',
  userJWTDTO,
  gaPermissions,
  rolPermissions,
  deleteRolPermissions,
  deleteDTO,
  rolDeleteController
);

export default rolRoutes;
