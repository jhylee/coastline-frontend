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

  $scope.createFishery = function () {
    var formData = {
      fisheryName: $scope.fisheryName,
    };

    AuthService.createFishery(formData, function (res) {
        $state.go('dashboard');
      },
      function (err) {
        $rootScope.error = 'Failed to createFishery';
        console.log("error createFishery");
      });
  };

  $scope.signUp = function () {

    // RedirectService.setRedirectState("wait");
    // $state.go('redirect');

    var formData = {
      username: $scope.username,
      password: $scope.password,
      accountType: $scope.accountType
    };

    var fisheryName = $scope.fisheryName

    AuthService.signUp(formData, fisheryName, function (res) {
      AuthService.login(formData, function (res) {
        $state.go('fishery-setup');
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
