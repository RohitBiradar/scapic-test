'use strict';

angular.module("scapicInterview")
.config([
	"$stateProvider",
	function($stateProvider) {
		$stateProvider
		.state("user", {
			url : "/interviewee?uuid",
			templateUrl : "app/user/user.html",
			controller : "UserCtrl",
        	controllerAs : "userCtrl"
		});
	}
])
