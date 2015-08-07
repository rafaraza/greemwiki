var greemWiki = angular.module('GreemWiki', []);

greemWiki.controller('AppController', ['$scope','$http','$window', function($scope, $http, $window){

	var refresh = function(){
			$http.get('/post').success(function(response){
			$scope.posts = response;
		});
	};

	$scope.logar = function(user){
		$http.post("/user/login", user).success(function(response){
			//adicionando usuario na sessao
			if(response.length > 0)
				$window.sessionStorage.setItem('usuario', response[0].nome);
		});
	};

	$scope.logado = function(){
		var valor = $window.sessionStorage.getItem('usuario');
		if(valor){
			$scope.usuario = valor + "(Sair)";
			return valor;
		}
		return null;
	}

	$scope.logout = function(){
		$window.sessionStorage.removeItem('usuario');
		$scope.usuario = "";
	}

	refresh();

}]);
