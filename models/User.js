const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
  username: { type: String, required: true },

  password: { type: String, required: true },


  

});

const User = mongoose.model('UserInfo', userSchema);

module.exports = User;
