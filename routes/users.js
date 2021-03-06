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
    try {  
      res.cookie('username', user.username);
      res.cookie('userId', user._id.toString());
      res.status(err ? 400 : 200).send(err || user);
    } catch (e) {
      res.status(400).send('Invalid');
    }
  });
});

router.put('/update', function(req, res) {
  User.update(req.body, function(err, foundUser) {
    res.cookie('username', foundUser.username);
    res.cookie('userId', foundUser._id.toString());
    res.status(err ? 400 : 200).send(err || foundUser);
  })
})

router.post('/logout', function(req, res) {
  res.clearCookie('username');
  res.clearCookie('userId');
  res.send();
})

module.exports = router;
