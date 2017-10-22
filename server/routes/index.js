'use strict';

module.exports = function(app) {
	let bodyParser = require('body-parser');
	app.use(bodyParser.json());
    let path = require('path');

	app.use('/auth', require('../auth'));
	app.use('/api/user', require('../api/user'));
	app.use('/api/admin', require('../api/admin'));
	// app.get('/interviewee/test', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res){
	// 	console.log("hey------------>");
	// });

    app.all('/*', function(req, res) {
    	res.sendFile(path.resolve(__dirname + "/../../src/index.html"));
    });
}
