angular.module('coastlineWebApp.dashboard.controllers', ['ui.router', 'ngStorage', 'coastlineWebApp.dashboard.services', 'coastlineConstants'])

.controller('dashboardCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'DashboardService', 'Views', function ($rootScope, $scope, $state, $location, $localStorage, DashboardService, Views) {

  $scope.$storage = $localStorage;

  $scope.items = ['home', 'orders', 'products', 'add-product', 'order-detail'];

  console.log("hi");

  $scope.getStyle = function (index) {
    if (index == DashboardService.getSelection()) return "active";
    else return "";
  };

  $scope.setSelection = function (index) {
    DashboardService.setSelection(index);
  };

  $scope.getSelection = function () {
    return DashboardService.getSelection();
  };

  $scope.setCurrentOrderRef = function (ref) {
    DashboardService.setCurrentOrderRef(ref);
    $scope.setSelection(Views.ORDER_DETAIL);
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

  $scope.getOrders = function () {
    console.log("getOrders()");

    DashboardService.orders(
      function (res) {
        $scope.orders = res;
        // console.log ("res: " + $scope.orders);
      },
      function (err) {
        console.log ("err: " + err);
        // TODO - account for error connecting
      }
    );
  }


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

  $scope.getRef = function (order) {
    return order.ref;
  };



  $scope.getPaymentMethod = function (order) {
    return order.paymentMethod;
  };

  $scope.getStatus = function (order) {
    if (order.dateCleared != null) {
      if (order.dateCharged != null) {
        return "Charged";
      } else {
        return "Fulfilled";
      }
    } else {
      return "Outstanding";
    }
  };

  $scope.getDateInitialized = function (order) {
    // /return order.dateInitialized.toString();

    var today = new Date(order.dateInitialized.toString());
    //console.log(today.getDate());
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
      if(dd<10){
          dd='0'+dd
      }
      if(mm<10){
          mm='0'+mm
      }
    return mm+'/'+dd+'/'+yyyy;
  };

  $scope.getTotalAmount = function (order) {
    var val = Math.round(order.totalAmount * 100) / 100;
    var str = val.toString();

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
        return "$" + str + ".00";
      };

      // case 2: 4.1 scenario
      if ((i == str.length - 1)&&(digitAfterDecimal==1)){
        return "$" + str + "0";
      };

      // case 3: 4.11 (will definitely be at end, if not, then bug, but there shouldn't be a bug)
      if ((digitAfterDecimal==2)) {
        return "$" + str;
      }
    }

    return ;
  };

}])

