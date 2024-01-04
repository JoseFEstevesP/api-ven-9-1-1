import consumablesDeleteController from '#Controllers/consumables-delete.controller.js';
import consumablesReadController from '#Controllers/consumables-read.controller.js';
import consumablesRegisterController from '#Controllers/consumables-register.controller.js';
import consumablesReportController from '#Controllers/consumables-report.controller.js';
import consumablesSearchController from '#Controllers/consumables-search.controller.js';
import consumablesSearchItemController from '#Controllers/consumables-searchItem.controller.js';
import consumablesUpdateController from '#Controllers/consumables-update.controller.js';
import consumablesRegisterDTO from '#Dto/consumables-register.dto.js';
import deleteDTO from '#Dto/delete.dto.js';
import createConsumablesPermissions from '#Middleware/consumables/rol-createConsumables.middleware.js';
import deleteConsumablesPermissions from '#Middleware/consumables/rol-deleteConsumables.middleware.js';
import readConsumablesPermissions from '#Middleware/consumables/rol-readConsumables.middleware.js';
import updateConsumablesPermissions from '#Middleware/consumables/rol-updateConsumables.middleware.js';
import gaPermissions from '#Middleware/rol-GA.middleware.js';
import pdfPermissions from '#Middleware/rol-pdf.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const consumablesRoutes = Router();

consumablesRoutes.post(
  '/register',
  userJWTDTO,
  gaPermissions,
  createConsumablesPermissions,
  consumablesRegisterDTO,
  consumablesRegisterController
);
consumablesRoutes.get(
  '/list',
  userJWTDTO,
  gaPermissions,
  readConsumablesPermissions,
  consumablesReadController
);
consumablesRoutes.get(
  '/item/:uid',
  userJWTDTO,
  gaPermissions,
  readConsumablesPermissions,
  consumablesSearchItemController
);
consumablesRoutes.get(
  '/search/:search',
  userJWTDTO,
  gaPermissions,
  readConsumablesPermissions,
  consumablesSearchController
);
consumablesRoutes.get(
  '/report',
  userJWTDTO,
  gaPermissions,
  pdfPermissions,
  consumablesReportController
);
consumablesRoutes.patch(
  '/update',
  userJWTDTO,
  gaPermissions,
  updateConsumablesPermissions,
  consumablesRegisterDTO,
  consumablesUpdateController
);
consumablesRoutes.delete(
  '/delete',
  userJWTDTO,
  gaPermissions,
  deleteConsumablesPermissions,
  deleteDTO,
  consumablesDeleteController
);

export default consumablesRoutes;
