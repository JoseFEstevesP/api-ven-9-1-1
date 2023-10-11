import { sequelize } from '#Config/db.js';
import { DataTypes } from 'sequelize';
import { User } from './user.schema.js';

export const Rol = sequelize.define('rol', {
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
});

Rol.hasMany(User, {
  foreignKey: 'uidRol',
  sourceKey: 'uid',
});
User.belongsTo(Rol, {
  foreignKey: 'uidRol',
  targetId: 'uid',
});