.controller('orderDetailCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'DashboardService', 'Views', function ($rootScope, $scope, $state, $location, $localStorage, DashboardService, Views) {
  $scope.$storage = $localStorage;

  $scope.ref = DashboardService.getCurrentOrderRef();

  if ($scope.ref == null) {
    console.log("REF IS NULL");
    return "ERROR";
  };

  var formData = {
    ref: $scope.ref
  };

  DashboardService.getCurrentOrder(function(res) {
    $scope.order = res;
    console.log($scope.order);

    console.log($scope.order.ref);
  }, function(err) {
    return err;
  });

  $scope.fulfillOrder = function(ref) {
    var formData = {
      ref: ref
    };

    DashboardService.fulfillOrder(formData, function (res) {
      // TODO - Callback
      console.log("fulfilled order");

      DashboardService.getCurrentOrder(function(res) {
        $scope.order = res;
        console.log($scope.order);

        console.log($scope.order.ref);
      }, function(err) {
        return err;
      });


    }, function (err) {
      console.log("error fulfilling order");
      console.log(err);
    })
  };


  // TODO - DRY approach (repeated in other controller)
  $scope.getRef = function (order) {
    if (order) {
      return order.ref;
    }
  };

  $scope.getName = function (order) {
    if (order) {
      return order.buyerName;
    }
  };

  $scope.getAddress = function (order) {
    if (order) {
      return order.buyerAddress;
    }
  };

  $scope.getCity = function (order) {
    if (order) {
      return order.buyerCity;
    }
  };

  $scope.getState = function (order) {
    if (order) {
      return order.buyerState;
    }
  };

  $scope.getCountry = function (order) {
    if (order) {
      return order.buyerCountry;
    }
  };

  $scope.getPostalCode = function (order) {
    if (order) {
      return order.buyerPostalCode;
    }
  };

  $scope.getPhoneNumber = function (order) {
    if (order) {
      return order.buyerPhoneNumber;
    }
  };

  $scope.getEmail = function (order) {
    if (order) {
      return order.buyerEmail;
    }
  };

  $scope.getPaymentMethod = function (order) {
    if (order) {
      return order.paymentMethod;
    }
  };

  $scope.getStatus = function (order) {
    if (order) {

      if (order.dateCleared != null) {
        if (order.dateCharged != null) {
          return "Charged";
        } else {
          return "Fulfilled";
        }
      } else {
        return "Outstanding";
      }
    }
  };

  $scope.getDateInitialized = function (order) {
    if (order) {

      // /return order.dateInitialized.toString();

      var today = new Date(order.dateInitialized.toString());
      console.log(today.getDate());
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!

      var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        }
        if(mm<10){
            mm='0'+mm
        }
      return mm+'/'+dd+'/'+yyyy;
    }
  };

  $scope.getDateFulfilled = function (order) {
    if (order) {

      // /return order.dateInitialized.toString();

      if (order.dateFulfilled == null) {
        return "N/A";
      }

      var today = new Date(order.dateFulfilled.toString());
      console.log(today.getDate());
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!

      var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        }
        if(mm<10){
            mm='0'+mm
        }
      return mm+'/'+dd+'/'+yyyy;
    }
  };

  $scope.getTotalAmount = function (order) {
    if (order) {
      var val = Math.round(order.totalAmount * 100) / 100;
      var str = val.toString();

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
          return "$" + str + ".00";
        };

        // case 2: 4.1 scenario
        if ((i == str.length - 1)&&(digitAfterDecimal==1)){
          return "$" + str + "0";
        };

        // case 3: 4.11 (will definitely be at end, if not, then bug, but there shouldn't be a bug)
        if ((digitAfterDecimal==2)) {
          return "$" + str;
        }
      }

      return ;
    }
  };

  $scope.goBackToOrders = function () {
    console.log("goBackToOrders");
    DashboardService.setSelection(Views.ORDERS);
  };


}])


.controller('productDisplayCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'DashboardService', function ($rootScope, $scope, $state, $location, $localStorage, DashboardService) {

  $scope.getProducts = function() {
    DashboardService.products(
      function (res) {
        console.log("length" + res.length);
        $scope.products = res;
      },
      function (err) {
        console.log("err" + err);
      }
    );
  };

  $scope.deleteProduct = function (ref) {
    var formData = {
      productID : ref
    };

    // console.log(productID);

    DashboardService.deleteProduct(formData, function (res) {
      console.log("deleted!");
      $scope.getProducts();
    }, function (err) {
      console.log("error deleting product!");
    });
  };

  $scope.getProducts();

}])

.controller('productEditCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'DashboardService', 'Views', function ($rootScope, $scope, $state, $location, $localStorage, DashboardService, Views) {
  console.log('productEditCtrl');
  $scope.name = null;
  //
  // $scope.$watch('name', function() {
  //   console.log('hey, myVar has changed!');
  // });

  $scope.imageUrl = "";

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
      DashboardService.setSelection(Views.PRODUCTS);
    },
    function (err) {
      console.log(err);
    });

  };

  $scope.getEnv = function() {
    return "localdev";
  }

  $scope.getSeafoodTypes = function () {
    console.log("getSeafoodTypes");
    DashboardService.getSeafoodTypes(function (res) {
      $scope.seafoodTypes = res;
      console.log(res);
    }, function (err) {
      $scope.seafoodTypes = ["ERROR"];
    });
  };

  $scope.getImageUrl = function (name) {
    console.log("getImageUrl");

    DashboardService.getImageUrl(name, function (res) {
      $scope.imageUrl = res;
      console.log("image URL " + $scope.imageUrl);
    }, function (err) {
      $scope.imageUrl = "";
      console.log("error getting image URL");
    });
  };

  $scope.inputChanged = function (str) {
    if (str) {
      console.log("inputChanged");
      $scope.name = str;
      console.log($scope.name);
      $scope.getImageUrl($scope.name);

    }
  };

  $scope.selectedSeafood = function (selection) {
    if (selection) {
      console.log("selected");
      $scope.name = selection.title;
      console.log($scope.name);
      $scope.getImageUrl($scope.name);

    }
  };


  $scope.getSeafoodTypes();


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
