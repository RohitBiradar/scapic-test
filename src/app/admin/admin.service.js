'use strict'

angular.module("scapicInterview")
.service("AdminService", [
	"CommonService",
	function(commonService) {
		this.loginAdmin = function (email, password){
			return commonService.requestApi("post", "/auth/local/admin", null, "", {
				email : email,
				password : password
			})
			.then(function(response){
				return response.data;
			});
		}
	}
])
