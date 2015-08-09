angular.module('coastlineWebApp.dashboard.controllers', ['ui.router', 'ngStorage', 'coastlineWebApp.dashboard.services'])

.controller('dashboardCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'DashboardService', function ($rootScope, $scope, $state, $location, $localStorage, DashboardService) {

  $scope.$storage = $localStorage;

  $scope.items = ['home', 'orders', 'store', 'messages'];
  $scope.selection = $scope.items[0];

  $scope.homeStyle = "active";
  $scope.ordersStyle = "";
  $scope.storeStyle = "";
  $scope.messagesStyle = "";


  $scope.setToHome = function() {
    $scope.selection = $scope.items[0];

    $scope.homeStyle = "active";
    $scope.ordersStyle = "";
    $scope.storeStyle = "";
    $scope.messagesStyle = "";

    console.log('go to home');

  };

  $scope.setToOrders = function() {
    $scope.selection = $scope.items[1];

    $scope.homeStyle = "";
    $scope.ordersStyle = "active";
    $scope.storeStyle = "";
    $scope.messagesStyle = "";

    console.log('go to orders');

  };

  $scope.setToStore = function() {
    $scope.selection = $scope.items[2];

    $scope.homeStyle = "";
    $scope.ordersStyle = "";
    $scope.storeStyle = "active";
    $scope.messagesStyle = "";
    

    console.log('go to store');

  };

  $scope.setToMessages = function() {
    $scope.selection = $scope.items[3];

    $scope.homeStyle = "";
    $scope.ordersStyle = "";
    $scope.storeStyle = "";
    $scope.messagesStyle = "active";

    console.log('go to messages');

  };


}])

.controller('ordersCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'DashboardService', function ($rootScope, $scope, $state, $location, $localStorage, DashboardService) {

  $scope.$storage = $localStorage;

  DashboardService.orders(
    function (res) {
      $scope.orders = res;
      console.log ("res: " + $scope.orders);
    },
    function (err) {
      console.log ("err: " + err);
      // TODO - account for error connecting
    }
  );
  //console.log ("again, res: " + $scope.details.firstName);

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
