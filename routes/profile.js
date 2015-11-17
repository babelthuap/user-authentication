'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');

var authMiddleware = require('../config/auth');

router.get('/', authMiddleware, function(req, res) {
  var userId = req.cookies.userId;
  User.findById(userId, function(err, user){
    user.password = null;
    res.render('profile', {title: 'Profile', user: user});
  });
});

module.exports = router;