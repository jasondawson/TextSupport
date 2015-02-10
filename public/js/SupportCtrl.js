(function() {

angular
	.module('textSupport')
	.controller('SupportCtrl', SupportCtrl);

function SupportCtrl ($firebase, supportRef, mainService, $window) {

	var vm = this;
	vm.reply = '';

	vm.numbers = supportRef;
	//console.log(vm.numbers);

	vm.sendReply = function(to_num) {
		//console.log('send reply to ' + to_num);
		mainService.sendReply(to_num, vm.reply).then(function() {
			vm.numbers = supportRef;
			vm.reply = '';
		});
	}

	vm.getResource = function(file) {
		//console.log('attempting GET ' + file)
		mainService.getResource(file).then(function(res) {
			console.log(res);
			$window.open(res.config.url);
		});
	}

}

})();