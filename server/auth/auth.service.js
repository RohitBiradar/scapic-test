'use strict';

let jwt = require('jsonwebtoken');
let	config = require('../config');
let	db = require('../models');
let Admin = db.admin;
let	_ = require('lodash');
let strings = require('../lib/strings.js');
let common = require('../lib/common.js');
let logger = require('../lib/logger.winston.js');

/**
 *  Sign a token with given payload
 *  @param {Object} data -  data object which is to be added in token(payload).
 *  @return token.
 */
function signToken(data) {
	let payloadData = data;
	let jwtSecret = config.JWT;
	return jwt.sign(payloadData, jwtSecret, { expiresIn: 5*60*60});
}
module.exports.signToken = signToken;

/**
 *  Authenticates the authorization token and let the user pass if success or returns error.
 *  @return Middleware.
 */
module.exports.isAuthenticated = () => {
	return (req, res, next) => {

		//	Check token in request header
		if(!req.headers.authorization) {
			return common.sendResponse(res, 403, {
				error : strings.error.MISSING_TOKEN
			});
		}
		//	Check if the token is valid and decode and add details to req.user
		if(!jwtSession(req)) {
			return common.sendResponse(res, 403, {
				error : strings.error.JWT_FAILURE
			});
		}

		let requestId = req.user.id;

		//	Check of the token user is currently active
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

/**
 *  Authenticates the token and type of token
 *  @return Middleware.
 */
module.exports.isGoogleUser = () => {
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

		//	If token is not of GoogleUser return error else let pass.
		if(req.user.type === "GoogleUser")
			next();
		else
			return common.sendResponse(res, 400, { error : strings.error.USER_UNKNOWN});
	}
}

/**
 *	Check if the token is valid and decode and add details to req.user
 *  @return Boolean.
 */
var jwtSession = (req) => {
	try {
		var decodedData = jwt.verify(req.headers.authorization, config.JWT);
		req.user = decodedData;
		return true;
	} catch(err) {
		return false;
	}
}

/**
 *	Sign token with the email in req.user and set cookie and redirect to test page
 *  @return Boolean.
 */
module.exports.setGoogleCookie = function(req, res) {
	var token = signToken(req.user);
	res.cookie('token', JSON.stringify(token));
	res.redirect('/interviewee/test');
}
