'use strict';

let passport = require('passport');
let	localStrategy = require('passport-local');
let	db = require('../../models');
let	jwtService = require('../auth.service.js');
let	strings = require('../../lib/strings.js');
let common = require('../../lib/common.js');
let logger = require('../../lib/logger.winston.js');
let	Admin = db.admin;
let	bcrypt = require('bcrypt');

/**
 *  Verifies admin login
 */
module.exports.verifyAdminLogin = (req, res) => {

	// Check required fields email and password
	if(!(req.body.email && req.body.password)){
		return common.sendResponse(res, 400, {
			status : false,
			error : strings.error.MISSING_FIELDS
		});
	}
	// Passport local strategy
	passport.use(new localStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, (email, password, done) => {
			// Check the given user into our database and callback respective result
			authenticateUser(email.toLowerCase(), password, done);
		}
	));

	//	Executes after authenticateUser
	passport.authenticate('local', (err, user, message) => {
		if(err) {
			return common.sendResponse(res, 401, {
				status : false,
				error : err
			});
		}
		if(!user) {
			return common.sendResponse(res, 404, {
				status : false,
				error : message
			});
		}
		user.type = "Admin";
		let token = jwtService.signToken(user);
		return common.sendResponse(res, 200, {
			'token' : token,
		});
	})(req,res);
}

/**
 *  Check the email and password in database
 *  @param {String} email -  email.
 *  @param {String} password -  password.
 *  @param {Callback} done -  Callback.
 *  @return token.
 */
function authenticateUser(email, password, done) {
	Admin.findOne({
		where : {
			username : email
		},
		attributes : ['username', 'password', 'id']
	})
	.then( user => {

		//	If email does not exist.
		if (!user) {
			done(null, false, strings.error.USER_UNKNOWN);
	    	return;
	 	}
		//	If password is wrong
		if (!validatePassword(password, user.password)) {
			done(null, false, strings.error.WRONG_PASSWORD);
			return;
		}
		//	Success -
      	done(null, {
			username : user.username,
			id : user.id
		});
      	return true;
	})
	.catch((err) => {
		done(err);
	})
}

/**
 *  Compare given password with the real hashed password with bcrypt.
 *  @param {String} password -  given password.
 *  @param {String} hashPassword -  original password.
 *  @param {Callback} done -  Callback.
 *  @return Boolean.
 */
function validatePassword(password, hashPassword, done) {
	console.log(password, hashPassword);
	try{
		if(bcrypt.compareSync(password, hashPassword))
			return true;
		else return false
	}
	catch(err){
		return false;
	}
}
