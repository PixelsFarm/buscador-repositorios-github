//===================
// paginador-buscador
//===================

var miApp = angular.module('searchApp', []);

miApp.controller('mainCtrl', function($scope, $http){
	//toma datos json github. Solo deja mostrar 1000 resultados
	$scope.cogerDatos = function() {
		$scope.userNotFound = false;
		$scope.loaded = false;

		$http.get("https://api.github.com/search/repositories?q=" + $scope.repositories + "&page=10&per_page=30")
			.success(function(data) {
				$scope.repositorio = data.items;
				$scope.loaded = true;
				console.log('repositorios encontrados');
			})
			.error(function(data) {
				$scope.userNotFound = true;
				$scope.errorMessage = 'Error de conexion con datos';
				console.log('error de conexion');
			});

	}

});



