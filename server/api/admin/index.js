'use strict';

let express = require('express');
let controller = require('./admin.controller');
let router = express.Router();
let auth = require('../../auth/auth.service');

router.get('/session', auth.isAuthenticated(), controller.checkSession);

module.exports = router;
