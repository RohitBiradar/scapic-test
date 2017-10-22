"user strict";

let db = require('../../models');
let Admin = db.admin;
let User = db.user;
let Question = db.question;
let Interview = db.interview;
let strings = require('../../lib/strings.js');
let common = require('../../lib/common.js');
let logger = require('../../lib/logger.winston.js');

module.exports.checkSession = function (req, res) {
	return common.sendResponse(res, 200, {status : true});
}
