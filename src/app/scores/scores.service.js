'use strict'

angular.module("scapicInterview")
.service("ScoresService", [
	"CommonService",
	function(commonService) {
		this.getScores = function (){
			return commonService.requestApi("get", "/api/user/scores/1")
			.then(function(response){
				return response.data;
			});
		}
	}
])
