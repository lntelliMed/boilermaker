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
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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


// collect our google configuration into an object
const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
};

// configure the strategy with our config object, and write the function that passport will invoke after google sends
// us the user's profile and access token
const strategy = new GoogleStrategy(googleConfig, function (token, refreshToken, profile, done) {
  const googleId = profile.id;
  const name = profile.displayName;
  const email = profile.emails[0].value;

  User.findOne({ where: { googleId: googleId } })
    .then(function (user) {
      if (!user) {
        return User.create({ name, email, googleId })
          .then(function (user) {
            done(null, user);
          });
      } else {
        done(null, user);
      }
    })
    .catch(done);
});

// register our strategy with passport
passport.use(strategy);


// passport.use(
//   new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: 'auth/google/callback'
//   },
//     // Google will send back the token and profile
//     function (token, refreshToken, profile, done) {
//       // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
//       // console.log('---', 'in verification callback', profile, '---');
//       // done();

//       var info = {
//         name: profile.displayName,
//         email: profile.emails[0].value,
//         photo: profile.photos ? profile.photos[0].value : undefined
//       };
//       User.findOrCreate({
//         where: { googleId: profile.id },
//         defaults: info
//       })
//         .spread(function (user) {
//           done(null, user);
//         })
//         .catch(done);

//     })
// );


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
