'use strict'

angular.module("scapicInterview")
.service("TestService", [
	"CommonService",
	function(commonService) {
		this.checkAndStartTest = function(uuid, token){
			console.log("------------------->", uuid);
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
	}
])
