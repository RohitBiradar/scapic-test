"use strict";
/**
 *  @module 5 Questions MCQ Quiz
 *  @copyright Rahul Yadav
 */

let express = require('express');
let config  = require('./config');
let fs  = require('fs');
let models  = require('./models');
let path = require('path');
let routeConfig = require('./routes');
let bodyParser = require('body-parser');

const app   = express();

//	Allow CORS
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
});

// limit for request and response object, 50mb for now
app.use(bodyParser.json({limit: '50mb'}));

// express static path - public directory
app.use(express.static(path.join(__dirname, '../src')));

//  Logging middleware
require('./lib/logger.js')(app);

//  Configure routes
routeConfig(app);

// Bootstrap Models
fs.readdirSync(__dirname + '/models').forEach(function(file) {
	if(~file.indexOf('.js')) require(__dirname + '/models/' + file);
});

//	Delete models and recreate if seeding - ONLY IN DEV
if(config.SEED){
	var force = {
		force : true
	};
}
models.sequelize.sync(force)
.then(() => {
	if(config.SEED){
		return require('./seed')();
	}
	return true;
})
.then(() => {
	let http = require('http').Server(app);
	http.listen(config.PORT);
	console.log('Express server listening in '+config.ENV+' mode on port: ' + config.PORT);
})
.catch((err) => {
	console.log(err.stack);
});

module.exports = app;
