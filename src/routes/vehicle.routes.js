import vehicleDeleteController from '#Controllers/vehicle-delete.controller.js';
import vehicleReadController from '#Controllers/vehicle-read.controller.js';
import vehicleRegisterController from '#Controllers/vehicle-register.controller.js';
import vehicleReportController from '#Controllers/vehicle-report.controller.js';
import vehicleSearchController from '#Controllers/vehicle-search.controller.js';
import vehicleSearchItemController from '#Controllers/vehicle-searchItem.controller.js';
import vehicleUpdateController from '#Controllers/vehicle-update.controller.js';
import deleteDTO from '#Dto/delete.dto.js';
import vehicleRegisterDTO from '#Dto/vehicle-register.dto.js';
import createPurchasePermissions from '#Middleware/purchase/rol-createPurchase.middleware.js';
import deletePurchasePermissions from '#Middleware/purchase/rol-deletePurchase.middleware.js';
import readPurchasePermissions from '#Middleware/purchase/rol-readPurchase.middleware.js';
import updatePurchasePermissions from '#Middleware/purchase/rol-updatePurchase.middleware.js';
import gaPermissions from '#Middleware/rol-GA.middleware.js';
import pdfPermissions from '#Middleware/rol-pdf.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const vehicleRoutes = Router();

vehicleRoutes.post(
  '/register',
  userJWTDTO,
  gaPermissions,
  createPurchasePermissions,
  vehicleRegisterDTO,
  vehicleRegisterController
);
vehicleRoutes.get(
  '/list',
  userJWTDTO,
  gaPermissions,
  readPurchasePermissions,
  vehicleReadController
);
vehicleRoutes.get(
  '/item/:uid',
  userJWTDTO,
  gaPermissions,
  readPurchasePermissions,
  vehicleSearchItemController
);
vehicleRoutes.get(
  '/search/:search',
  userJWTDTO,
  gaPermissions,
  readPurchasePermissions,
  vehicleSearchController
);
vehicleRoutes.get(
  '/report',
  userJWTDTO,
  gaPermissions,
  pdfPermissions,
  vehicleReportController
);
vehicleRoutes.patch(
  '/update',
  userJWTDTO,
  gaPermissions,
  updatePurchasePermissions,
  vehicleRegisterDTO,
  vehicleUpdateController
);
vehicleRoutes.delete(
  '/delete',
  userJWTDTO,
  gaPermissions,
  deletePurchasePermissions,
  deleteDTO,
  vehicleDeleteController
);

export default vehicleRoutes;
