import technologyDeleteController from '#Controllers/technology-delete.controller.js';
import technologyReadController from '#Controllers/technology-read.controller.js';
import technologyRegisterController from '#Controllers/technology-register.controller.js';
import technologyReportController from '#Controllers/technology-report.controller.js';
import technologySearchController from '#Controllers/technology-search.controller.js';
import technologySearchItemController from '#Controllers/technology-searchItem.controller.js';
import technologyUpdateController from '#Controllers/technology-update.controller.js';
import deleteDTO from '#Dto/delete.dto.js';
import technologyRegisterDTO from '#Dto/technology-register.dto.js';
import gaPermissions from '#Middleware/rol-GA.middleware.js';
import pdfPermissions from '#Middleware/rol-pdf.middleware.js';
import createTechnologyPermissions from '#Middleware/technology/rol-createTechnology.middleware.js';
import deleteTechnologyPermissions from '#Middleware/technology/rol-deleteTechnology.middleware.js';
import readTechnologyPermissions from '#Middleware/technology/rol-readTechnology.middleware.js';
import updateTechnologyPermissions from '#Middleware/technology/rol-updateTechnology.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const technologyRoutes = Router();

technologyRoutes.post(
  '/register',
  userJWTDTO,
  gaPermissions,
  createTechnologyPermissions,
  technologyRegisterDTO,
  technologyRegisterController
);
technologyRoutes.get(
  '/list',
  userJWTDTO,
  gaPermissions,
  readTechnologyPermissions,
  technologyReadController
);
technologyRoutes.get(
  '/item/:uid',
  userJWTDTO,
  gaPermissions,
  readTechnologyPermissions,
  technologySearchItemController
);
technologyRoutes.get(
  '/search/:search',
  userJWTDTO,
  gaPermissions,
  readTechnologyPermissions,
  technologySearchController
);
technologyRoutes.get(
  '/report',
  userJWTDTO,
  gaPermissions,
  pdfPermissions,
  technologyReportController
);
technologyRoutes.patch(
  '/update',
  userJWTDTO,
  gaPermissions,
  updateTechnologyPermissions,
  technologyRegisterDTO,
  technologyUpdateController
);
technologyRoutes.delete(
  '/delete',
  userJWTDTO,
  gaPermissions,
  deleteTechnologyPermissions,
  deleteDTO,
  technologyDeleteController
);

export default technologyRoutes;
