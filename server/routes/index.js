'use strict';

module.exports = function(app) {
	let bodyParser = require('body-parser');
	app.use(bodyParser.json());
    let path = require('path');

    app.all('/*', function(req, res) {
    	res.sendFile(path.resolve(__dirname + "/../../src/index.html"));
    });
}
