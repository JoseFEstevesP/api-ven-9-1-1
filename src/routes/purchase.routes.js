import purchaseSearchController from '#Controllers/product-search.controller.js';
import purchaseDeleteController from '#Controllers/purchase-delete.controller.js';
import purchaseReadController from '#Controllers/purchase-read.controller.js';
import purchaseRegisterController from '#Controllers/purchase-register.controller.js';
import purchaseSearchItemController from '#Controllers/purchase-searchItem.controller.js';
import purchaseUpdateController from '#Controllers/purchase-update.controller.js';
import deleteDTO from '#Dto/delete.dto.js';
import purchaseRegisterDTO from '#Dto/purchase-register.dto.js';
import gaPermissions from '#Middleware/rol-GA.middleware.js';
import createPermissions from '#Middleware/rol-create.middleware.js';
import deletePermissions from '#Middleware/rol-delete.middleware.js';
import readPermissions from '#Middleware/rol-read.middleware.js';
import updatePermissions from '#Middleware/rol-update.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const purchaseRoutes = Router();

purchaseRoutes.post(
  '/register',
  userJWTDTO,
  createPermissions,
  gaPermissions,
  purchaseRegisterDTO,
  purchaseRegisterController
);
purchaseRoutes.get(
  '/list',
  userJWTDTO,
  readPermissions,
  gaPermissions,
  purchaseReadController
);
purchaseRoutes.get(
  '/item/:uid',
  userJWTDTO,
  readPermissions,
  gaPermissions,
  purchaseSearchItemController
);
purchaseRoutes.get(
  '/search/:search',
  userJWTDTO,
  readPermissions,
  gaPermissions,
  purchaseSearchController
);
purchaseRoutes.patch(
  '/update',
  userJWTDTO,
  updatePermissions,
  gaPermissions,
  purchaseRegisterDTO,
  purchaseUpdateController
);
purchaseRoutes.delete(
  '/delete',
  userJWTDTO,
  deletePermissions,
  gaPermissions,
  deleteDTO,
  purchaseDeleteController
);

export default purchaseRoutes;
