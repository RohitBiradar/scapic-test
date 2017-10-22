"use strict";

let list = require('./list.js');

module.exports = function(){
	let qstArr = [];
	for(let i=0; i<list.length; i++){
		qstArr.push({
			question : list[i].question,
			answer : list[i].correct_answer,
			options : randomOption(list[i].correct_answer, list[i].incorrect_answers)
		});
	}
	return qstArr;
}

function randomOption(one, three){
	three.splice((Math.floor((Math.random() * 10)+1) % 3), 0, one);
	return three;
}
