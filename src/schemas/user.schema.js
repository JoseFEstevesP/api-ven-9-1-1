import { sequelize } from '#Config/db.js';
import { DataTypes } from 'sequelize';
import { BreakdownReport } from './breakdownReport.schema.js';
import { Consumables } from './consumables.schema.js';
import { Furniture } from './furniture.schema.js';
import { Purchase } from './purchase.schema.js';
import { Technology } from './technology.schema.js';
import { Vehicle } from './vehicle.schema.js';

export const User = sequelize.define('user', {
  uid: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  ci: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [6, 9],
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 20],
    },
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4, 50],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '1',
  },
});
User.hasMany(Technology, {
  foreignKey: 'uidUser',
  sourceKey: 'uid',
});
Technology.belongsTo(User, {
  foreignKey: 'uidUser',
  targetId: 'uid',
});
User.hasMany(Consumables, {
  foreignKey: 'uidUser',
  sourceKey: 'uid',
});
Consumables.belongsTo(User, {
  foreignKey: 'uidUser',
  targetId: 'uid',
});
User.hasMany(Furniture, {
  foreignKey: 'uidUser',
  sourceKey: 'uid',
});
Furniture.belongsTo(User, {
  foreignKey: 'uidUser',
  targetId: 'uid',
});
User.hasMany(Vehicle, {
  foreignKey: 'uidUser',
  sourceKey: 'uid',
});
Vehicle.belongsTo(User, {
  foreignKey: 'uidUser',
  targetId: 'uid',
});
User.hasMany(Purchase, {
  foreignKey: 'uidUser',
  sourceKey: 'uid',
});
Purchase.belongsTo(User, {
  foreignKey: 'uidUser',
  targetId: 'uid',
});
User.hasMany(BreakdownReport, {
  foreignKey: 'uidUser',
  sourceKey: 'uid',
});
BreakdownReport.belongsTo(User, {
  foreignKey: 'uidUser',
  targetId: 'uid',
});
