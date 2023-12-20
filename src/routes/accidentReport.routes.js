import accidentReportDeleteController from '#Controllers/accidentReport-delete.controller.js';
import accidentReportReadController from '#Controllers/accidentReport-read.controller.js';
import accidentReportRegisterController from '#Controllers/accidentReport-register.controller.js';
import accidentReportSearchController from '#Controllers/accidentReport-search.controller.js';
import accidentReportSearchItemController from '#Controllers/accidentReport-searchItem.controller.js';
import accidentReportUpdateController from '#Controllers/accidentReport-update.controller.js';
import accidentReportRegisterDTO from '#Dto/accidentReport-register.dto.js';
import deleteDTO from '#Dto/delete.dto.js';
import createPermissions from '#Middleware/rol-create.middleware.js';
import deletePermissions from '#Middleware/rol-delete.middleware.js';
import readPermissions from '#Middleware/rol-read.middleware.js';
import updatePermissions from '#Middleware/rol-update.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const accidentReportRouter = Router();

accidentReportRouter.post(
  '/register',
  userJWTDTO,
  createPermissions,
  accidentReportRegisterDTO,
  accidentReportRegisterController
);
accidentReportRouter.get(
  '/list',
  userJWTDTO,
  readPermissions,
  accidentReportReadController
);
accidentReportRouter.get(
  '/item/:uid',
  userJWTDTO,
  readPermissions,
  accidentReportSearchItemController
);
accidentReportRouter.get(
  '/search/:search',
  userJWTDTO,
  readPermissions,
  accidentReportSearchController
);
accidentReportRouter.patch(
  '/update',
  userJWTDTO,
  updatePermissions,
  accidentReportRegisterDTO,
  accidentReportUpdateController
);
accidentReportRouter.delete(
  '/delete',
  userJWTDTO,
  deletePermissions,
  deleteDTO,
  accidentReportDeleteController
);

export default accidentReportRouter;
