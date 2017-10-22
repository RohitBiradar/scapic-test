"use strict";

process.env.NODE_ENV = process.env.NODE_ENV == 'production' ? process.env.NODE_ENV : 'development';


let config = {
	"ENV" : process.env.NODE_ENV,
	"HOST" : process.env.NODE_ENV == 'development' ? 'localhost' : 'abcd.com',
	"PORT" : 4000,
	"PROTOCOL" : 'http',
	"SEED" : false,
	"JWT" : 'secret5$%by&8rahul'
}

config.SERVER = config.PROTOCOL + '://' + config.HOST + ':' + config.PORT;

var args = process.argv;

if(config.ENV == 'development' && args[2] && args[2].toLowerCase() == 'seed')
	config.SEED = true;


module.exports = config;
