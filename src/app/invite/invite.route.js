'use strict';

angular.module("scapicInterview")
.config([
	"$stateProvider",
	function($stateProvider) {
		$stateProvider
		.state("dashboard.invite", {
			url : "/invite",
			templateUrl : "app/invite/invite.html",
			controller : "InviteCtrl",
        	controllerAs : "inviteCtrl"
		});
	}
])
