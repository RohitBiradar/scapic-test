'use strict';

angular.module("scapicInterview")
.controller("AdminCtrl",[
	"Auth",
	"$state",
	function(auth, $state) {
		console.log("AdminCtrl");
		var thisRef = this;
		thisRef.loginAdmin = function(){
			console.log(thisRef.email, thisRef.password);
		}
	}
]);
