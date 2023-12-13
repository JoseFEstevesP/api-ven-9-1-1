import furnitureDeleteController from '#Controllers/furniture-delete.controller.js';
import furnitureReadController from '#Controllers/furniture-read.controller.js';
import furnitureRegisterController from '#Controllers/furniture-register.controller.js';
import furnitureReportController from '#Controllers/furniture-report.controller.js';
import furnitureSearchController from '#Controllers/furniture-search.controller.js';
import furnitureSearchItemController from '#Controllers/furniture-searchItem.controller.js';
import furnitureUpdateController from '#Controllers/furniture-update.controller.js';
import deleteDTO from '#Dto/delete.dto.js';
import furnitureRegisterDTO from '#Dto/furniture-register.dto.js';
import gaPermissions from '#Middleware/rol-GA.middleware.js';
import createPermissions from '#Middleware/rol-create.middleware.js';
import deletePermissions from '#Middleware/rol-delete.middleware.js';
import readPermissions from '#Middleware/rol-read.middleware.js';
import updatePermissions from '#Middleware/rol-update.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const furnitureRoutes = Router();

furnitureRoutes.post(
  '/register',
  userJWTDTO,
  createPermissions,
  gaPermissions,
  furnitureRegisterDTO,
  furnitureRegisterController
);
furnitureRoutes.get(
  '/list',
  userJWTDTO,
  readPermissions,
  gaPermissions,
  furnitureReadController
);
furnitureRoutes.get(
  '/item/:uid',
  userJWTDTO,
  readPermissions,
  gaPermissions,
  furnitureSearchItemController
);
furnitureRoutes.get(
  '/search/:search',
  userJWTDTO,
  readPermissions,
  gaPermissions,
  furnitureSearchController
);
furnitureRoutes.get(
  '/report',
  userJWTDTO,
  readPermissions,
  furnitureReportController
);
furnitureRoutes.patch(
  '/update',
  userJWTDTO,
  updatePermissions,
  gaPermissions,
  furnitureRegisterDTO,
  furnitureUpdateController
);
furnitureRoutes.delete(
  '/delete',
  userJWTDTO,
  deletePermissions,
  gaPermissions,
  deleteDTO,
  furnitureDeleteController
);

export default furnitureRoutes;
