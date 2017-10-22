"user strict";

let db = require('../../models');
let Admin = db.admin;
let User = db.user;
let Question = db.question;
let Interview = db.interview;
let config = require('../../config');
let strings = require('../../lib/strings.js');
let common = require('../../lib/common.js');
let logger = require('../../lib/logger.winston.js');
let awsMail = require('../../lib/mail.aws.js');
const uuidv4 = require('uuid/v4');

/**
 *	Add given email to user table.
 *  Send Interview invitation email.
 */
module.exports.inviteUser = function(req, res){

	let email = req.params.email;
	// Send error message if email is not valid
	if(!email || !common.isValidEmail(email)){
		return common.sendResponse(res, 400, {status : false, error : strings.error.WRONG_CREDENTIALS})
	}
	//	Generate unique id for each invitation and store it with the email
	let randomUUID = uuidv4();

	User.invite(email, randomUUID)
	.then(user => {
		common.sendResponse(res, 200, {
			status : true,
			message : strings.message.LINK_SENT
		});
		//	Send mail to user
		let body = require('./mail.template.js').getEmailView(config.SERVER+'/interviewee?uuid='+randomUUID);
        let from = "Interview <"+awsMail.mailSender+">";
        let subject = strings.emailSubject.QUIZ;

        awsMail.sendMail(from, email, subject, body, (err, resp) => {
            if(err){
                logger.error(err.stack);
            }
        });
	})
	.catch(err => {
		if(err.name == 'SequelizeUniqueConstraintError'){
			// If user is already invited
			return common.sendResponse(res, 200, {
				status : true,
				message : strings.message.ALREADY_INVITED
			});
		}
		return common.sendResponse(res, 200, {
			status : true,
			message : strings.error.SOMETHING
		});
	})
}

/**
 *	Check if test is submitted or 30 min has passed from start time
 *  If Yes - send score.
 *	Else send questions.
 */
module.exports.startTest = function(req, res) {
	let uuid = req.query.uuid;
	let email = req.user.email;
	if(!(uuid && email)){
		return common.sendResponse(res, 400, {status : false, error : strings.error.MISSING_FIELDS})
	}
	let isInterview = false;
	let isScore = false;
	User.getUser(uuid, email)
	.then(user => {
		//	If the given token is not for the given email or wrong token/email.
		if(!user){
			return common.sendResponse(res, 401, {
				status : false,
				error : strings.error.USER_UNKNOWN
			});
		}

		if(user.hasStarted || user.hasSubmitted){
			if(user.hasSubmitted || isMinutePassed(user.startedAt, 30)){
				isScore = true;
				return getScore(user.id);
			}
			isInterview = true;
			return getUserQuestions(user.id);
		}
		// Send questions
		isInterview = true;
		return getFiveQuestions(user.id);
	})
	.then(status => {
		if(status){
			return common.sendResponse(res, 200, {
				status : true,
				data : {
					isScore,
					isInterview,
					list : isInterview ? status : null,
					score : isScore ? status : null
				}
			});
		}
	})
	.catch(err => {
		logger.error(err.stack)
		return common.sendResponse(res, 500, {
			status : false,
			error : strings.error.INTERNAL_ERROR
		});
	})
}
/**
 *	Get list of score of all users
 *  Only for admin
 */
module.exports.getScoreList = function(req, res){
	let limit = parseInt(req.params.page) ? parseInt(req.params.page)*10 : 10;

	return User.findAll({
		where : {
			hasStarted : true
		},
		include : [{
			model : Interview,
			attributes : ['id', 'answer'],
			include : [{
				model : Question,
				attributes : ['id', 'answer']
			}]
		}]
	})
	.then(user => {
		let list = [];
		for(let i=0; i<user.length; i++){
			let tempUser = {};
			tempUser.email = user[i].email;
			// Create email visited by the user
			tempUser.url = config.SERVER + '/interviewee?uuid=' + user[i].token;
			tempUser.hasSubmitted = user[i].hasSubmitted;
			let correct = 0;
			let incorrect = 0;
			for(let j=0; j<user[i].interviews.length; j++){
				// Match answers to calculate score
				if(user[i].interviews[j].answer != null){
					if(user[i].interviews[j].answer.toLowerCase() == user[i].interviews[j].question.answer.toLowerCase())
						correct++;
					else
						incorrect++;
				}
			}
			tempUser.score = {
				correct,
				incorrect
			}
			list.push(tempUser);
		}
		return common.sendResponse(res, 200, {
			status : true,
			data : list
		});
	})
	.catch(err => {
		logger.error(err.stack)
		return common.sendResponse(res, 500, {
			status : false,
			error : strings.error.INTERNAL_ERROR
		});
	})
}

