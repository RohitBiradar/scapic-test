"use strict";

let fs = require("fs");
let path = require("path");
let Sequelize = require("sequelize");
let config = require('../config');
let dbConfig = require('../config/database.json')[config.ENV];

//	Sequelize connection with the database provided by dbConfig
let sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

let db        = {};

fs
	.readdirSync(__dirname)
	.filter(function(file) {
		return (file.indexOf(".") !== 0) && (file !== "index.js");
	})
	.forEach(function(file) {
		let model = sequelize.import(path.join(__dirname, file));
		db[model.name] = model;
	});

// Execute associate of each model to make foreign keys
Object.keys(db).forEach(function(modelName) {
	if ("associate" in db[modelName]) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
