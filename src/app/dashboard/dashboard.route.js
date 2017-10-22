'use strict';

angular.module("scapicInterview")
.config([
	"$stateProvider",
	function($stateProvider) {
		$stateProvider
		.state("dashboard", {
			url : "/admin",
			templateUrl : "app/dashboard/dashboard.html",
			controller : "DashboardCtrl",
        	controllerAs : "dashCtrl"
		});
	}
])
