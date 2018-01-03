const db = require('./server/db/_db.js');
const { User, Puppy, Kitten } = require('./server/db/models');

// export NODE_ENV=development
if (process.env.NODE_ENV === 'development') {
  require('./localSecrets'); // this will mutate the process.env object with your secrets.
}

const app = require('./server'); // run  app after we're sure the env variables are set!
const port = process.env.PORT || 3000;

db.sync({force: false})
  .then(function () {
    app.listen(port)
  })
  .catch(console.error);
