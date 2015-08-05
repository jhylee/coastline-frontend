angular.module('coastlineWebApp.dashboard.controllers', ['ui.router', 'ngStorage', 'coastlineWebApp.dashboard.services'])

.controller('dashboardCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'DashboardService', function ($rootScope, $scope, $state, $location, $localStorage, DashboardService) {

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
    $scope.setSelection(4);
  };

}])

.controller('transactionsCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'DashboardService', function ($rootScope, $scope, $state, $location, $localStorage, DashboardService) {

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

.controller('transactionDetailCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'DashboardService', function ($rootScope, $scope, $state, $location, $localStorage, DashboardService) {
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
    return order.ref;
  };

  $scope.getName = function (order) {
    return order.buyerName;
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
  };

  $scope.getDateFulfilled = function (order) {
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
        DashboardService.setSelection(2);
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
