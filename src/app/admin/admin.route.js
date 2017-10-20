'use strict';

angular.module("scapicInterview")
.config([
	"$stateProvider",
	function($stateProvider) {
		$stateProvider
		.state("admin", {
			url : "/adminLogin",
			templateUrl : "app/admin/admin.html",
			controller : "AdminCtrl",
        	controllerAs : "adminCtrl"
		});
	}
])
