'use strict';

let express = require('express');
let controller = require('./user.controller');
let router = express.Router();
let auth = require('../../auth/auth.service');

router.post('/invite/:email', auth.isAuthenticated(), controller.inviteUser);
router.get('/start', auth.isGoogleUser(), controller.startTest);
router.get('/scores/:page', auth.isAuthenticated(), controller.getScoreList);

module.exports = router;
