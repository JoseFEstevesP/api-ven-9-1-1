import breakdownReportDeleteController from '#Controllers/breakdownReport-delete.controller.js';
import breakdownReportReadController from '#Controllers/breakdownReport-read.controller.js';
import breakdownReportRegisterController from '#Controllers/breakdownReport-register.controller.js';
import breakdownReportController from '#Controllers/breakdownReport-report.controller.js';
import breakdownReportSearchController from '#Controllers/breakdownReport-search.controller.js';
import breakdownReportSearchItemController from '#Controllers/breakdownReport-searchItem.controller.js';
import breakdownReportUpdateController from '#Controllers/breakdownReport-update.controller.js';
import deleteDTO from '#Dto/delete.dto.js';
import breakdownReportRegisterDTO from '#Dto/report-register.dto.js';
import breakdownReportPermissions from '#Middleware/breakdownReport/rol-breakdownReport.middleware.js';
import createBreakdownReportPermissions from '#Middleware/breakdownReport/rol-createBreakdownReport.middleware.js';
import deleteBreakdownReportPermissions from '#Middleware/breakdownReport/rol-deleteBreakdownReport.middleware.js';
import pdfBreakdownReportPermissions from '#Middleware/breakdownReport/rol-pdfBreakdownReport.middleware.js';
import readBreakdownReportPermissions from '#Middleware/breakdownReport/rol-readBreakdownReport.middleware.js';
import updateBreakdownReportPermissions from '#Middleware/breakdownReport/rol-updateBreakdownReport.middleware.js';
import gaPermissions from '#Middleware/rol-GA.middleware.js';
import userCryptoDTO from '#Middleware/user-crypto.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const breakdownReportRoutes = Router();

breakdownReportRoutes.post(
  '/register',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  breakdownReportPermissions,
  createBreakdownReportPermissions,
  breakdownReportRegisterDTO,
  breakdownReportRegisterController
);
breakdownReportRoutes.get(
  '/list',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  breakdownReportPermissions,
  readBreakdownReportPermissions,
  breakdownReportReadController
);
breakdownReportRoutes.get(
  '/item/:uid',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  breakdownReportPermissions,
  readBreakdownReportPermissions,
  breakdownReportSearchItemController
);
breakdownReportRoutes.get(
  '/search/:search',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  breakdownReportPermissions,
  readBreakdownReportPermissions,
  breakdownReportSearchController
);
breakdownReportRoutes.get(
  '/report',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  breakdownReportPermissions,
  pdfBreakdownReportPermissions,
  breakdownReportController
);
breakdownReportRoutes.patch(
  '/update',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  breakdownReportPermissions,
  updateBreakdownReportPermissions,
  breakdownReportRegisterDTO,
  breakdownReportUpdateController
);
breakdownReportRoutes.delete(
  '/delete',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  breakdownReportPermissions,
  deleteBreakdownReportPermissions,
  deleteDTO,
  breakdownReportDeleteController
);

export default breakdownReportRoutes;
