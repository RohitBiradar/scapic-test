"use strict";

angular.module("scapicInterview")
.factory("Interceptor",["Auth",function(auth) {
	return {
		request : function(config) {
			var token = auth.getToken();
			config.headers.authorization = token;
			return config;
		}
	}
	}
])
