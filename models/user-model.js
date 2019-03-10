const mongoose = require('mongoose');
const { model, Schema} = mongoose;

const userSchema = new Schema({
  username: String,
  googleId: String,
});

const User = model('user', userSchema);

module.exports = User;
