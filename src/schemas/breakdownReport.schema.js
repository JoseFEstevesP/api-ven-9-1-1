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
  problem: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  condition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  breakdownDepartment: {
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
  createAtDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  createAtTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  updateAtDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  updateAtTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
});
