angular.module('coastlineShop.shop.services', ['ngStorage','coastlineConstants'])

.factory('ShopService', ['$http', '$localStorage', 'apiUrl', function ($http, $localStorage, apiUrl) {
    var baseUrl = apiUrl;
    var selection = 0;
    var currentOrderRef = null;

    var orderDetails = null;
    var checkoutState = 0;

    return {
      // at startup
      init: function() {
        if (!$localStorage.cart) {
          console.log('initializing cart');
          $localStorage.cart = [];
        };

        if (!$localStorage.selectedItems) {
          console.log('initializing selectedItems');
          $localStorage.selectedItems = [];

          for (i = 0; i < $localStorage.cart.length; i++) {
            $localStorage.selectedItems.push(false);
          };

        };

        $localStorage.$save();
      },


      // for page navigation
      getPageSelection: function () {
        return selection;
      },
      setPageSelection: function (index) {
        selection = index;
      },

      // for product page
      getProducts: function(success, error) {
        var formData = {
          username: "abdulkhan"
        }
        $http.post(baseUrl + '/api/buy-side/products', formData).success(success).error(error);
      },


      setCheckoutState: function(value) {
        checkoutState = value;
      },

      getCheckoutState: function() {
        return checkoutState;
      },

      getOrderDetails: function () {
        return orderDetails;
      },

      setOrderDetails: function (newOrderDetails) {
        orderDetails = newOrderDetails;
      },

      // for product page
      makeOrder: function(formData, success, error) {
        $http.post(baseUrl + '/api/buy-side/add-order', formData).success(success).error(error);
      },


      addToCart: function(item) {
        console.log("add to cart");
        item.quantity = 1;
        $localStorage.cart.push(item);
        $localStorage.selectedItems.push(false);
        $localStorage.$save();
        console.log($localStorage.cart[0]);
      },

      // for cart page
      getItems: function() {
        return $localStorage.cart;
      },
      // for cart page
      getTotalCartValue: function() {
        var total = 0;

        for (i = 0; i < $localStorage.cart.length; i ++ ) {
          total += $localStorage.cart[i].quantity * $localStorage.cart[i].unitPrice;
        };

        return total;
      },

      selectItem: function(index) {
        $localStorage.selectedItems[index] = true;
        $localStorage.$save();
      },
      deselectItem: function(index) {
        $localStorage.selectedItems[index] = false;
        $localStorage.$save();
      },
      toggleItemSelection: function (index) {
        $localStorage.selectedItems[index] = (!$localStorage.selectedItems[index]);
        console.log($localStorage.selectedItems[index]);
      },

      deleteSelectedItems: function () {
        var newCart = [];
        var newSelectedItems = [];

        for (i = 0; i < $localStorage.cart.length; i++) {
          if ($localStorage.selectedItems[i] == false) {
            newCart.push($localStorage.cart[i]);
            newSelectedItems.push(false);
          }
        }

        $localStorage.cart = newCart;
        $localStorage.selectedItems = newSelectedItems;
        $localStorage.$save();

      },
      isAnythingSelected: function() {
        var isSelected = false

        for (i = 0; i < $localStorage.selectedItems.length; i++) {
          if ($localStorage.selectedItems[i] == true) {
            console.log("selected: "+ i);
            isSelected = true;
          }

          if (isSelected) break
        }

        if (isSelected) return true;
        return false;
      }


    };
  }
]);
