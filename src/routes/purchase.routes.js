import purchaseSearchController from '#Controllers/product-search.controller.js';
import purchaseDeleteController from '#Controllers/purchase-delete.controller.js';
import purchaseReadController from '#Controllers/purchase-read.controller.js';
import purchaseRegisterController from '#Controllers/purchase-register.controller.js';
import purchaseReportController from '#Controllers/purchase-report.controller.js';
import purchaseSearchItemController from '#Controllers/purchase-searchItem.controller.js';
import purchaseUpdateController from '#Controllers/purchase-update.controller.js';
import deleteDTO from '#Dto/delete.dto.js';
import purchaseRegisterDTO from '#Dto/purchase-register.dto.js';
import createPurchasePermissions from '#Middleware/purchase/rol-createPurchase.middleware.js';
import deletePurchasePermissions from '#Middleware/purchase/rol-deletePurchase.middleware.js';
import pdfPurchasePermissions from '#Middleware/purchase/rol-pdfPurchase.middleware.js';
import purchasePermissions from '#Middleware/purchase/rol-purchase.middleware.js';
import readPurchasePermissions from '#Middleware/purchase/rol-readPurchase.middleware.js';
import updatePurchasePermissions from '#Middleware/purchase/rol-updatePurchase.middleware.js';
import gaPermissions from '#Middleware/rol-GA.middleware.js';
import userCryptoDTO from '#Middleware/user-crypto.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const purchaseRoutes = Router();

purchaseRoutes.post(
  '/register',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  purchasePermissions,
  createPurchasePermissions,
  purchaseRegisterDTO,
  purchaseRegisterController
);
purchaseRoutes.get(
  '/list',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  purchasePermissions,
  readPurchasePermissions,
  purchaseReadController
);
purchaseRoutes.get(
  '/item/:uid',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  purchasePermissions,
  readPurchasePermissions,
  purchaseSearchItemController
);
purchaseRoutes.get(
  '/search/:search',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  purchasePermissions,
  readPurchasePermissions,
  purchaseSearchController
);
purchaseRoutes.get(
  '/report',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  purchasePermissions,
  pdfPurchasePermissions,
  purchaseReportController
);
purchaseRoutes.patch(
  '/update',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  purchasePermissions,
  updatePurchasePermissions,
  purchaseRegisterDTO,
  purchaseUpdateController
);
purchaseRoutes.delete(
  '/delete',
  userCryptoDTO,
  userJWTDTO,
  gaPermissions,
  purchasePermissions,
  deletePurchasePermissions,
  deleteDTO,
  purchaseDeleteController
);

export default purchaseRoutes;
