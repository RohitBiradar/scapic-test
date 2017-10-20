'use strict'

angular.module("scapicInterview")
.factory("Auth", [
	"store",
	"$rootScope",
	function(store, $rootScope) {
		var factory = {};

		factory.setToken = function(token) {
			return store.set("token" , token);
		}

		factory.getToken = function() {
			return store.get("token",true);
		}

		factory.logOut = function() {
			store.remove("token");
		}
		
		return factory;
	}
])
