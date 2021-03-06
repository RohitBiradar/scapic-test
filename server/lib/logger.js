"use strict";

var morgan = require('morgan');
var config = require('../config');
var logger = require('./logger.winston.js');

/**
 *  Logged configuration - log nothing in production mode - write imp error in file
 */
module.exports = (app) => {
	if(config.ENV == "development")
    	app.use(morgan('dev'));
	else{
		//	Writing requests to file
		app.use(function(req, res, next){
			logger.info("API : ", res.req.method, res.req.url);
			next();
		});
	}
}
