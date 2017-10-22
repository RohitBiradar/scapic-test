'use strict'

angular.module("scapicInterview")
.service("TestService", [
	"CommonService",
	function(commonService) {
		this.checkAndStartTest = function(uuid, token){
			return commonService.requestApi("get","/api/user/start", {
				uuid : uuid
			})
			.then(function(response){
				return response.data;
			})
			.catch(function(err){
				return Promise.reject(err);
			})
		}
		this.submitInterview = function(answers, uuid){
			return commonService.requestApi("post","/api/user/submit", null, "", {
				answers : answers,
				uuid : uuid
			})
			.then(function(response){
				return response.data;
			})
			.catch(function(err){
				return Promise.reject(err);
			})
		}
	}
])
