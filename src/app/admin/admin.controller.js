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
		thisRef.message = "";
		thisRef.isMessageShow = false;
		thisRef.loginAdmin = function(){
			thisRef.isMessageShow = false;
			adminService.loginAdmin(thisRef.email, thisRef.password)
			.then(function(data) {
				auth.setToken(data.token);
				$state.go('dashboard');
			})
			.catch(function (err) {
				thisRef.message = err.data.error;
				thisRef.isMessageShow = true;

			});
		}
	}
]);
