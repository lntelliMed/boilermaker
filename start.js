const db = require('./server/db/_db.js');
const { User, Puppy, Kitten } = require('./server/db/models');

const app = require('./server');
const port = process.env.PORT || 3000;

db.sync({force: false})
  .then(function () {
    app.listen(port)
  })
  .catch(console.error);
