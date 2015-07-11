angular.module('coastlineWebApp.dashboard.controllers', ['ui.router', 'ngStorage', 'coastlineWebApp.dashboard.services'])

.controller('bodyCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'DashboardService', function ($rootScope, $scope, $state, $location, $localStorage, DashboardService) {

  $scope.$storage = $localStorage;
  $scope.isToken = !($scope.$storage.token === undefined || $scope.$storage.token === null);
  console.log("controller instantiated");
  $scope.firstName = "test";

  $scope.init = function() {
    console.log("initializing");

    $scope.accountDetails = DashboardService.accountDetails(function (res) {
      // console.log("res " + res.firstName);
      $scope.username = res.username;
      $scope.firstName = res.firstName;
      $scope.lastName = res.lastName;
      $scope.email = res.email;
      $scope.phoneNumber = res.phoneNumber;

    }, function (err) {

      // TODO - account for error connecting

      console.log(err);
      $scope.firstName ="error getting name";
      // $rootScope.error = 'Failed to signup';
    });
  }

  $scope.init();
}])

.controller('navTopCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'DashboardService', function ($rootScope, $scope, $state, $location, $localStorage, DashboardService) {

  $scope.$storage = $localStorage;
  $scope.isToken = !($scope.$storage.token === undefined || $scope.$storage.token === null);

  console.log("controller instantiated");
  // $scope.firstName = "test";

  $scope.init = function() {
    console.log("initializing");
    $scope.details = DashboardService.accountDetails();
    console.log($scope.details);

  }

  $scope.init();
}])
