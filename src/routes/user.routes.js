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
import gaPermissions from '#Middleware/rol-GA.middleware.js';
import pdfPermissions from '#Middleware/rol-pdf.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import createUserPermissions from '#Middleware/user/rol-createUser.middleware.js';
import deleteUserPermissions from '#Middleware/user/rol-deleteUser.middleware.js';
import profilePermissions from '#Middleware/user/rol-profile.middleware.js';
import profileDeletePermissions from '#Middleware/user/rol-profileDelete.middleware.js';
import profileUpdatePermissions from '#Middleware/user/rol-profileUpdate.middleware.js';
import readUserPermissions from '#Middleware/user/rol-readUser.middleware.js';
import updateUserPermissions from '#Middleware/user/rol-updateUser.middleware.js';
import { Router } from 'express';
const userRoutes = Router();
userRoutes.post(
  '/register',
  userJWTDTO,
  gaPermissions,
  createUserPermissions,
  userRegisterDTO,
  userRegisterController
);
userRoutes.post('/login', userLoginDTO, userLoginController);
userRoutes.get(
  '/profile',
  userJWTDTO,
  gaPermissions,
  profilePermissions,
  userProfileController
);
userRoutes.get(
  '/list',
  userJWTDTO,
  gaPermissions,
  readUserPermissions,
  userReadController
);
userRoutes.get(
  '/item/:uid',
  userJWTDTO,
  gaPermissions,
  readUserPermissions,
  userSearchItemController
);
userRoutes.get(
  '/search/:search',
  userJWTDTO,
  gaPermissions,
  readUserPermissions,
  userSearchController
);
userRoutes.get(
  '/report',
  userJWTDTO,
  gaPermissions,
  pdfPermissions,
  userReportController
);
userRoutes.patch(
  '/update',
  userJWTDTO,
  gaPermissions,
  updateUserPermissions,
  userUpdateDTO,
  userUpdateController
);
userRoutes.patch(
  '/update-data',
  userJWTDTO,
  gaPermissions,
  profileUpdatePermissions,
  userUpdateDataDTO,
  userUpdateDataController
);
userRoutes.patch(
  '/update-email',
  userJWTDTO,
  gaPermissions,
  profileUpdatePermissions,
  userUpdateEmailDTO,
  userUpdateEmailController
);
userRoutes.patch(
  '/update-password',
  userJWTDTO,
  gaPermissions,
  profileUpdatePermissions,
  userUpdatePasswordDTO,
  userUpdatePasswordController
);
userRoutes.delete(
  '/unregister',
  userJWTDTO,
  gaPermissions,
  profileDeletePermissions,
  userUnregisterDTO,
  userUnregisterController
);
userRoutes.delete(
  '/delete',
  userJWTDTO,
  gaPermissions,
  deleteUserPermissions,
  deleteDTO,
  userDeleteController
);
export default userRoutes;
