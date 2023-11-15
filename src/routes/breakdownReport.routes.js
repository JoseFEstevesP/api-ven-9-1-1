import breakdownReportDeleteController from '#Controllers/breakdownReport-delete.controller.js';
import breakdownReportReadController from '#Controllers/breakdownReport-read.controller.js';
import breakdownReportRegisterController from '#Controllers/breakdownReport-register.controller.js';
import breakdownReportSearchController from '#Controllers/breakdownReport-search.controller.js';
import breakdownReportSearchItemController from '#Controllers/breakdownReport-searchItem.controller.js';
import breakdownReportUpdateController from '#Controllers/breakdownReport-update.controller.js';
import deleteDTO from '#Dto/delete.dto.js';
import breakdownReportRegisterDTO from '#Dto/report-register.dto.js';
import gaPermissions from '#Middleware/rol-GA.middleware.js';
import createPermissions from '#Middleware/rol-create.middleware.js';
import deletePermissions from '#Middleware/rol-delete.middleware.js';
import readPermissions from '#Middleware/rol-read.middleware.js';
import updatePermissions from '#Middleware/rol-update.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const breakdownReportRoutes = Router();

breakdownReportRoutes.post(
  '/register',
  userJWTDTO,
  createPermissions,
  gaPermissions,
  breakdownReportRegisterDTO,
  breakdownReportRegisterController
);
breakdownReportRoutes.get(
  '/list',
  userJWTDTO,
  readPermissions,
  gaPermissions,
  breakdownReportReadController
);
breakdownReportRoutes.get(
  '/item/:uid',
  userJWTDTO,
  readPermissions,
  gaPermissions,
  breakdownReportSearchItemController
);
breakdownReportRoutes.get(
  '/search/:search',
  userJWTDTO,
  readPermissions,
  gaPermissions,
  breakdownReportSearchController
);
breakdownReportRoutes.patch(
  '/update',
  userJWTDTO,
  updatePermissions,
  gaPermissions,
  breakdownReportRegisterDTO,
  breakdownReportUpdateController
);
breakdownReportRoutes.delete(
  '/delete',
  userJWTDTO,
  deletePermissions,
  gaPermissions,
  deleteDTO,
  breakdownReportDeleteController
);

export default breakdownReportRoutes;
