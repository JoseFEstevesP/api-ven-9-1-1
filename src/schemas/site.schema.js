import { sequelize } from '#Config/db.js';
import { DataTypes } from 'sequelize';
import { User } from './user.schema.js';
import { Technology } from './technology.schema.js';
import { Consumables } from './consumables.schema.js';
import { Furniture } from './furniture.schema.js';
import { Vehicle } from './vehicle.schema.js';

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
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '1',
  },
});

Site.hasMany(User, {
  foreignKey: 'uidSite',
  sourceKey: 'uid',
});
User.belongsTo(Site, {
  foreignKey: 'uidSite',
  targetId: 'uid',
});
Site.hasMany(Technology, {
  foreignKey: 'uidSite',
  sourceKey: 'uid',
});
Technology.belongsTo(Site, {
  foreignKey: 'uidSite',
  targetId: 'uid',
});
Site.hasMany(Consumables, {
  foreignKey: 'uidSite',
  sourceKey: 'uid',
});
Consumables.belongsTo(Site, {
  foreignKey: 'uidSite',
  targetId: 'uid',
});
Site.hasMany(Furniture, {
  foreignKey: 'uidSite',
  sourceKey: 'uid',
});
Furniture.belongsTo(Site, {
  foreignKey: 'uidSite',
  targetId: 'uid',
});
Site.hasMany(Vehicle, {
  foreignKey: 'uidSite',
  sourceKey: 'uid',
});
Vehicle.belongsTo(Site, {
  foreignKey: 'uidSite',
  targetId: 'uid',
});
