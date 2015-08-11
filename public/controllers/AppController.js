var greemWiki = angular.module('GreemWiki', []);

greemWiki.controller('AppController', ['$scope','$http','$window', function($scope, $http, $window){

	$scope.post = "";			

	if($window.sessionStorage.getItem('userLog') == null || $window.sessionStorage.getItem('userLog') == 'undefined'){
		$scope.userLog = "";
		$scope.page = 'login.html';		
	}
	else{
		$scope.userLog = angular.fromJson($window.sessionStorage.getItem('userLog'));
		$scope.page = 'principal.html';		
	}

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

	$scope.logar = function(username, password){

		var user = { username:  username, password: password };
		$http.post("/login", user).success(function(response){

			$scope.msgErro = "";
			if(response.success == true){
				$scope.userLog = response.user;			
				$window.sessionStorage.setItem('userLog', JSON.stringify(response.user));
				$scope.page = 'principal.html';				
			} else {
				$scope.msgErro = response.message;
			}
		});
	};



	$scope.logout = function(){

		$http.get("/signout").success(function(response){
			$window.sessionStorage.removeItem('userLog');
			$scope.userLog = "";			
			$scope.page = 'login.html';
		});
	};

}]);