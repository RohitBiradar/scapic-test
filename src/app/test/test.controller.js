'use strict';

angular.module("scapicInterview")
.controller("TestCtrl",[
	"Auth",
	"$state",
	"store",
	"$timeout",
	"TestService",
	function(auth, $state, store, $timeout, testService) {
		console.log("TestCtrl");
		var thisRef = this;
		thisRef.isInterview = false;
		thisRef.isScore = false;
		thisRef.radio = [];

		testService.checkAndStartTest(store.get("uuid"), store.get("GoogleJWT"))
		.then(function(data) {
			console.log("start------------>");
			console.log(data);
			if(data.data && data.data.isInterview){
				thisRef.questionArr = data.data.list;
				thisRef.isInterview = data.data.isInterview;
			}
			if(data.data && data.data.isScore){
				thisRef.score = data.data.score;
				thisRef.isScore = data.data.isScore;
			}
		})
		.catch(function(err) {
			auth.logOut();
			$state.go("admin");
		})
	}
]);
