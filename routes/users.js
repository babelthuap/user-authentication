'use strict';

var express = require('express');
var router = express.Router();

var User = require('../models/user');

// USERS

// register a new user
router.post('/register', function(req, res) {
  User.register(req.body, function(err, savedUser){
    res.status(err ? 400 : 200).send(err || savedUser);
  });
});


router.post('/login', function(req, res) {
  User.authenticate(req.body, function(err, user){
    res.status(err ? 400 : 200).send(err || user);
  });
});

module.exports = router;