/**
 *	Evaluate answers and return score
 */
module.exports.submitTest = function(req, res) {
	let uuid = req.body.uuid;
	let email = req.user.email;
	if(!(uuid && email)){
		return common.sendResponse(res, 400, {status : false, error : strings.error.MISSING_FIELDS})
	}
	User.getUser(uuid, email)
	.then(user => {
		if(!user){
			return common.sendResponse(res, 401, {
				status : false,
				error : strings.error.USER_UNKNOWN
			});
		}
		if(user.hasSubmitted || isMinutePassed(user.startedAt, 30)){
			isScore = true;
			return getScore(user.id);
		}
		return addAnswersAndGetScore(user.id, req.body.answers);
	})
	.then(score => {
		if(score){
			return common.sendResponse(res, 200, {
				status : true,
				data : {
					isScore : true,
					score
				}
			});
		}
	})
	.catch(err => {
		logger.error(err.stack)
		return common.sendResponse(res, 500, {
			status : false,
			error : strings.error.INTERNAL_ERROR
		});
	});
}

/**
 *  Add answers wrt to each question in Interview model and calculate score.
 *  @param {Integer} userId -  Id of the user.
 *  @param {Array} answers -  Array of question id and answer.
 *  @return Score promise.
 */
function addAnswersAndGetScore(userId, answers){

	// Array of promise to store each update promise
	let promiseArr = [];
	for(let i=0; i<answers.length; i++){
		let promise = Interview.update({
			answer : answers[i].ans.trim()
		},{
			where : {
				userId,
				questionId : answers[i].id
			}
		});
		promiseArr.push(promise);
	}

	// Update hasSubmitted and submittedAt of the user
	promiseArr[promiseArr.length] = User.update({
		hasSubmitted : true,
		submittedAt : new Date()
	},{
		where : {
			id : userId
		}
	});

	return Promise.all(promiseArr)
	.then(updated => {
		// Calculate score and return promise
		return getScore(userId);
	});
}

/**
 *  Get five random questions with options from the databse and insert into Interview model for that user
 *  @param {Integer} userId -  Id of the user.
 *  @return Question array promise.
 */
function getFiveQuestions(userId) {

	// Write raw query for ordering result randomly (Todo: Find solution in sequelize for this)
	let rawQuery = 'SELECT id, question, options FROM question ORDER BY RANDOM() LIMIT 5';
	let qstArr;
	return db.sequelize.query(rawQuery)
	.then((result) => {
		questions = result[0];
		qstArr = questions;
		let bulkInterviewQst = [];
		for(let i=0; i<questions.length; i++){
			bulkInterviewQst.push({
				userId,
				questionId : questions[i].id
			});
		}
		return Promise.all([
			//	Insert questionIds and userIds in Interview model
			Interview.bulkCreate(bulkInterviewQst),
			// Set hasStarted:true for the user
			User.setStarted(userId)
		]);
	})
	.then(() => {
		return qstArr;
	});
}

/**
 *  Get questions alloted to the user
 *  @param {Integer} userId -  Id of the user.
 *  @return Question array promise.
 */
function getUserQuestions(userId) {

	return Interview.findAll({
		where : {
			userId
		},
		include : [{
			model : Question,
			//	Don't get answer key
			attributes : ['id', 'question', 'options']
		}]
	})
	.then(interview => {
		let qstArr = [];
		for(let i=0; i<interview.length; i++){
			qstArr.push({
				id : interview[i].question.id,
				question : interview[i].question.question,
				options : interview[i].question.options
			});
		}
		return qstArr;
	});
}

/**
 *  Get score of the user
 *  @param {Integer} userId -  Id of the user.
 *  @return Score promise.
 */
function getScore(userId) {
	return Interview.findAll({
		where : {
			userId
		},
		include : [{
			model : Question,
			attributes : ['id', 'answer']
		}]
	})
	.then(interview => {
		let correct = 0;
		let incorrect = 0;
		for(let i=0; i<interview.length; i++){
			// Match answer given by user with the correct answer in Question model
			if(interview[i].answer != null){
				if(interview[i].answer.toLowerCase() === interview[i].question.answer.toLowerCase())
					correct++;
				else
					incorrect++;
			}
		}
		return {
			correct,
			incorrect
		};
	});
}

/**
 *  Check if the given time has passed 30 min till now
 *  @param {Date} time -  start time of interview.
 *  @param {Integer} min -  min to check.
 *  @return Boolean.
 */
function isMinutePassed(time, min) {
	let endTime = new Date(time);
	endTime.setMinutes(endTime.getMinutes() + min);
	if(new Date() > endTime)
		return true;
	return false;
}
