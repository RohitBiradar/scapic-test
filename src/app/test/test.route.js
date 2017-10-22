'use strict';

angular.module("scapicInterview")
.config([
	"$stateProvider",
	function($stateProvider) {
		$stateProvider
		.state("test", {
			url : "/interviewee/test",
			templateUrl : "app/test/test.html",
			controller : "TestCtrl",
        	controllerAs : "testCtrl"
		});
	}
])
