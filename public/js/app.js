(function() {

angular
	.module('textSupport', ['ngRoute', 'firebase'])
	.config(config);

function config($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
		})
		.when('/support', {
			templateUrl: 'views/support.html',
			controller: 'SupportCtrl',
			controllerAs: 'vm',
			resolve: {
				supportRef: function($firebase) {
					return $firebase(new Firebase('https://jcd.firebaseio.com/twilio/numbers'));
				}
			}
		})
		.otherwise('/');
}


})();