angular.module('coastlineShop.shop.controllers', ['ui.router', 'ngStorage', 'coastlineShop.shop.services'])

.controller('shopCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'DashboardService', function ($rootScope, $scope, $state, $location, $localStorage, DashboardService) {

  $scope.$storage = $localStorage;

  $scope.items = ['products', 'cart', 'checkout'];

  console.log("hi");

  $scope.setSelection = function (index) {
    DashboardService.setSelection(index);
  };

  $scope.getSelection = function () {
    return DashboardService.getSelection();
  };

  $scope.setCurrentOrderRef = function (ref) {
    DashboardService.setCurrentOrderRef(ref);
    $scope.setSelection(4);
  };

}])
