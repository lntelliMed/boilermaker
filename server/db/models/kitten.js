const Sequelize = require('sequelize');

const db = require('../_db');

const Kitten = db.define('kitten', {
  name: Sequelize.STRING,
  photo: {
    type: Sequelize.STRING,
    defaultValue: '/images/default-photo.jpg'
  }
});

module.exports = Kitten;
