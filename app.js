const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const logger = require('console');

dotenv.config();

const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-route');

const keys = require('./config/keys');
const app = express();

require('./config/passport-setup.js');


app.set('view engine', 'ejs');

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, () => {
  logger.log('Connected to mongodb');
});

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
  return res.render('home', { user: req.user });
});

app.listen(5555, () => console.log(`Listening on 3000`));
