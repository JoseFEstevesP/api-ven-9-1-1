import consumablesDeleteController from '#Controllers/consumables-delete.controller.js';
import consumablesReadController from '#Controllers/consumables-read.controller.js';
import consumablesRegisterController from '#Controllers/consumables-register.controller.js';
import consumablesSearchController from '#Controllers/consumables-search.controller.js';
import consumablesSearchItemController from '#Controllers/consumables-searchItem.controller.js';
import consumablesUpdateController from '#Controllers/consumables-update.controller.js';
import consumablesRegisterDTO from '#Dto/consumables-register.dto.js';
import deleteDTO from '#Dto/delete.dto.js';
import gaPermissions from '#Middleware/rol-GA.middleware.js';
import createPermissions from '#Middleware/rol-create.middleware.js';
import deletePermissions from '#Middleware/rol-delete.middleware.js';
import readPermissions from '#Middleware/rol-read.middleware.js';
import updatePermissions from '#Middleware/rol-update.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const consumablesRoutes = Router();

consumablesRoutes.post(
  '/register',
  userJWTDTO,
  createPermissions,
  gaPermissions,
  consumablesRegisterDTO,
  consumablesRegisterController
);
consumablesRoutes.get(
  '/list',
  userJWTDTO,
  readPermissions,
  gaPermissions,
  consumablesReadController
);
consumablesRoutes.get(
  '/item/:uid',
  userJWTDTO,
  readPermissions,
  gaPermissions,
  consumablesSearchItemController
);
consumablesRoutes.get(
  '/search/:search',
  userJWTDTO,
  readPermissions,
  gaPermissions,
  consumablesSearchController
);
consumablesRoutes.patch(
  '/update',
  userJWTDTO,
  updatePermissions,
  gaPermissions,
  consumablesRegisterDTO,
  consumablesUpdateController
);
consumablesRoutes.delete(
  '/delete',
  userJWTDTO,
  deletePermissions,
  gaPermissions,
  deleteDTO,
  consumablesDeleteController
);

export default consumablesRoutes;
