import consumablesDeleteController from '#Controllers/consumables-delete.controller.js';
import consumablesReadController from '#Controllers/consumables-read.controller.js';
import consumablesRegisterController from '#Controllers/consumables-register.controller.js';
import consumablesReportController from '#Controllers/consumables-report.controller.js';
import consumablesSearchController from '#Controllers/consumables-search.controller.js';
import consumablesSearchItemController from '#Controllers/consumables-searchItem.controller.js';
import consumablesUpdateController from '#Controllers/consumables-update.controller.js';
import consumablesRegisterDTO from '#Dto/consumables-register.dto.js';
import deleteDTO from '#Dto/delete.dto.js';
import consumablesPermissions from '#Middleware/consumables/rol-consumables.middleware.js';
import createConsumablesPermissions from '#Middleware/consumables/rol-createConsumables.middleware.js';
import deleteConsumablesPermissions from '#Middleware/consumables/rol-deleteConsumables.middleware.js';
import pdfConsumablesPermissions from '#Middleware/consumables/rol-pdfConsumables.middleware.js';
import readConsumablesPermissions from '#Middleware/consumables/rol-readConsumables.middleware.js';
import updateConsumablesPermissions from '#Middleware/consumables/rol-updateConsumables.middleware.js';
import gaPermissions from '#Middleware/rol-GA.middleware.js';
import userCryptoDTO from '#Middleware/user-crypto.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const consumablesRoutes = Router();

consumablesRoutes.post(
  '/register',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  consumablesPermissions,
  createConsumablesPermissions,
  consumablesRegisterDTO,
  consumablesRegisterController
);
consumablesRoutes.get(
  '/list',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  consumablesPermissions,
  readConsumablesPermissions,
  consumablesReadController
);
consumablesRoutes.get(
  '/item/:uid',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  consumablesPermissions,
  readConsumablesPermissions,
  consumablesSearchItemController
);
consumablesRoutes.get(
  '/search/:search',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  consumablesPermissions,
  readConsumablesPermissions,
  consumablesSearchController
);
consumablesRoutes.get(
  '/report',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  consumablesPermissions,
  pdfConsumablesPermissions,
  consumablesReportController
);
consumablesRoutes.patch(
  '/update',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  consumablesPermissions,
  updateConsumablesPermissions,
  consumablesRegisterDTO,
  consumablesUpdateController
);
consumablesRoutes.delete(
  '/delete',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  consumablesPermissions,
  deleteConsumablesPermissions,
  deleteDTO,
  consumablesDeleteController
);

export default consumablesRoutes;
