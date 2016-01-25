angular.module('coastlineShop.shop.controllers', ['ui.router', 'ngStorage', 'coastlineShop.shop.services', 'angularPayments', 'coastlineConstants'])

// for page navigation, first to be instantiated
.controller('shopCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'ShopService', function($rootScope, $scope, $state, $location, $localStorage, ShopService) {

  $scope.$storage = $localStorage;



  $scope.items = ['products', 'cart', 'checkout'];


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


  $scope.getProducts = function() {
    ShopService.getProducts(function(res) {
      $scope.products = res;
    }, function(err) {
      console.log("error getting products");
    });
  };


  $scope.getProducts();



}])

.controller('productCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'ShopService', function($rootScope, $scope, $state, $location, $localStorage, ShopService) {

  $scope.$storage = $localStorage;

  $scope.getAddButtonState = function(name) {
    if (ShopService.isProductAdded(name)) {
      return 1;
    }

    else {
      return 0;
    }
  };


  $scope.getImageSrc = function() {

      ShopService.getImageUrl("abdulkhan", $scope.product.name, "default", function (url) {
        $scope.imageSrc = url;
      }); // enter url here
  };


  $scope.addToCart = function(item) {
    ShopService.addToCart(item);
    $scope.addButtonState = 1;
  };

  $scope.deleteFromCart = function(item) {
    ShopService.deleteFromCart(item);
    $scope.addButtonState = 0;
  };

  $scope.getImageSrc();


}])

.controller('cartCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'ShopService', function($rootScope, $scope, $state, $location, $localStorage, ShopService) {

  $scope.$storage = $localStorage;

  // if (!$localStorage.cart) {
  //   $localStorage.cart = [];
  // }


  var formatNumber = function(number) {
    number = Math.round(number * 100) / 100
    var str = number.toString();

    var afterDecimal = false;
    var digitAfterDecimal = 0;
    var number = true;

    for (i = 0; i < str.length; i++) {
      if (afterDecimal==true) {
        digitAfterDecimal += 1;
      };

      if (str.charAt(i) == ".") {
        afterDecimal = true;
      };

      // case 1: no decimal (i.e. 4)
      if ((i == str.length - 1)&&(afterDecimal==false)){
        return str + ".00";
      };

      // case 2: 4.1 scenario
      if ((i == str.length - 1)&&(digitAfterDecimal==1)){
        return str + "0";
      };

      // case 3: 4.11 (will definitely be at end, if not, then bug, but there shouldn't be a bug)
      if ((digitAfterDecimal==2)) {
        return str;
      }
    }
  };

  var getItems = function() {
    $scope.items = ShopService.getItems();
    $scope.selectedItems = ShopService.getSelectedItems();
  };

  $scope.getCartLength = function() {
    return $localStorage.cart.length;
  };

  $scope.getPrice = function(unitPrice, quantity) {
    if (quantity) return formatNumber(Number(unitPrice) * Number(quantity));
    return formatNumber(unitPrice);
  };

  $scope.addItem = function(item) {
    ShopService.addItem(item)
  };


  $scope.toggleItemSelection = function(index) {
    ShopService.toggleItemSelection(index);
    $scope.refreshDeleteButton();
  };

  $scope.deleteSelectedItems = function() {
    ShopService.deleteSelectedItems();
    getItems();
    $scope.refreshDeleteButton();

  };

  $scope.refreshDeleteButton = function() {
    $scope.isDeleteButtonDisabled = (!ShopService.isAnythingSelected());
  };

  $scope.getTotal = function() {
    return formatNumber(ShopService.getTotalCartValue());
  };

  $scope.refreshDeleteButton();
  getItems();

}])

.controller('checkoutCtrl', ['$rootScope', '$scope', '$window', '$state', '$location', '$localStorage', 'ShopService', function($rootScope, $scope, $window, $state, $location, $localStorage, ShopService) {
  console.log("checkoutCtrl");
  $scope.$storage = $localStorage;

  // CHECKOUT STATES : 0 is basic info input, 1 is for stripe info
  $scope.refreshState = function() {
    $scope.checkoutState = ShopService.getCheckoutState();
  };

  $scope.getCheckoutState = function() {
    return ShopService.getCheckoutState();
  };

  $scope.setCheckoutState = function(value) {
    ShopService.setCheckoutState(value);
    $scope.refreshState();
  };

  $scope.getTotalCartValue = function() {
    return ShopService.getTotalCartValue();
  };

  $scope.refreshState();
}])

.controller('checkoutPart1Ctrl', ['$rootScope', '$scope', '$window', '$state', '$location', '$localStorage', 'ShopService', function($rootScope, $scope, $window, $state, $location, $localStorage, ShopService) {

  if (ShopService.getOrderDetails()) {
    var oldOrderDetails = ShopService.getOrderDetails();

    $scope.name = oldOrderDetails.name;
    $scope.email = oldOrderDetails.email;
    $scope.phoneNumber = oldOrderDetails.phoneNumber;
    $scope.address = oldOrderDetails.address;
    $scope.city = oldOrderDetails.city;
    $scope.state = oldOrderDetails.state;
    $scope.country = oldOrderDetails.country;
    $scope.postalCode = oldOrderDetails.postalCode;

  };




  $scope.proceedToPayment = function() {

    var orderDetails = {
      sellerUsername: ShopService.getSellerUsername(),
      name: $scope.name,
      email: $scope.email,
      phoneNumber: $scope.phoneNumber,
      address: $scope.address,
      city: $scope.city,
      state: $scope.state,
      country: $scope.country,
      postalCode: $scope.postalCode,
      products: ShopService.getItems(),
      paymentMethod: "Credit Card",
    };

    ShopService.setOrderDetails(orderDetails);

    $scope.setCheckoutState(1);

  };

}])


.controller('checkoutPart2Ctrl', ['$rootScope', '$scope', '$window', '$state', '$location', '$localStorage', 'ShopService', 'apiUrl', function($rootScope, $scope, $window, $state, $location, $localStorage, ShopService, apiUrl) {
  $scope.getTotalAmount = function() {
    return ShopService.getTotalCartValue();
  };

  $scope.backToOrderInfo = function() {
    ShopService.setCheckoutState(0);
  };

  $scope.stripeCallback = function(code, result) {

    if (result.error) {
      window.alert('it failed! error: ' + result.error.message);
    } else {
      var order = ShopService.getOrderDetails();
      order.stripeToken = result.id;

      if (apiUrl == "") {
        //TODO - if local.... do something
      }

      console.log(order.sellerUsername + " " + order.buyerEmail);

      ShopService.makeOrder(order, function(res) {
        ShopService.setPageSelection(0);
        ShopService.emptyCart();
        $state.go('thank-you');
      }, function(error) {
        window.alert("error! " + error);
      });
    }
    console.log("end stripeCallback");
  };

  $scope.setOrderDetails = function() {
  };

}]);
