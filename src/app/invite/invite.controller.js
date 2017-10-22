'use strict';

angular.module("scapicInterview")
.controller("InviteCtrl",[
	"Auth",
	"$state",
	"InviteService",
	function(auth, $state, inviteService) {
		var thisRef = this;
		thisRef.isMessageShow = false;
		thisRef.inviteMessage = "";
		thisRef.inviteUser = function(){
			thisRef.isMessageShow = false;
			inviteService.inviteUser(thisRef.email)
			.then(function(data) {
				thisRef.inviteMessage = data.message;
				thisRef.isMessageShow = true;
			})
			.catch(function(err) {
				thisRef.inviteMessage = err.error;
				thisRef.isMessageShow = true;
			});
		}
	}
]);
