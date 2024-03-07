import { sequelize } from '#Config/db.js';
import { DataTypes } from 'sequelize';

export const Consumables = sequelize.define('consumables', {
  uid: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING(3000),
    allowNull: false,
  },
  serial: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assign: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '0',
  },
  dateOfAcquisition: {
    type: DataTypes.STRING,
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
