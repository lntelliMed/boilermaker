const db = require('../_db');

const User = require('./user');
const Kitten = require('./kitten');
const Puppy = require('./puppy');

User.hasMany(Kitten, {
  foreignKey: 'owner_id',
  onDelete: 'cascade',
  hooks: true
});

User.hasMany(Puppy, {
  foreignKey: 'owner_id',
  onDelete: 'cascade',
  hooks: true
});

Kitten.belongsTo(User, { as: 'owner' });
Puppy.belongsTo(User, { as: 'owner' });

module.exports = {
  db,
  User,
  Kitten,
  Puppy
};
