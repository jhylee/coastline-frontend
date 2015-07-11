angular.module('coastlineWebApp.dashboard.controllers', ['ui.router', 'ngStorage', 'coastlineWebApp.dashboard.services'])

.controller('navTopCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'NavTopService', function ($rootScope, $scope, $state, $location, $localStorage, NavTopService) {

  $scope.$storage = $localStorage;
  $scope.isToken = !($scope.$storage.token === undefined || $scope.$storage.token === null);
  console.log("controller instantiated");
  $scope.firstName = "test";

  $scope.init = function() {
    console.log("initializing");

    $scope.firstName = NavTopService.firstName(function (res) {
      console.log("res " + res.data);
        console.log("firstName: " + res);
        $scope.firstName = res;
      }, function (err) {
        console.log(err);
        $scope.firstName = "error getting name";
        // $rootScope.error = 'Failed to signup';
    })
  }

  $scope.init();
}])
