'use strict';

angular.module("scapicInterview")
.service("DashboardService", [
	"CommonService",
	function(commonService) {
		this.checkAdminSession = function (){
			return commonService.requestApi("get", "/api/admin/session")
			.then(function(response){
				return response.data;
			});
		}
	}
])
