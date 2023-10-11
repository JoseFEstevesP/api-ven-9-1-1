import { Sequelize } from 'sequelize';
import '#Config/env.js';
export const sequelize = new Sequelize(process.env.DB_URL);
