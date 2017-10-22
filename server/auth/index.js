'use strict';

let express = require('express');
let	router = express.Router();

router.use("/local", require('./local'));
router.use("/google", require('./google'));

module.exports = router;
