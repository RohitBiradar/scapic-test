'use strict';

angular.module("scapicInterview")
.controller("UserCtrl",[
	"Auth",
	"$state",
	"$location",
	"UserService",
	"store",
	"$window",
	function(auth, $state, $location, userService, store, $window) {
		var thisRef = this;
		store.set("uuid", $state.params.uuid);
		thisRef.googleLogin = function(){
			$window.location.href = '/auth/google';
		}
	}
]);
