//===================
// paginador-buscador
//===================

//modulo
var miApp = angular.module('searchApp', ['angularUtils.directives.dirPagination']);

//mainCtrl
miApp.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
	//vars
	$scope.preload = false;

	//toma datos json github. Solo deja mostrar 1000 resultados
	$scope.cogerDatos = function() {
		$scope.userNotFound = false;
		$scope.loaded = false;
		$scope.preload = true;

		$http.get("https://api.github.com/search/repositories?q=" + $scope.repositories + "&page=1&per_page=100")
			.success(function(data) {
				$scope.arrRepo = data; //guardamos datos json en array local
				$scope.total = $scope.arrRepo.total_count; //total de reistros
				$scope.repositorio = $scope.arrRepo.items; //accedemos al objeto "items" del array del repositorio
				$scope.loaded = true;
				$scope.preload = false;
				console.log('repositorios encontrados');
			})
			.error(function(data) {
				$scope.userNotFound = true;
				$scope.errorMessage = 'Error de conexion con datos';
				console.log('error de conexion');
			});
	}
}]);



