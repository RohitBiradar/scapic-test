'use strict';

angular.module('scapicInterview', [
	"ui.router",
	"angular-storage",
	"ngCookies"
])
.config([
	"$urlRouterProvider",
	"storeProvider",
	"$httpProvider",
	"$locationProvider",
	function($urlRouterProvider,storeProvider,$httpProvider,$locationProvider) {
		$urlRouterProvider.otherwise('/');
		storeProvider.setStore('cookieStorage');
		$locationProvider.html5Mode(true);
		$httpProvider.interceptors.push('Interceptor');
	}
]);
