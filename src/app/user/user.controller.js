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
		console.log("UserCtrl");
		var thisRef = this;
		console.log($state.params.uuid);
		store.set("uuid", $state.params.uuid);
		thisRef.googleLogin = function(){
			console.log("google login");
			$window.location.href = '/auth/google';
		}
	}
]);
