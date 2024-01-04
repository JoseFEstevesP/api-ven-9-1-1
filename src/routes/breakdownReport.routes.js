import breakdownReportDeleteController from '#Controllers/breakdownReport-delete.controller.js';
import breakdownReportReadController from '#Controllers/breakdownReport-read.controller.js';
import breakdownReportRegisterController from '#Controllers/breakdownReport-register.controller.js';
import breakdownReportController from '#Controllers/breakdownReport-report.controller.js';
import breakdownReportSearchController from '#Controllers/breakdownReport-search.controller.js';
import breakdownReportSearchItemController from '#Controllers/breakdownReport-searchItem.controller.js';
import breakdownReportUpdateController from '#Controllers/breakdownReport-update.controller.js';
import deleteDTO from '#Dto/delete.dto.js';
import breakdownReportRegisterDTO from '#Dto/report-register.dto.js';
import createBreakdownReportPermissions from '#Middleware/breakdownReport/rol-createBreakdownReport.middleware.js';
import deleteBreakdownReportPermissions from '#Middleware/breakdownReport/rol-deleteBreakdownReport.middleware.js';
import readBreakdownReportPermissions from '#Middleware/breakdownReport/rol-readBreakdownReport.middleware.js';
import updateBreakdownReportPermissions from '#Middleware/breakdownReport/rol-updateBreakdownReport.middleware.js';
import gaPermissions from '#Middleware/rol-GA.middleware.js';
import pdfPermissions from '#Middleware/rol-pdf.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const breakdownReportRoutes = Router();

breakdownReportRoutes.post(
  '/register',
  userJWTDTO,
  gaPermissions,
  createBreakdownReportPermissions,
  breakdownReportRegisterDTO,
  breakdownReportRegisterController
);
breakdownReportRoutes.get(
  '/list',
  userJWTDTO,
  gaPermissions,
  readBreakdownReportPermissions,
  breakdownReportReadController
);
breakdownReportRoutes.get(
  '/item/:uid',
  userJWTDTO,
  gaPermissions,
  readBreakdownReportPermissions,
  breakdownReportSearchItemController
);
breakdownReportRoutes.get(
  '/search/:search',
  userJWTDTO,
  gaPermissions,
  readBreakdownReportPermissions,
  breakdownReportSearchController
);
breakdownReportRoutes.get(
  '/report',
  userJWTDTO,
  gaPermissions,
  pdfPermissions,
  breakdownReportController
);
breakdownReportRoutes.patch(
  '/update',
  userJWTDTO,
  gaPermissions,
  updateBreakdownReportPermissions,
  breakdownReportRegisterDTO,
  breakdownReportUpdateController
);
breakdownReportRoutes.delete(
  '/delete',
  userJWTDTO,
  gaPermissions,
  deleteBreakdownReportPermissions,
  deleteDTO,
  breakdownReportDeleteController
);

export default breakdownReportRoutes;
