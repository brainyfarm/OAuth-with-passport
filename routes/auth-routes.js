const router = require('express').Router();
const passport = require('passport');

router
  .get('/login', (req, res) => {
    return res.render('login');
  });

router.get('/logout', (req, res) => {
  return res.send('Logging out');
});


router.get('/google', passport.authenticate('google', {
  scope: [
    'profile',
  ]
}));

module.exports = router;
