'use strict';

angular.module("scapicInterview")
.controller("ScoresCtrl",[
	"Auth",
	"$state",
	"ScoresService",
	function(auth, $state, scoresService) {
		var thisRef = this;
		thisRef.scoreArray = [];
		scoresService.getScores()
		.then(function(data) {
			thisRef.scoreArray = data.data;
		});
	}
]);
