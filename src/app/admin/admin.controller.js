'use strict';

angular.module("scapicInterview")
.controller("AdminCtrl",[
	"Auth",
	"$state",
	"AdminService",
	function(auth, $state, adminService) {
		var thisRef = this;

		if(auth.getToken()){
			$state.go('dashboard');
		}

		thisRef.loginAdmin = function(){
			adminService.loginAdmin(thisRef.email, thisRef.password)
			.then(function(data) {
				auth.setToken(data.token);
				$state.go('dashboard');
			})
			.catch(function (err) {
				console.log(err);
			});
		}
	}
]);
