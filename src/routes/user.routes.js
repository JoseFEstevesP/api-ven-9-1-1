import userDeleteController from '#Controllers/user-delete.controller.js';
import userLoginController from '#Controllers/user-login.controller.js';
import userProfileController from '#Controllers/user-profile.controller.js';
import userReadController from '#Controllers/user-read.controller.js';
import userRegisterController from '#Controllers/user-register.controller.js';
import userReportController from '#Controllers/user-report.controller.js';
import userSearchController from '#Controllers/user-search.controller.js';
import userSearchItemController from '#Controllers/user-searchItem.controller.js';
import userUnregisterController from '#Controllers/user-unregister.controller.js';
import userUpdateDataController from '#Controllers/user-update-data.controller.js';
import userUpdateEmailController from '#Controllers/user-update-email.controller.js';
import userUpdatePasswordController from '#Controllers/user-update-password.controller.js';
import userUpdateController from '#Controllers/user-update.controller.js';
import deleteDTO from '#Dto/delete.dto.js';
import userLoginDTO from '#Dto/user-login.dto.js';
import userRegisterDTO from '#Dto/user-register.dto.js';
import userUnregisterDTO from '#Dto/user-unregister.dto.js';
import userUpdateDataDTO from '#Dto/user-update-data.dto.js';
import userUpdateEmailDTO from '#Dto/user-update-email.dto.js';
import userUpdatePasswordDTO from '#Dto/user-update-password.dto.js';
import userUpdateDTO from '#Dto/user-update.dto.js';
import createPermissions from '#Middleware/rol-create.middleware.js';
import deletePermissions from '#Middleware/rol-delete.middleware.js';
import profilePermissions from '#Middleware/rol-profile.middleware.js';
import readPermissions from '#Middleware/rol-read.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';
const userRoutes = Router();
userRoutes.post(
  '/register',
  userJWTDTO,
  createPermissions,
  userRegisterDTO,
  userRegisterController
);
userRoutes.post('/login', userLoginDTO, userLoginController);
userRoutes.get(
  '/profile',
  userJWTDTO,
  profilePermissions,
  userProfileController
);
userRoutes.get('/list', userJWTDTO, readPermissions, userReadController);
userRoutes.get(
  '/item/:uid',
  userJWTDTO,
  readPermissions,
  userSearchItemController
);
userRoutes.get(
  '/search/:search',
  userJWTDTO,
  readPermissions,
  userSearchController
);
userRoutes.get('/report', userJWTDTO, readPermissions, userReportController);
userRoutes.patch(
  '/update',
  userJWTDTO,
  profilePermissions,
  userUpdateDTO,
  userUpdateController
);
userRoutes.patch(
  '/update-data',
  userJWTDTO,
  profilePermissions,
  userUpdateDataDTO,
  userUpdateDataController
);
userRoutes.patch(
  '/update-email',
  userJWTDTO,
  profilePermissions,
  userUpdateEmailDTO,
  userUpdateEmailController
);
userRoutes.patch(
  '/update-password',
  userJWTDTO,
  profilePermissions,
  userUpdatePasswordDTO,
  userUpdatePasswordController
);
userRoutes.delete(
  '/unregister',
  userJWTDTO,
  profilePermissions,
  userUnregisterDTO,
  userUnregisterController
);
userRoutes.delete(
  '/delete',
  userJWTDTO,
  deletePermissions,
  deleteDTO,
  userDeleteController
);
export default userRoutes;
