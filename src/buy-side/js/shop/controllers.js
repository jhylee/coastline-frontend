angular.module('coastlineShop.shop.controllers', ['ui.router', 'ngStorage', 'coastlineShop.shop.services'])

// for page navigation, first to be instantiated
.controller('shopCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'ShopService', function($rootScope, $scope, $state, $location, $localStorage, ShopService) {

  $scope.$storage = $localStorage;



  $scope.items = ['products', 'cart', 'checkout'];

  console.log("hi");

  $scope.init = function() {
    ShopService.init();
  };

  $scope.selectItem = function(index) {
    ShopService.selectItem(index);
  };

  $scope.deselectItem = function(index) {
    ShopService.deselectItem(index);
  };

  $scope.getSelectedItems = function(index) {
    ShopService.getSelectedItems(index);
  };

  $scope.getPageSelection = function() {
    return ShopService.getPageSelection();
  };

  $scope.setPageSelection = function(index) {
    ShopService.setPageSelection(index);
  };

  $scope.setCurrentOrderRef = function(ref) {
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

  $scope.init();

}])

.controller('productDisplayCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'ShopService', function($rootScope, $scope, $state, $location, $localStorage, ShopService) {

  $scope.$storage = $localStorage;

  console.log('init productDisplayCtrl');

  $scope.getProducts = function() {
    ShopService.getProducts(function(res) {
      $scope.products = res;
    }, function(err) {
      console.log("error getting products");
    });
  }

  $scope.getProducts();



}])

.controller('productCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'ShopService', function($rootScope, $scope, $state, $location, $localStorage, ShopService) {

  $scope.$storage = $localStorage;

  $scope.addToCart = function(item) {
    ShopService.addToCart(item);
  };
}])


.controller('cartCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'ShopService', function($rootScope, $scope, $state, $location, $localStorage, ShopService) {

  $scope.$storage = $localStorage;

  // if (!$localStorage.cart) {
  //   $localStorage.cart = [];
  // }

  console.log("cartCtrl");
  console.log($localStorage.cart[0]);

  $scope.getCartLength = function () {
    return $localStorage.cart.length;
  };

  $scope.getPrice = function (unitPrice, quantity) {
    if (quantity) return Number(unitPrice) * Number(quantity);
    return unitPrice;
  };

  $scope.addItem = function (item) {
    ShopService.addItem(item)
  };

  $scope.removeItem = function (index) {
    $localStorage.cart.splice(index, 1);
  };

  $scope.toggleItemSelection = function (index) {
    console.log("toggleItemSelection");
    ShopService.toggleItemSelection(index);
    $scope.refreshDeleteButton();
  };

  $scope.deleteSelectedItems = function () {};

  $scope.refreshDeleteButton = function () {
    console.log("disabled: " + !ShopService.isAnythingSelected());
    $scope.isDeleteButtonDisabled = (!ShopService.isAnythingSelected());
  };

  var getItems = function () {
    console.log("getItems");
    console.log(ShopService.getItems());
    $scope.items = ShopService.getItems();
  };

  $scope.refreshDeleteButton();
  $scope.items = getItems();

}]);
