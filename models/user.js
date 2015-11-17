'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var User;

var userSchema = Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  picture: { type: String, default: 'http://www.politicspa.com/wp-content/uploads/2013/02/Silhouette-question-mark.jpeg'},
  email: String,
  birthday: String,
  passwordIsHashed: Boolean
});

userSchema.statics.register = function(user, cb) {
  var passwordIsHashed = user.passwordIsHashed;
  var username = user.username;
  var password = user.password;
  var picture = user.picture;
  var email = user.email;
  var birthday = user.birthday;
  User.findOne({username: username}, function(err, user){
    if(err || user) return cb(err || 'Username already taken.');
    bcrypt.genSalt(13, function(err1, salt) {
      bcrypt.hash(password, salt, function(err2, hash) {
        if(err1 || err2) return cb(err1 || err2);
        var newUser = new User();
        newUser.username = username;
        newUser.password = passwordIsHashed ? password : hash;
        newUser.picture = picture;
        newUser.email = email;
        newUser.birthday = birthday;
        newUser.save(function(err, savedUser){
          savedUser.password = null;
          cb(err, savedUser);
        });
      });
    });
  });
};

userSchema.statics.update = function(user, cb) {
  User.findOneAndRemove({_id: user._id}, function(err, deletedUser) {
    console.log('deletedUser:', deletedUser);
    user.password = deletedUser.password;
    user.passwordIsHashed = true;
    User.register(user, function(err, savedUser){
      if (err) return cb(err);
      cb(err, savedUser);
    });
  });
};

var errMessage = 'Incorrect username or password.';
userSchema.statics.authenticate = function(inputUser, cb){
  User.findOne({username: inputUser.username}, function(err, dbUser) {
    if(err || !dbUser) return cb(err || errMessage);
    bcrypt.compare(inputUser.password, dbUser.password, function(err, isGood){
      if(err || !isGood) return cb(err || errMessage);
      dbUser.password = null;
      cb(null, dbUser);
    });
  });
};

User = mongoose.model('User', userSchema);
module.exports = User;
