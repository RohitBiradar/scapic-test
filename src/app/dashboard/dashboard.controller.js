'use strict';

angular.module("scapicInterview")
.controller("DashboardCtrl",[
	"Auth",
	"$state",
	"DashboardService",
	function(auth, $state, dashboardService) {
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
			}
			if(navIndex === 2){
			}
		}
		thisRef.logOut = function(){
			auth.logOut();
			$state.go('admin');
		}
	}
]);
