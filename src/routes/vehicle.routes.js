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
import userCryptoDTO from '#Middleware/user-crypto.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import createVehiclePermissions from '#Middleware/vehicle/rol-createVehicle.middleware.js';
import deleteVehiclePermissions from '#Middleware/vehicle/rol-deleteVehicle.middleware.js';
import pdfVehiclePermissions from '#Middleware/vehicle/rol-pdfVehicle.middleware.js';
import readVehiclePermissions from '#Middleware/vehicle/rol-readVehicle.middleware.js';
import updateVehiclePermissions from '#Middleware/vehicle/rol-updateVehicle.middleware.js';
import vehiclePermissions from '#Middleware/vehicle/rol-vehicle.middleware.js';
import { Router } from 'express';

const vehicleRoutes = Router();

vehicleRoutes.post(
  '/register',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  vehiclePermissions,
  createVehiclePermissions,
  vehicleRegisterDTO,
  vehicleRegisterController
);
vehicleRoutes.get(
  '/list',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  vehiclePermissions,
  readVehiclePermissions,
  vehicleReadController
);
vehicleRoutes.get(
  '/item/:uid',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  vehiclePermissions,
  readVehiclePermissions,
  vehicleSearchItemController
);
vehicleRoutes.get(
  '/search/:search',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  vehiclePermissions,
  readVehiclePermissions,
  vehicleSearchController
);
vehicleRoutes.get(
  '/report',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  vehiclePermissions,
  pdfVehiclePermissions,
  vehicleReportController
);
vehicleRoutes.patch(
  '/update',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  vehiclePermissions,
  updateVehiclePermissions,
  vehicleRegisterDTO,
  vehicleUpdateController
);
vehicleRoutes.delete(
  '/delete',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  vehiclePermissions,
  deleteVehiclePermissions,
  deleteDTO,
  vehicleDeleteController
);

export default vehicleRoutes;
