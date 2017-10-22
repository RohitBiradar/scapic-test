'use strict';

let jwt = require('jsonwebtoken');
let	config = require('../config');
let	db = require('../models');
let Admin = db.admin;
let	_ = require('lodash');
let strings = require('../lib/strings.js');
let common = require('../lib/common.js');
let logger = require('../lib/logger.winston.js');

function signToken(data) {
	let payloadData = data;
	let jwtSecret = config.JWT;
	return jwt.sign(payloadData, jwtSecret, { expiresIn: 5*60*60});
}
module.exports.signToken = signToken;

module.exports.isAuthenticated = () => {
	return (req, res, next) => {

		if(!req.headers.authorization) {
			return common.sendResponse(res, 403, {
				error : strings.error.MISSING_TOKEN
			});
		}

		if(!jwtSession(req)) {
			return common.sendResponse(res, 403, {
				error : strings.error.JWT_FAILURE
			});
		}

		let requestId = req.user.id;
		return Admin.findOne({
			where : {
				id : requestId,
				is_active : true
			}
		})
		.then(user => {
			if(user){
				next();
				return true;
			}
			else
				return common.sendResponse(res, 400, { error : strings.error.USER_UNKNOWN});
		})
		.catch(err => {
			return common.sendResponse(res, 500, { error : strings.error.INTERNAL_ERROR});
		});
	}
}

module.exports.isGoogleUser = () => {
	return (req, res, next) => {
		console.log("a------------>");
		if(!req.headers.authorization) {
			return common.sendResponse(res, 403, {
				error : strings.error.MISSING_TOKEN
			});
		}
		// req.headers.authorization = req.body.token;
		if(!jwtSession(req)) {
			return common.sendResponse(res, 403, {
				error : strings.error.JWT_FAILURE
			});
		}

		if(req.user.type === "GoogleUser")
			next();
		else
			return common.sendResponse(res, 400, { error : strings.error.USER_UNKNOWN});
	}
}
// Verifies the token and decode it and add it to req.user else block req
var jwtSession = (req) => {
	try {
		var decodedData = jwt.verify(req.headers.authorization, config.JWT);
		req.user = decodedData;
		return true;
	} catch(err) {
		return false;
	}
}

module.exports.setGoogleCookie = function(req, res) {
	if (!req.user) {
		return res.status(404).send('It looks like you aren\'t logged in, please try again.');
	}
	var token = signToken(req.user);
	res.cookie('token', JSON.stringify(token));
	res.redirect('/interviewee/test');
}
