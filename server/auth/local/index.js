'use strict';

let express = require('express');
let router = express.Router();

router.post('/admin', require('./passport.js').verifyAdminLogin);

module.exports = router;
