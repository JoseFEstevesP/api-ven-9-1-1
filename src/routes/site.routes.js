import siteDeleteController from '#Controllers/site-delete.controller.js';
import siteReadController from '#Controllers/site-read.controller.js';
import siteReadOfLimitController from '#Controllers/site-readOfLimit.controller.js';
import siteRegisterController from '#Controllers/site-register.controller.js';
import siteReportController from '#Controllers/site-report.controller.js';
import siteSearchController from '#Controllers/site-search.controller.js';
import siteSearchItemController from '#Controllers/site-searchItem.controller.js';
import siteUpdateController from '#Controllers/site-update.controller.js';
import deleteDTO from '#Dto/delete.dto.js';
import siteRegisterDTO from '#Dto/site-register.dto.js';
import gaPermissions from '#Middleware/rol-GA.middleware.js';
import pdfPermissions from '#Middleware/rol-pdf.middleware.js';
import createSitePermissions from '#Middleware/site/rol-createSite.middleware.js';
import deleteSitePermissions from '#Middleware/site/rol-deleteSite.middleware.js';
import readSitePermissions from '#Middleware/site/rol-readSite.middleware.js';
import updateSitePermissions from '#Middleware/site/rol-updateSite.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const siteRoutes = Router();

siteRoutes.post(
  '/register',
  userJWTDTO,
  gaPermissions,
  createSitePermissions,
  siteRegisterDTO,
  siteRegisterController
);
siteRoutes.get(
  '/list',
  userJWTDTO,
  gaPermissions,
  readSitePermissions,
  siteReadController
);
siteRoutes.get(
  '/list_of_limit',
  userJWTDTO,
  gaPermissions,
  readSitePermissions,
  siteReadOfLimitController
);
siteRoutes.get(
  '/item/:uid',
  userJWTDTO,
  gaPermissions,
  readSitePermissions,
  siteSearchItemController
);
siteRoutes.get(
  '/search/:search',
  userJWTDTO,
  gaPermissions,
  readSitePermissions,
  siteSearchController
);
siteRoutes.get(
  '/report',
  userJWTDTO,
  gaPermissions,
  pdfPermissions,
  siteReportController
);
siteRoutes.patch(
  '/update',
  userJWTDTO,
  gaPermissions,
  updateSitePermissions,
  siteRegisterDTO,
  siteUpdateController
);
siteRoutes.delete(
  '/delete',
  userJWTDTO,
  gaPermissions,
  deleteSitePermissions,
  deleteDTO,
  siteDeleteController
);

export default siteRoutes;
