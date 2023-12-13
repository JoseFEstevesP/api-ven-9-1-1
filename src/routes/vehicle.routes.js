import vehicleDeleteController from '#Controllers/vehicle-delete.controller.js';
import vehicleReadController from '#Controllers/vehicle-read.controller.js';
import vehicleRegisterController from '#Controllers/vehicle-register.controller.js';
import vehicleReportController from '#Controllers/vehicle-report.controller.js';
import vehicleSearchController from '#Controllers/vehicle-search.controller.js';
import vehicleSearchItemController from '#Controllers/vehicle-searchItem.controller.js';
import vehicleUpdateController from '#Controllers/vehicle-update.controller.js';
import deleteDTO from '#Dto/delete.dto.js';
import vehicleRegisterDTO from '#Dto/vehicle-register.dto.js';
import gaPermissions from '#Middleware/rol-GA.middleware.js';
import createPermissions from '#Middleware/rol-create.middleware.js';
import deletePermissions from '#Middleware/rol-delete.middleware.js';
import readPermissions from '#Middleware/rol-read.middleware.js';
import updatePermissions from '#Middleware/rol-update.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const vehicleRoutes = Router();

vehicleRoutes.post(
  '/register',
  userJWTDTO,
  createPermissions,
  gaPermissions,
  vehicleRegisterDTO,
  vehicleRegisterController
);
vehicleRoutes.get(
  '/list',
  userJWTDTO,
  readPermissions,
  gaPermissions,
  vehicleReadController
);
vehicleRoutes.get(
  '/item/:uid',
  userJWTDTO,
  readPermissions,
  gaPermissions,
  vehicleSearchItemController
);
vehicleRoutes.get(
  '/search/:search',
  userJWTDTO,
  readPermissions,
  gaPermissions,
  vehicleSearchController
);
vehicleRoutes.get(
  '/report',
  userJWTDTO,
  readPermissions,
  vehicleReportController
);
vehicleRoutes.patch(
  '/update',
  userJWTDTO,
  updatePermissions,
  gaPermissions,
  vehicleRegisterDTO,
  vehicleUpdateController
);
vehicleRoutes.delete(
  '/delete',
  userJWTDTO,
  deletePermissions,
  gaPermissions,
  deleteDTO,
  vehicleDeleteController
);

export default vehicleRoutes;
