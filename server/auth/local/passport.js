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

module.exports.verifyAdminLogin = (req, res) => {
	passport.use(new localStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, (email, password, done) => {
			authenticateUser(email.toLowerCase(), password, done);
		}
	));

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

function authenticateUser(email, password, done) {
	console.log(email, password);
	Admin.findOne({
		where : {
			username : email
		},
		attributes : ['username', 'password', 'id']
	})
	.then( user => {
		if (!user) {
			done(null, false, strings.error.USER_UNKNOWN);
	    	return;
	 	}
		if (!validatePassword(password, user.password)) {
			done(null, false, strings.error.WRONG_PASSWORD);
			return;
		}
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
