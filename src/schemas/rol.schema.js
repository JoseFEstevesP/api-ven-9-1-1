import { sequelize } from '#Config/db.js';
import { DataTypes } from 'sequelize';
import { User } from './user.schema.js';

export const Rol = sequelize.define('rols', {
  uid: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 20],
    },
  },
  permissions: {
    type: DataTypes.STRING(3000),
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

Rol.hasMany(User, {
  foreignKey: 'uidRol',
  sourceKey: 'uid',
});
User.belongsTo(Rol, {
  foreignKey: 'uidRol',
  targetId: 'uid',
});
