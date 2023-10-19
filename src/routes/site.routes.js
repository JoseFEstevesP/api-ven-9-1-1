import siteDeleteController from '#Controllers/site-delete.controller.js';
import siteReadController from '#Controllers/site-read.controller.js';
import siteRegisterController from '#Controllers/site-register.controller.js';
import siteSearchController from '#Controllers/site-search.controller.js';
import siteSearchItemController from '#Controllers/site-searchItem.controller.js';
import siteUpdateController from '#Controllers/site-update.controller.js';
import deleteDTO from '#Dto/delete.dto.js';
import siteRegisterDTO from '#Dto/site-register.dto.js';
import createPermissions from '#Middleware/rol-create.middleware.js';
import deletePermissions from '#Middleware/rol-delete.middleware.js';
import readPermissions from '#Middleware/rol-read.middleware.js';
import updatePermissions from '#Middleware/rol-update.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const siteRoutes = Router();

siteRoutes.post(
  '/register',
  userJWTDTO,
  createPermissions,
  siteRegisterDTO,
  siteRegisterController
);
siteRoutes.get('/list', userJWTDTO, readPermissions, siteReadController);
siteRoutes.get(
  '/item/:uid',
  userJWTDTO,
  readPermissions,
  siteSearchItemController
);
siteRoutes.get('/search', userJWTDTO, readPermissions, siteSearchController);
siteRoutes.patch(
  '/update',
  userJWTDTO,
  updatePermissions,
  siteRegisterDTO,
  siteUpdateController
);
siteRoutes.delete(
  '/delete',
  userJWTDTO,
  deletePermissions,
  deleteDTO,
  siteDeleteController
);

export default siteRoutes;