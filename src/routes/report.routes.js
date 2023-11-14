import reportReadController from '#Controllers/report-read.controller.js';
import reportRegisterController from '#Controllers/report-register.controller.js';
import reportSearchItemController from '#Controllers/report-searchItem.controller.js';
import reportUpdateController from '#Controllers/report-update.controller.js';
import technologyDeleteController from '#Controllers/technology-delete.controller.js';
import technologySearchController from '#Controllers/technology-search.controller.js';
import deleteDTO from '#Dto/delete.dto.js';
import reportRegisterDTO from '#Dto/report-register.dto.js';
import gaPermissions from '#Middleware/rol-GA.middleware.js';
import createPermissions from '#Middleware/rol-create.middleware.js';
import deletePermissions from '#Middleware/rol-delete.middleware.js';
import readPermissions from '#Middleware/rol-read.middleware.js';
import updatePermissions from '#Middleware/rol-update.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const reportRoutes = Router();

reportRoutes.post(
  '/register',
  userJWTDTO,
  createPermissions,
  gaPermissions,
  reportRegisterDTO,
  reportRegisterController
);
reportRoutes.get(
  '/list',
  userJWTDTO,
  readPermissions,
  gaPermissions,
  reportReadController
);
reportRoutes.get(
  '/item/:uid',
  userJWTDTO,
  readPermissions,
  gaPermissions,
  reportSearchItemController
);
reportRoutes.get(
  '/search/:search',
  userJWTDTO,
  readPermissions,
  gaPermissions,
  technologySearchController
);
reportRoutes.patch(
  '/update',
  userJWTDTO,
  updatePermissions,
  gaPermissions,
  reportRegisterDTO,
  reportUpdateController
);
reportRoutes.delete(
  '/delete',
  userJWTDTO,
  deletePermissions,
  gaPermissions,
  deleteDTO,
  technologyDeleteController
);

export default reportRoutes;
