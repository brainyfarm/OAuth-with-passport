const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  return User.findById(id)
    .then((user) => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect',
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    return User.findOne({ googleId: profile.id })
      .then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          const newUser = new User({
            username: profile.displayName,
            googleId: profile.id,
            thumbnail: profile._json.picture,
          });

          return newUser.save()
            .then((newUser) => {
              done(null, newUser);
            })
        }
      })
  })
)

module.exports = passport;
