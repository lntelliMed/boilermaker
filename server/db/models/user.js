const Sequelize = require('sequelize');

const db = require('../_db');

const User = db.define('user', {
  name: Sequelize.STRING,
  photo: {
    type: Sequelize.STRING,
    defaultValue: '/images/default-photo.jpg'
  }
  });

module.exports = User;
