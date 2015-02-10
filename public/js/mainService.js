(function() {

angular
	.module('textSupport')
	.service('mainService', mainService);


function mainService($http, $q) {

	this.sendReply = function(to_num, text) {
		dfd = $q.defer();
		$http.post('http://localhost:8080/api/reply', {
			to_number: to_num,
			text: text
		}).then(function(res) {
		dfd.resolve(res);
			
		})

		return dfd.promise
	}

	this.getResource = function(file) {
		return $http.get('http://localhost:8080/api/support/resources/' + file);
	}
}

})();