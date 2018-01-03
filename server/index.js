const express = require("express")
const app = express();
const path = require("path");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
// const db = require('./db/_db.js');
const {db, User} = require('./db/models');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');


const dbStore = new SequelizeStore({ db: db });
dbStore.sync();

app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  store: dbStore,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});


// const PORT = 3000;


// const validFrontendRoutes = ['/'];
// const indexPath = path.join(__dirname, './public/index.html');
// validFrontendRoutes.forEach(stateRoute => {
//   app.get(stateRoute, (req, res, next) => {
//     res.sendFile(indexPath);
//   });
// });

// /* Static middleware */
// app.use(express.static(path.join(__dirname, './public')))
// app.use(express.static(path.join(__dirname, './node_modules')))


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./apiRoutes'));
app.use('/auth', require('./authRoutes'));

app.use(express.static(path.join(__dirname, '../public')))

app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// app.listen(PORT, () => {
//   console.log("Server started at port " + PORT)
// });

// const port = process.env.PORT || PORT;
// app.listen(port, function () {
//   console.log("Knock, knock");
//   console.log("Who's there?");
//   console.log(`Your server, listening on port ${port}`);
// });

module.exports = app;
