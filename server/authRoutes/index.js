const router = require('express').Router();
const { User } = require('../db/models');
const passport = require('passport');

// curl http://localhost:3000/auth/login -H "Content-Type: application/json" -X POST -d '{"email": "zeke@zeke.zeke", "password": "123"}'
router.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user)
        res.status(401).send('User not found');
      else if (!user.correctPassword(req.body.password))
        res.status(401).send('Incorrect password');
      else {
        req.login(user, err => {
          if (err) next(err);
          else res.json(user);
        });
      }
    })
    .catch(next);
});

// curl http://localhost:3000/auth/signup -H "Content-Type: application/json" -X POST -d '{"email": "zeke@zeke.zeke", "password": "123"}'
router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => {
        if (err) next(err);
        else res.json(user);
      });
    })
    .catch(next);
});

// curl http://localhost:3000/auth/logout -H "Content-Type: application/json" -X POST -d '{"email": "zeke@zeke.zeke", "password": "123"}'
router.post('/logout', (req, res, next) => {
  req.logout();
  res.sendStatus(200);
});

// curl -i -H "Accept: application/json" -H "Content-Type: application/json" http://localhost:3000/auth/me

router.get('/me', (req, res, next) => {
  res.json(req.user);
});

// Google authentication and login
router.get('/google', passport.authenticate('google', { scope: 'email' }));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login' // or '/'
}));

module.exports = router;
