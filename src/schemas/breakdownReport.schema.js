import { sequelize } from '#Config/db.js';
import { DataTypes } from 'sequelize';

export const BreakdownReport = sequelize.define('breakdownReport', {
  uid: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  goods: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  proposedSolution: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  condition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOfReport: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timeOfReport: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  serialOrCodeBN: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '1',
  },
});
