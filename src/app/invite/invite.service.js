'use strict'

angular.module("scapicInterview")
.service("InviteService", [
	"CommonService",
	function(commonService) {
		this.inviteUser = function(email){
			return commonService.requestApi("post", "/api/user/invite/"+email)
			.then(function(response){
				return response.data;
			})
			.catch(function (err){
				return Promise.reject(err.data);
			});
		}
	}
])
