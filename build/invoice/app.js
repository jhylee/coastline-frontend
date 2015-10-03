var app = angular.module('coastlineInvoice', ['ui.router', 'coastlineInvoice.controllers', 'coastlineInvoice.services'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/display/:token', {
      templateUrl: 'invoice.html',
      controller: 'invoiceCtrl'
    })

    .otherwise('/')


}]);

angular.module('coastlineInvoice.controllers', [])
.controller('invoiceCtrl', ['InvoiceService', '$scope',  function(InvoiceService, $scope) {

  console.log(InvoiceService.getOrder());


  InvoiceService.getInvoice(function (res) {
    $scope.order = res;

    var total = 0;

    for ( i = 0; i < $scope.order.products.length; i++) {
      total += $scope.order.products[i].quantity * $scope.order.products[i].unitPrice;
    };

    $scope.order.total = total;

    console.log($scope.order.total);
  }, function (err) {
    console.log("error retrieving order")
  });

  $scope.getSellerOrganization = function () {
    if ($scope.order) {
      return $scope.order.sellerOrganization;
    }
  }

  $scope.getSellerAddress = function () {
    if ($scope.order) {
      return $scope.order.sellerAddress
    }
  }

  $scope.getSellerCity = function () {
    if ($scope.order) {
      return $scope.order.sellerCity;
    }
  }

  $scope.getSellerState = function () {
    if ($scope.order) {
      return $scope.order.sellerState;
    }
  }

  $scope.getSellerPostalCode = function () {
    if ($scope.order) {
      return $scope.order.sellerPostalCode;
    }
  }

  $scope.getSellerPhoneNumber = function () {
    if ($scope.order) {
      return $scope.order.sellerPhoneNumber;
    }
  }

  $scope.getSellerEmail = function () {
    if ($scope.order) {
      return $scope.order.sellerEmail;
    }
  }

  $scope.getBuyerName = function () {
    if ($scope.order) {
      return $scope.order.buyerName;
    }
  }

  $scope.getBuyerAddress = function () {
    if ($scope.order) {
      return $scope.order.buyerAddress;
    }
  }

  $scope.getBuyerCity = function () {
    if ($scope.order) {
      return $scope.order.buyerCity;
    }
  }

  $scope.getBuyerState = function () {
    if ($scope.order) {
      return $scope.order.buyerState;
    }
  }

  $scope.getBuyerPostalCode = function () {
    if ($scope.order) {
      return $scope.order.buyerPostalCode;
    }
  }

  $scope.getBuyerPhoneNumber = function () {
    if ($scope.order) {
      return $scope.order.buyerPhoneNumber;
    }
  }

  $scope.getProducts = function () {
    if ($scope.order) {
      return $scope.order.products;
    }
  }

  $scope.getOrderTotal = function() {
    if ($scope.order) {
      return $scope.order.total;
    }
  }

  $scope.getTotalAmount = function (val) {
    var val = Math.round(val * 100) / 100;
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


angular.module('coastlineInvoice.services', ['ngRoute'])
  .factory('InvoiceService', ['$http', '$routeParams', function ($http, $routeParams) {

    return {
      getOrder: function() {
        token = $routeParams.token;
        console.log(token);
        return token;

      },

      getInvoice: function (success, error) {
        // $routeParams.token
        $http.get('http://localhost:3000/api/buy-side/invoice/' + $routeParams.token).success(success).error(error);
      }
    };



  }]);
