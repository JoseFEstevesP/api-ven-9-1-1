import breakdownReportRoutes from '#Routes/breakdownReport.routes.js';
import consumablesRoutes from '#Routes/consumables.routes.js';
import furnitureRoutes from '#Routes/furniture.routes.js';
import purchaseRoutes from '#Routes/purchase.routes.js';
import rolRoutes from '#Routes/rol.routes.js';
import siteRoutes from '#Routes/site.routes.js';
import technologyRoutes from '#Routes/technology.routes.js';
import userRoutes from '#Routes/user.routes.js';
import vehicleRoutes from '#Routes/vehicle.routes.js';
import cors from 'cors';
import express from 'express';
const allowedOrigins = [
  'http://localhost:5173',
  'https://ven911j30.vercel.app',
];
const expressApp = express();
// middleware
expressApp.use(express.json());
expressApp.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Origen no permitido'), false);
      }
    },
  })
);
// routes
expressApp.use('/user', userRoutes);
expressApp.use('/rol', rolRoutes);
expressApp.use('/site', siteRoutes);
expressApp.use('/technology', technologyRoutes);
expressApp.use('/consumables', consumablesRoutes);
expressApp.use('/furniture', furnitureRoutes);
expressApp.use('/vehicle', vehicleRoutes);
expressApp.use('/purchase', purchaseRoutes);
expressApp.use('/breakdownReport', breakdownReportRoutes);
export default expressApp;
