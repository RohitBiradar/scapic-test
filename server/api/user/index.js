'use strict';

let express = require('express');
let controller = require('./user.controller');
let router = express.Router();
let auth = require('../../auth/auth.service');

/**
 *	All routes for realated to User
 *	auth.isAuthenticated() middleware authenticates admin
 *	auth.isGoogleUser() middleware authenticates logged in with google User
 */
router.post('/invite/:email', auth.isAuthenticated(), controller.inviteUser);
router.get('/start', auth.isGoogleUser(), controller.startTest);
router.get('/scores/:page', auth.isAuthenticated(), controller.getScoreList);
router.post('/submit', auth.isGoogleUser(), controller.submitTest);

module.exports = router;
