import { sequelize } from '#Config/db.js';
import { DataTypes } from 'sequelize';
import { User } from './user.schema.js';

export const Site = sequelize.define('site', {
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
  direction: {
    type: DataTypes.STRING(3000),
    allowNull: false,
  },
});

Site.hasMany(User, {
  foreignKey: 'uidSite',
  sourceKey: 'uid',
});
User.belongsTo(Site, {
  foreignKey: 'uidRol',
  targetId: 'uid',
});
