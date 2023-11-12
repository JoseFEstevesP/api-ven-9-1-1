import { sequelize } from '#Config/db.js';
import { DataTypes } from 'sequelize';
import { Technology } from './technology.schema.js';
import { Consumables } from './consumables.schema.js';
import { Furniture } from './furniture.schema.js';

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
