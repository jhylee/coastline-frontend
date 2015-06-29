angular.module('coastlineWebApp.auth.controllers', ['ngStorage', 'coastlineWebApp.auth.services'])

.controller('authCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'AuthService', function ($rootScope, $scope, $location, $localStorage, AuthService) {

  $scope.$storage = $localStorage;

}])

// CONTROLLER FOR LOGIN/LOGOUT 
.controller('loginCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'AuthService', function ($rootScope, $scope, $location, $localStorage, AuthService) {

  //  if ($localStorage.token == undefined) {
  //    console.log("token is undefined, changing to null");
  //
  //  }

  $scope.$storage = $localStorage;

  $scope.isToken = !($scope.$storage.token === undefined || $scope.$storage.token === null);

  console.log("on creation");
  console.log("localStorage: " + $localStorage.token);
  console.log("scope storage: " + $scope.$storage.token);

  $scope.login = function () {
    var formData = {
      username: $scope.username,
      password: $scope.password
    }

    AuthService.login(formData, function (res) {
      if (res.type == false) {
        alert(res.data)
      } else {
        $localStorage.token = res.token;
        console.log("on login");
        console.log("localStorage: " + $localStorage.token);
        console.log("scope storage: " + $scope.$storage.token);
        $localStorage.$save();
        window.location = "/";

      }
    }, function () {
      $rootScope.error = 'Failed to signin';
    })
  };

  $scope.signUp = function () {
    var formData = {
      username: $scope.username,
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      email: $scope.email,
      password: $scope.password
    }

    if ($scope.buySell == "buy") {

      console.log("sign up buyer");

      AuthService.signUpBuyer(formData, function (res) {
        if (res.type == false) {
          alert(res.data)
        } else {
          //$localStorage.token = res.data.token;
          window.location = "/"
        }
      }, function () {
        $rootScope.error = 'Failed to signup';
      })
    } else if ($scope.buySell == "sell") {

      console.log("sign up seller");


      AuthService.signUpSeller(formData, function (res) {
        if (res.type == false) {
          alert(res.data)
        } else {
          //$localStorage.token = res.body.token;
          window.location = "/"
        }
      }, function () {
        $rootScope.error = 'Failed to signup';
      })

    } else {
      console.log("neither" + $scope.buySell);
    }
  }

  $scope.me = function () {
    AuthService.me(function (res) {
      $scope.myDetails = res;
    }, function () {
      $rootScope.error = 'Failed to fetch details';
    })
  };

  $scope.logout = function () {
    console.log("attempting to logout");

    $localStorage.token = null;
    $localStorage.$save();
    window.location = "/";

    //    AuthService.logout(function () {
    //      window.location = "/"
    //    }, function () {
    //      alert("Failed to logout!");
    //    });
  };

}])