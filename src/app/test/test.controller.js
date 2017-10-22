'use strict';

angular.module("scapicInterview")
.controller("TestCtrl",[
	"Auth",
	"$state",
	"store",
	"$timeout",
	"TestService",
	function(auth, $state, store, $timeout, testService) {
		var thisRef = this;
		thisRef.isInterview = false;
		thisRef.isScore = false;
		thisRef.radio = [null, null, null, null, null];
		thisRef.a;

		testService.checkAndStartTest(store.get("uuid"), store.get("GoogleJWT"))
		.then(function(data) {
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
		});
		thisRef.submitInterview = function(){
			var answers = [];
			for(let i=0; i<thisRef.radio.length; i++){
				if(thisRef.radio[i] != null){
					let answerObj = {};
					answerObj.id = thisRef.questionArr[i].id;
					answerObj.ans = thisRef.radio[i];
					answers.push(answerObj);
				}
			}
			testService.submitInterview(answers, store.get("uuid"))
			.then(function(data) {
				thisRef.isInterview = false;
				thisRef.score = data.data.score;
				thisRef.isScore = data.data.isScore;
			});
		}
		thisRef.logOut = function(){
			auth.logOut();
			$state.go('admin');
		}
	}
]);
