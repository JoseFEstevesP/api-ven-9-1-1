import assignDeleteController from '#Controllers/assign-delete.controller.js';
import assignReadController from '#Controllers/assign-read.controller.js';
import inventoryReadController from '#Controllers/assign-readInventory.controller.js';
import assignRegisterController from '#Controllers/assign-register.controller.js';
import assignSearchController from '#Controllers/assign-search.controller.js';
import assignSearchItemController from '#Controllers/assign-searchItem.controller.js';
import assignUpdateController from '#Controllers/assign-update.controller.js';
import assignRegisterDTO from '#Dto/assign-register.dto.js';
import deleteDTO from '#Dto/delete.dto.js';
import gaPermissions from '#Middleware/rol-GA.middleware.js';
import createPermissions from '#Middleware/rol-create.middleware.js';
import deletePermissions from '#Middleware/rol-delete.middleware.js';
import readPermissions from '#Middleware/rol-read.middleware.js';
import updatePermissions from '#Middleware/rol-update.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const assignRoutes = Router();

assignRoutes.post(
  '/register',
  userJWTDTO,
  createPermissions,
  gaPermissions,
  assignRegisterDTO,
  assignRegisterController
);
assignRoutes.get(
  '/list',
  userJWTDTO,
  readPermissions,
  gaPermissions,
  assignReadController
);
assignRoutes.get(
  '/listInventory/:inventory',
  userJWTDTO,
  readPermissions,
  gaPermissions,
  inventoryReadController
);
assignRoutes.get(
  '/item/:uid',
  userJWTDTO,
  readPermissions,
  gaPermissions,
  assignSearchItemController
);
assignRoutes.get(
  '/search/:search',
  userJWTDTO,
  readPermissions,
  gaPermissions,
  assignSearchController
);
assignRoutes.patch(
  '/update',
  userJWTDTO,
  updatePermissions,
  gaPermissions,
  assignRegisterDTO,
  assignUpdateController
);
assignRoutes.delete(
  '/delete',
  userJWTDTO,
  deletePermissions,
  gaPermissions,
  deleteDTO,
  assignDeleteController
);

export default assignRoutes;
