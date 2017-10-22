'use strict';

angular.module("scapicInterview")
.controller("DashboardCtrl",[
	"Auth",
	"$state",
	"DashboardService",
	function(auth, $state, dashboardService) {
		console.log("DashboardCtrl");
		var thisRef = this;
		dashboardService.checkAdminSession()
		.then(function (data) {
			console.log(data);
		})
		.catch(function (err) {
			auth.logOut();
			$state.go('admin');
		});

		thisRef.changeView = function(navIndex){
			if(navIndex === 1){
				console.log("Invite");
				// $state.go('dashboard.invite');
			}
			if(navIndex === 2){
				console.log("Scores");
				// $state.go('dashboard.scores');
			}
		}
	}
]);
