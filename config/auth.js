'use strict';

var User = require('../models/user');

var errMessage = 'Please <a href="/login">sign in</a> first.'

module.exports = function(req, res, next){
  var userId = req.cookies.userId;
  User.findById(userId, function(err, user){
    if(err || !user) return res.status(401).send(err || errMessage);
    next();
  });
};