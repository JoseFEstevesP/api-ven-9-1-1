import { sequelize } from '#Config/db.js';
import { DataTypes } from 'sequelize';

export const AccidentReport = sequelize.define('accidentReport', {
  uid: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  addressState: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addressParish: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addressMunicipality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  incidentType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descriptionIncident: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patientData: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  responseTeam: {
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
