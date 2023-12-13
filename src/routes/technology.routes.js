import technologyDeleteController from '#Controllers/technology-delete.controller.js';
import technologyReadController from '#Controllers/technology-read.controller.js';
import technologyRegisterController from '#Controllers/technology-register.controller.js';
import technologyReportController from '#Controllers/technology-report.controller.js';
import technologySearchController from '#Controllers/technology-search.controller.js';
import technologySearchItemController from '#Controllers/technology-searchItem.controller.js';
import technologyUpdateController from '#Controllers/technology-update.controller.js';
import deleteDTO from '#Dto/delete.dto.js';
import technologyRegisterDTO from '#Dto/technology-register.dto.js';
import gaPermissions from '#Middleware/rol-GA.middleware.js';
import createPermissions from '#Middleware/rol-create.middleware.js';
import deletePermissions from '#Middleware/rol-delete.middleware.js';
import readPermissions from '#Middleware/rol-read.middleware.js';
import updatePermissions from '#Middleware/rol-update.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const technologyRoutes = Router();

technologyRoutes.post(
  '/register',
  userJWTDTO,
  createPermissions,
  gaPermissions,
  technologyRegisterDTO,
  technologyRegisterController
);
technologyRoutes.get(
  '/list',
  userJWTDTO,
  readPermissions,
  gaPermissions,
  technologyReadController
);
technologyRoutes.get(
  '/item/:uid',
  userJWTDTO,
  readPermissions,
  gaPermissions,
  technologySearchItemController
);
technologyRoutes.get(
  '/search/:search',
  userJWTDTO,
  readPermissions,
  gaPermissions,
  technologySearchController
);
technologyRoutes.get(
  '/report',
  userJWTDTO,
  readPermissions,
  technologyReportController
);
technologyRoutes.patch(
  '/update',
  userJWTDTO,
  updatePermissions,
  gaPermissions,
  technologyRegisterDTO,
  technologyUpdateController
);
technologyRoutes.delete(
  '/delete',
  userJWTDTO,
  deletePermissions,
  gaPermissions,
  deleteDTO,
  technologyDeleteController
);

export default technologyRoutes;
