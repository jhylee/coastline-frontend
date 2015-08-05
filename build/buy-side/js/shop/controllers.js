angular.module('coastlineShop.shop.controllers', ['ui.router', 'ngStorage', 'coastlineShop.shop.services', 'angularPayments'])

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

  var getItems = function () {
    console.log("getItems");
    console.log(ShopService.getItems());
    $scope.items = ShopService.getItems();
  };

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


  $scope.toggleItemSelection = function (index) {
    console.log("toggleItemSelection");
    ShopService.toggleItemSelection(index);
    $scope.refreshDeleteButton();
  };

  $scope.deleteSelectedItems = function () {
    console.log("deleteSelectedItems");
    ShopService.deleteSelectedItems();
    getItems();
  };

  $scope.refreshDeleteButton = function () {
    console.log("disabled: " + !ShopService.isAnythingSelected());
    $scope.isDeleteButtonDisabled = (!ShopService.isAnythingSelected());
  };

  $scope.getTotal = function () {
    return ShopService.getTotalCartValue();
  };

  $scope.refreshDeleteButton();
  getItems();

}])

.controller('checkoutCtrl', ['$rootScope', '$scope', '$window', '$state', '$location', '$localStorage', 'ShopService', function($rootScope, $scope, $window, $state, $location, $localStorage, ShopService) {
  console.log("checkoutCtrl");
  $scope.$storage = $localStorage;

  // CHECKOUT STATES : 0 is basic info input, 1 is for stripe info
  $scope.checkoutState = 0;

  $scope.refreshState = function() {
    console.log("refresh, service: " + ShopService.getCheckoutState());

    $scope.checkoutState = ShopService.getCheckoutState();

    console.log("refresh, checkoutState: " + $scope.checkoutState);

  };

  $scope.getCheckoutState = function() {
    console.log("**** " + ShopService.getCheckoutState());
    return ShopService.getCheckoutState();
  }

  $scope.proceedToPayment = function () {

    var orderDetails = {
      sellerUsername: "abdulkhan",
      buyerName: $scope.name,
      buyerEmail: $scope.email,
      buyerPhoneNumber: $scope.phoneNumber,
      buyerAddress: $scope.address,
      buyerCity: $scope.city,
      buyerState: $scope.state,
      buyerCountry: $scope.country,
      buyerPostalCode: $scope.postalCode,
      products: ShopService.getItems(),
      paymentMethod: "Credit Card",
    };

    ShopService.setOrderDetails(orderDetails);
    $scope.setCheckoutState(1);

  };

  $scope.backToOrderInfo = function () {
    $scope.setCheckoutState(0);
  };

  $scope.setCheckoutState = function (value) {
    ShopService.setCheckoutState(value);
    $scope.refreshState();
  };


  // if (!$localStorage.cart) {
  //   $localStorage.cart = [];
  // }

  console.log("checkoutCtrl");
  console.log("cart length: " + $localStorage.cart.length);

  $scope.getTotalAmount = function() {
    return ShopService.getTotalCartValue();
  };

  $scope.setOrderDetails = function () {

    console.log("begin setOrderDetails")


    console.log("end setOrderDetails")
  }

  $scope.stripeCallback = function (code, result) {
    console.log("begin stripeCallback")


    if (result.error) {
        window.alert('it failed! error: ' + result.error.message);
    } else {
        // window.alert('success! token: ' + result.id);
        // var order = {
        //   sellerUsername: "abdulkhan",
        //   buyerName: $scope.name,
        //   buyerEmail: $scope.email,
        //   buyerPhoneNumber: $scope.phoneNumber,
        //   buyerAddress: $scope.address,
        //   buyerCity: $scope.city,
        //   buyerState: $scope.state,
        //   buyerCountry: $scope.country,
        //   buyerPostalCode: $scope.postalCode,
        //   products: ShopService.getItems(),
        //   paymentMethod: "Credit Card",
        // };

        var order = ShopService.getOrderDetails();
        console.log(ShopService.getOrderDetails().name);

        order.buyerStripeToken = result.id;


        ShopService.makeOrder(order, function (res) {
          window.alert("success! " + res.data.sellerUsername);
        }, function (error) {
          window.alert("error! " + error);

        });

    }


    console.log("end stripeCallback")

  };

  $scope.refreshState();


}]);
