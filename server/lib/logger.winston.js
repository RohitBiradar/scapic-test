"use strict";

const winston = require('winston');
const fs = require('fs');
const tsFormat = () => (new Date()).toLocaleTimeString();
const logDir = 'logs';
let config = require('../config');

//	Create logs folder if not
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

//	In production : nothing on terminal, only on log files
let transports = [
	//	Create one log file daily
	new (require('winston-daily-rotate-file'))({
      filename: `${logDir}/-results.log`,
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
	  json : false,
      level: config.ENV === 'production' ? 'info' : 'debug'
    })
];

if(config.ENV != 'production'){
	transports.push(
		new (winston.transports.Console)({
	      timestamp: tsFormat,
	      colorize: true,
		  level : 'debug'
	  	})
	);
}

const logger = new (winston.Logger)({
  transports: transports
});

module.exports = logger;
