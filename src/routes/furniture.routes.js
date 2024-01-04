import furnitureDeleteController from '#Controllers/furniture-delete.controller.js';
import furnitureReadController from '#Controllers/furniture-read.controller.js';
import furnitureRegisterController from '#Controllers/furniture-register.controller.js';
import furnitureReportController from '#Controllers/furniture-report.controller.js';
import furnitureSearchController from '#Controllers/furniture-search.controller.js';
import furnitureSearchItemController from '#Controllers/furniture-searchItem.controller.js';
import furnitureUpdateController from '#Controllers/furniture-update.controller.js';
import deleteDTO from '#Dto/delete.dto.js';
import furnitureRegisterDTO from '#Dto/furniture-register.dto.js';
import createFurniturePermissions from '#Middleware/furniture/rol-createFurniture.middleware.js';
import deleteFurniturePermissions from '#Middleware/furniture/rol-deleteFurniture.middleware.js';
import readFurniturePermissions from '#Middleware/furniture/rol-readFurniture.middleware.js';
import updateFurniturePermissions from '#Middleware/furniture/rol-updateFurniture.middleware.js';
import gaPermissions from '#Middleware/rol-GA.middleware.js';
import pdfPermissions from '#Middleware/rol-pdf.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const furnitureRoutes = Router();

furnitureRoutes.post(
  '/register',
  userJWTDTO,
  gaPermissions,
  createFurniturePermissions,
  furnitureRegisterDTO,
  furnitureRegisterController
);
furnitureRoutes.get(
  '/list',
  userJWTDTO,
  gaPermissions,
  readFurniturePermissions,
  furnitureReadController
);
furnitureRoutes.get(
  '/item/:uid',
  userJWTDTO,
  gaPermissions,
  readFurniturePermissions,
  furnitureSearchItemController
);
furnitureRoutes.get(
  '/search/:search',
  userJWTDTO,
  gaPermissions,
  readFurniturePermissions,
  furnitureSearchController
);
furnitureRoutes.get(
  '/report',
  userJWTDTO,
  gaPermissions,
  pdfPermissions,
  furnitureReportController
);
furnitureRoutes.patch(
  '/update',
  userJWTDTO,
  gaPermissions,
  updateFurniturePermissions,
  furnitureRegisterDTO,
  furnitureUpdateController
);
furnitureRoutes.delete(
  '/delete',
  userJWTDTO,
  gaPermissions,
  deleteFurniturePermissions,
  deleteDTO,
  furnitureDeleteController
);

export default furnitureRoutes;
