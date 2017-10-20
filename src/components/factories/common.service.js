'use strict';

angular.module("scapicInterview")
.service("CommonService",[
	"$q",
	"$http",
	function($q, $http) {
		var factory = {};
		factory.requestApi = function(method, url, params, headers, body){
	  	   var promise = $q.defer();
			$http({
				method: method,
				url: url,
				params: params,
				headers: headers,
				data: body
			}).then(function successCallback(response) {
				// this callback will be called asynchronously
				// when the response is available
				promise.resolve(response);
			}, function errorCallback(error) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				promise.reject(error);
			});
			return promise.promise;
    }

    	return factory;
	}
]);
