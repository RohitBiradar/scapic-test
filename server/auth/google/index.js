'use strict';

let express = require('express');
let router = express.Router();
let authService = require('../auth.service.js');
let passport = require('passport');

//	Configure passport for google
require('./passport.js').configGoogle();
router.use(passport.initialize());

router.get('/', passport.authenticate('google', {
	scope: [
      'profile',
      'email'
	],
  	session : false
}));

router.get('/callback', passport.authenticate('google', {
    failureRedirect: '/',
	session : false
}), authService.setGoogleCookie);

module.exports = router;
