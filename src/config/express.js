import rolRoutes from '#Routes/rol.routes.js';
import siteRoutes from '#Routes/site.routes.js';
import userRoutes from '#Routes/user.routes.js';
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
export default expressApp;
