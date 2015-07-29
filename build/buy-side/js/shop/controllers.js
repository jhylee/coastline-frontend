angular.module('coastlineShop.shop.controllers', ['ui.router', 'ngStorage', 'coastlineShop.shop.services'])

.controller('shopCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'ShopService', function ($rootScope, $scope, $state, $location, $localStorage, ShopService) {

  $scope.$storage = $localStorage;

  $scope.items = ['products', 'cart', 'checkout'];

  console.log("hi");

  $scope.setSelection = function (index) {
    ShopService.setSelection(index);
  };

  $scope.getSelection = function () {
    return ShopService.getSelection();
  };

  $scope.setCurrentOrderRef = function (ref) {
    ShopService.setCurrentOrderRef(ref);
    $scope.setSelection(4);
  };

  $scope.getCartLength = function() {
    if ($localStorage.cart) {
      return $localStorage.cart.length;
    } else {
      return 0;
    }
  };

}])

.controller('productDisplayCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'ShopService', function ($rootScope, $scope, $state, $location, $localStorage, ShopService) {

  $scope.$storage = $localStorage;

  $scope.getProducts = function() {
    ShopService.getProducts(function (res) {
      $scope.products = res
    }, function (err) {
      console.log("error getting products");
    });
  }

  $scope.getProducts();



}])

.controller('productCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'ShopService', function ($rootScope, $scope, $state, $location, $localStorage, ShopService) {

  $scope.$storage = $localStorage;

  $scope.addItem = function(item) {
    console.log("add to cart");
    $localStorage.cart.push(item);
    $localStorage.$save();
    console.log($localStorage.cart[0]);
  };

}])


.controller('cartCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'ShopService', function ($rootScope, $scope, $state, $location, $localStorage, ShopService) {

  $scope.$storage = $localStorage;

  // if (!$localStorage.cart) {
  //   $localStorage.cart = [];
  // }


  $scope.getCartLength = function() {
    return $localStorage.cart.length;
  };

  $scope.getItems = function() {
    console.log($localStorage.cart);
    return $localStorage.cart;
  }

  $scope.addItem = function(item) {
    console.log("add to cart");
    $localStorage.cart.push(item);
    $localStorage.$save();
    console.log($localStorage.cart[0]);
  };

  $scope.removeItem = function(index) {
    $localStorage.cart.splice(index, 1);
  };

}])
