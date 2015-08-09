angular.module('coastlineWebApp.auth.controllers', ['ui.router', 'ngStorage', 'coastlineWebApp.auth.services'])

.controller('accountCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'AuthService', function ($rootScope, $scope, $state, $location, $localStorage, AuthService) {

  // $scope.$storage = $localStorage;
  // $scope.isToken = !($scope.$storage.token === undefined || $scope.$storage.token === null);

  $scope.logout = function () {
    console.log("TEST");
    // console.log("token before logout: " + $localStorage.token);


    AuthService.logout(function() {
      $state.go('login');
    });

    //    AuthService.logout(function () {
    //      window.location = "/"
    //    }, function () {
    //      alert("Failed to logout!");
    //    });
  };

}])

// CONTROLLER FOR LOGIN/LOGOUT
.controller('loginCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'AuthService', function ($rootScope, $scope, $state, $location, $localStorage, AuthService) {

  //  if ($localStorage.token == undefined) {
  //    console.log("token is undefined, changing to null");
  //
  //  }

  $scope.isToken = AuthService.isAuthenticated();

  $scope.$storage = $localStorage;


  console.log("on creation");
  console.log("localStorage: " + $localStorage.token);
  console.log("scope storage: " + $scope.$storage.token);

  $scope.login1 = function () {
    var formData = {
      username: $scope.username,
      password: $scope.password
    };

    AuthService.login(formData, function (res) {
        if (res.type === false) {
          alert(res.data);
        } else {
          $localStorage.token = res.token;
          console.log("on login");
          console.log("localStorage: " + $localStorage.token);
          console.log("scope storage: " + $scope.$storage.token);
          $localStorage.$save();
          $state.go('dashboard');

        }
      },
      function () {
        $rootScope.error = 'Failed to signin';
      });
  };

  $scope.login = function () {
    var formData = {
      username: $scope.username,
      password: $scope.password
    };

    AuthService.login(formData, function (res) {
        $state.go('dashboard');
      },
      function (err) {
        $rootScope.error = 'Failed to signin';
        console.log("error signing in");
      });
  };

  $scope.signUp = function () {
    $state.go('redirect');

    var formData = {
      organization: $scope.organization,
      username: $scope.username,
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      email: $scope.email,
      password: $scope.password,
      phoneNumber: $scope.phoneNumber
    };

    AuthService.signUp(formData, function (res) {
      AuthService.login(formData, function (res) {
        $state.go('dashboard');
      });
    }, function (err) {
      console.log("signup then login then error");
      console.log(err);
    });

  };

  $scope.me = function () {
    AuthService.me(function (res) {
      $scope.myDetails = res;
    }, function () {
      $rootScope.error = 'Failed to fetch details';
    });
};

}]);
