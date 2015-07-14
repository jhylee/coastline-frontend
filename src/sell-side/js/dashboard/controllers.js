angular.module('coastlineWebApp.dashboard.controllers', ['ui.router', 'ngStorage', 'coastlineWebApp.dashboard.services'])

.controller('bodyCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'DashboardService', function ($rootScope, $scope, $state, $location, $localStorage, DashboardService) {

  $scope.$storage = $localStorage;
  $scope.isToken = !($scope.$storage.token === undefined || $scope.$storage.token === null);
  console.log("controller instantiated");

  DashboardService.accountDetails(
    function (res) {
      $scope.details = res;
      console.log ("res: " + $scope.details.firstName);
    },
    function (err) {
      console.log ("err: " + err);
      // TODO - account for error connecting
    }
  );
  //console.log ("again, res: " + $scope.details.firstName);

}])

.controller('myOrdersCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'DashboardService', function ($rootScope, $scope, $state, $location, $localStorage, DashboardService) {

  $scope.$storage = $localStorage;
  $scope.isToken = !($scope.$storage.token === undefined || $scope.$storage.token === null);
  console.log("controller instantiated");

  DashboardService.orders(
    function (res) {
      $scope.details = res;
      console.log ("res: " + $scope.details.firstName);
    },
    function (err) {
      console.log ("err: " + err);
      // TODO - account for error connecting
    }
  );
  //console.log ("again, res: " + $scope.details.firstName);

}])

.controller('navTopCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'DashboardService', function ($rootScope, $scope, $state, $location, $localStorage, DashboardService) {

  $scope.$storage = $localStorage;
  $scope.isToken = !($scope.$storage.token === undefined || $scope.$storage.token === null);

  DashboardService.accountDetails(
    function (res) {
      $scope.details = res;
      // console.log ("res: " + $scope.details.firstName);
    },
    function (err) {
      console.log ("err: " + err);
      // TODO - account for error connecting
    }
  );

}]);
