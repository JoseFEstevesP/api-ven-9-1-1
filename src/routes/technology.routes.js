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
import createTechnologyPermissions from '#Middleware/technology/rol-createTechnology.middleware.js';
import deleteTechnologyPermissions from '#Middleware/technology/rol-deleteTechnology.middleware.js';
import pdfTechnologyPermissions from '#Middleware/technology/rol-pdfTechnology.middleware.js';
import readTechnologyPermissions from '#Middleware/technology/rol-readTechnology.middleware.js';
import technologyPermissions from '#Middleware/technology/rol-technology.middleware.js';
import updateTechnologyPermissions from '#Middleware/technology/rol-updateTechnology.middleware.js';
import userCryptoDTO from '#Middleware/user-crypto.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const technologyRoutes = Router();

technologyRoutes.post(
  '/register',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  technologyPermissions,
  createTechnologyPermissions,
  technologyRegisterDTO,
  technologyRegisterController
);
technologyRoutes.get(
  '/list',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  technologyPermissions,
  readTechnologyPermissions,
  technologyReadController
);
technologyRoutes.get(
  '/item/:uid',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  technologyPermissions,
  readTechnologyPermissions,
  technologySearchItemController
);
technologyRoutes.get(
  '/search/:search',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  technologyPermissions,
  readTechnologyPermissions,
  technologySearchController
);
technologyRoutes.get(
  '/report',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  technologyPermissions,
  pdfTechnologyPermissions,
  technologyReportController
);
technologyRoutes.patch(
  '/update',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  technologyPermissions,
  updateTechnologyPermissions,
  technologyRegisterDTO,
  technologyUpdateController
);
technologyRoutes.delete(
  '/delete',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  technologyPermissions,
  deleteTechnologyPermissions,
  deleteDTO,
  technologyDeleteController
);

export default technologyRoutes;
