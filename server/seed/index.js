"use strict";

let db = require('../models');
let Question = db.question;
let Admin = db.admin;

module.exports = () => {
	console.log("seed");
	return Question.bulkCreate(require('./question.js')())
	.then(() => {
		return Admin.create({
			username : 'rahulyadav',
			password  : '$2a$10$J80lQs1tKtuteL/7ZmtjDO79fJ9rzTxLEJYVO.KxsLnCoLuNq4gVu'
		})
	})
}
