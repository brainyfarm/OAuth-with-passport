const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup.js');

const app = express();

app.set('view engine', 'ejs');

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  return res.render('home');
});

app.listen(5555, () => console.log(`Listening on 3000`));
