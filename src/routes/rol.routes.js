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
import createPermissions from '#Middleware/rol-create.middleware.js';
import deletePermissions from '#Middleware/rol-delete.middleware.js';
import readPermissions from '#Middleware/rol-read.middleware.js';
import updatePermissions from '#Middleware/rol-update.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const rolRoutes = Router();

rolRoutes.post(
  '/register',
  userJWTDTO,
  createPermissions,
  rolRegisterDTO,
  rolRegisterController
);
rolRoutes.get('/list', userJWTDTO, readPermissions, rolReadController);
rolRoutes.get(
  '/list_of_limit',
  userJWTDTO,
  readPermissions,
  rolReadOfLimitController
);
rolRoutes.get(
  '/item/:uid',
  userJWTDTO,
  readPermissions,
  rolSearchItemController
);
rolRoutes.get(
  '/search/:search',
  userJWTDTO,
  readPermissions,
  rolSearchController
);
rolRoutes.get('/report', userJWTDTO, readPermissions, rolReportController);
rolRoutes.patch(
  '/update',
  userJWTDTO,
  updatePermissions,
  rolRegisterDTO,
  rolUpdateController
);
rolRoutes.delete(
  '/delete',
  userJWTDTO,
  deletePermissions,
  deleteDTO,
  rolDeleteController
);

export default rolRoutes;
