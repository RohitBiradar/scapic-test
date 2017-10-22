'use strict';

angular.module("scapicInterview")
.config([
	"$stateProvider",
	function($stateProvider) {
		$stateProvider
		.state("dashboard.scores", {
			url : "/scores",
			templateUrl : "app/scores/scores.html",
			controller : "ScoresCtrl",
        	controllerAs : "scoresCtrl"
		});
	}
])
