//===================
// paginador-buscador
//===================

var miApp = angular.module('searchApp', ['angularUtils.directives.dirPagination']);

miApp.controller('mainCtrl', function($scope, $http){
	//toma datos json github. Solo deja mostrar 1000 resultados
	$scope.cogerDatos = function() {
		$scope.userNotFound = false;
		$scope.loaded = false;

		$http.get("https://api.github.com/search/repositories?q=" + $scope.repositories + "&page=1&per_page=100")
			.success(function(data) {
				$scope.total = data.total_count;
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



