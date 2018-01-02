const Sequelize = require('sequelize');

const db = require('../_db');

const Puppy = db.define('puppy', {
  name: Sequelize.STRING,
  photo: {
    type: Sequelize.STRING,
    defaultValue: '/images/default-photo.jpg'
  }
});

module.exports = Puppy;
