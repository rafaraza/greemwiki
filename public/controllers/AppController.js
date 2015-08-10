var greemWiki = angular.module('GreemWiki', []);

greemWiki.controller('AppController', ['$scope','$http','$window', function($scope, $http, $window){

	$scope.post = "";

	var refresh = function(){
			$http.get('/post').success(function(response){
			$scope.posts = response;
		});
	};

	$scope.ativarEdicao = function(){
		$scope.edicao = true;
	};

	$scope.desativarEdicao = function(){
		$scope.post = "";
		$scope.edicao = false;
	};

	$scope.edicao = false;

	refresh();

    $scope.pesquisar = function(){

    	if($scope.pesquisa != undefined && $scope.pesquisa != ""){
    		$http.get('/post/search/' + $scope.pesquisa).success(function(response){    			
				$scope.posts = response;
			});
    	} else {
    		refresh();
    	}
	};

	$scope.salvarPost = function() {		
		
		$scope.post.data = new Date();
		$scope.post.user = "to-do";
		$http.post('/post', $scope.post).success(function(response){
			$scope.edicao = false;
			refresh();
			$scope.post = "";
		});
	};

	$scope.logar = function(user){
		$http.post("/user/login", user).success(function(response){
			//adicionando usuario na sessao			
			if(response != null){				
				$window.sessionStorage.setItem('usuario', response.nome);
			}
		});
	};

	$scope.logado = function(){		
		var valor = $window.sessionStorage.getItem('usuario');		
		if(valor){
			$scope.usuario = valor + "(Sair)";
			return valor;
		}
		return false;
	};

	$scope.logout = function(){
		$window.sessionStorage.removeItem('usuario');
		$scope.usuario = "";
	};

}]);