var greemWiki = angular.module('GreemWiki', []);

greemWiki.controller('AppController', ['$scope','$http', function($scope, $http){

	var refresh = function(){
			$http.get('/post').success(function(response){
			$scope.posts = response;
		});
	};

	refresh();
}]);