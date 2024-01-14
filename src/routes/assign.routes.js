import assignDeleteController from '#Controllers/assign-delete.controller.js';
import assignReadController from '#Controllers/assign-read.controller.js';
import inventoryReadController from '#Controllers/assign-readInventory.controller.js';
import assignRegisterController from '#Controllers/assign-register.controller.js';
import assignReportController from '#Controllers/assign-report.controller.js';
import assignSearchController from '#Controllers/assign-search.controller.js';
import assignSearchItemController from '#Controllers/assign-searchItem.controller.js';
import assignUpdateController from '#Controllers/assign-update.controller.js';
import assignRegisterDTO from '#Dto/assign-register.dto.js';
import deleteDTO from '#Dto/delete.dto.js';
import assignPermissions from '#Middleware/assign/rol-assign.middleware.js';
import createAssignPermissions from '#Middleware/assign/rol-createAssign.middleware.js';
import deleteAssignPermissions from '#Middleware/assign/rol-deleteAssign.middleware.js';
import pdfAssignPermissions from '#Middleware/assign/rol-pdfAssign.middleware.js';
import readAssignPermissions from '#Middleware/assign/rol-readAssign.middleware.js';
import updateAssignPermissions from '#Middleware/assign/rol-updateAssign.middleware.js';
import gaPermissions from '#Middleware/rol-GA.middleware.js';
import userCryptoDTO from '#Middleware/user-crypto.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const assignRoutes = Router();

assignRoutes.post(
  '/register',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  assignPermissions,
  createAssignPermissions,
  assignRegisterDTO,
  assignRegisterController
);
assignRoutes.get(
  '/list',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  assignPermissions,
  readAssignPermissions,
  assignReadController
);
assignRoutes.get(
  '/listInventory/:inventory',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  assignPermissions,
  readAssignPermissions,
  inventoryReadController
);
assignRoutes.get(
  '/item/:uid',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  assignPermissions,
  readAssignPermissions,
  assignSearchItemController
);
assignRoutes.get(
  '/search/:search',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  assignPermissions,
  readAssignPermissions,
  assignSearchController
);
assignRoutes.get(
  '/report',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  assignPermissions,
  pdfAssignPermissions,
  assignReportController
);
assignRoutes.patch(
  '/update',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  assignPermissions,
  updateAssignPermissions,
  assignRegisterDTO,
  assignUpdateController
);
assignRoutes.delete(
  '/delete',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  assignPermissions,
  deleteAssignPermissions,
  deleteDTO,
  assignDeleteController
);

export default assignRoutes;
