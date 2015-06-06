// Controllers
angular.module('coastlineWebApp.controllers', ['ngStorage'])

.controller('authCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Main', function ($rootScope, $scope, $location, $localStorage, Main) {

  $scope.$storage = $localStorage;

  console.log("on creation");
  console.log("localStorage: " + $localStorage.token);
  console.log("scope storage: " + $scope.$storage.token);

  $scope.login = function () {
    var formData = {
      username: $scope.username,
      password: $scope.password
    }

    Main.login(formData, function (res) {
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

      Main.signUpBuyer(formData, function (res) {
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


      Main.signUpSeller(formData, function (res) {
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
    Main.me(function (res) {
      $scope.myDetails = res;
    }, function () {
      $rootScope.error = 'Failed to fetch details';
    })
  };

  $scope.logout = function () {
    Main.logout(function () {
      window.location = "/"
    }, function () {
      alert("Failed to logout!");
    });
  };

}])

.controller('MeCtrl', ['$rootScope', '$scope', '$location', 'Main', function ($rootScope, $scope, $location, Main) {
  Main.me(function (res) {
    $scope.myDetails = res;
  }, function () {
    $rootScope.error = 'Failed to fetch details';
  })
}]);