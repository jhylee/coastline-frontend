angular.module('coastlineWebApp.dashboard.controllers', ['ui.router', 'ngStorage', 'coastlineWebApp.dashboard.services'])

.controller('dashboardCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'DashboardService', function ($rootScope, $scope, $state, $location, $localStorage, DashboardService) {

  $scope.$storage = $localStorage;

  $scope.items = ['home', 'orders', 'products', 'add-product'];
  $scope.selection = 1;

  console.log("hi");

  $scope.getStyle = function (index) {
    if (index == $scope.selection) return "active";
    else return "";
  };

  $scope.setSelection = function (index) {
    $scope.selection = index;
    console.log($scope.selection);
  };



}])

.controller('transactionsCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'DashboardService', function ($rootScope, $scope, $state, $location, $localStorage, DashboardService) {

  $scope.$storage = $localStorage;

  DashboardService.transactions(
    function (res) {
      $scope.transactions = res;
      console.log ("res: " + $scope.transactions);
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

.controller('productDisplayCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'DashboardService', function ($rootScope, $scope, $state, $location, $localStorage, DashboardService) {
  DashboardService.products(
    function (res) {
      console.log("length" + res.length);
      $scope.products = res;
    },
    function (err) {
      console.log("err" + err);
    }
  )
}])

.controller('productEditCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'DashboardService', function ($rootScope, $scope, $state, $location, $localStorage, DashboardService) {
  $scope.addProduct = function () {

    console.log("addProduct");

    var formData = {
      name: $scope.name,
      unitPrice: $scope.unitPrice,
      units: $scope.units,
      availability: $scope.availability,
      featured: $scope.featured
    };

    console.log("name: " + formData.name);
    console.log("unitPrice: " + formData.unitPrice);
    console.log("units: " + formData.units);
    console.log("availability: " + formData.availability);
    console.log("featured: " + formData.featured);





    DashboardService.addProduct(formData, function (res) {

      },
      function (err) {
        console.log(err);
      });

  }
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
