import consumablesRoutes from '#Routes/consumables.routes.js';
import furnitureRoutes from '#Routes/furniture.routes.js';
import purchaseRoutes from '#Routes/purchase.routes.js';
import reportRoutes from '#Routes/report.routes.js';
import rolRoutes from '#Routes/rol.routes.js';
import siteRoutes from '#Routes/site.routes.js';
import technologyRoutes from '#Routes/technology.routes.js';
import userRoutes from '#Routes/user.routes.js';
import vehicleRoutes from '#Routes/vehicle.routes.js';
import cors from 'cors';
import express from 'express';
const expressApp = express();
// middleware
expressApp.use(express.json());
expressApp.use(cors());
// routes
expressApp.use('/user', userRoutes);
expressApp.use('/rol', rolRoutes);
expressApp.use('/site', siteRoutes);
expressApp.use('/technology', technologyRoutes);
expressApp.use('/consumables', consumablesRoutes);
expressApp.use('/furniture', furnitureRoutes);
expressApp.use('/vehicle', vehicleRoutes);
expressApp.use('/purchase', purchaseRoutes);
expressApp.use('/report', reportRoutes);
export default expressApp;
