'use strict'

angular.module("scapicInterview")
.service("UserService", [
	"CommonService",
	function(commonService) {
		this.googleLogin = function(){
			return commonService.requestApi("get","/auth/google")
			.then(function(response){
				return response.data;
			})
		}
	}
])
