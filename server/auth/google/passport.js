'use strict';

let passport = require('passport');
let	GoogleStrategy = require('passport-google-oauth20').Strategy;
let	db = require('../../models');
let	jwtService = require('../auth.service.js');
let	strings = require('../../lib/strings.js');
let common = require('../../lib/common.js');
let keys = require('../../config/keys.js');
let logger = require('../../lib/logger.winston.js');
let	Admin = db.admin;
let	bcrypt = require('bcrypt');

module.exports.configGoogle = () => {
	passport.use(new GoogleStrategy({
		clientID: keys.googleOAuth.clientID,
    	clientSecret: keys.googleOAuth.clientSecret,
    	callbackURL: "/auth/google/callback"
	}, (accessToken, refreshToken, profile, cb) => {
			try{
			cb(null, {
				email : profile.emails[0].value,
				type : "GoogleUser"
			});}
			catch(e){
				console.log(e);
			}
		}
	));
	// passport.serializeUser(function(user, cb) {
	// 	cb(null, user);
	// });
	//
	// passport.deserializeUser(function(obj, cb) {
	// 	cb(null, obj);
	// });
}
