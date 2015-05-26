"use strict";

var app = angular.module('coastlineWebApp', ['ui.router',
    'ngStorage'
//    'ngRoute',
//    'angular-loading-bar'
]);


app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider

  // HOME STATES AND NESTED VIEWS ========================================
    .state('home', {
    url: '/',
    templateUrl: '/views/landing/home.html'
  })

  // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
  .state('login', {
    url: '/login',
    templateUrl: '/views/landing/login.html'
  })

  .state('signUp', {
    url: '/signUp',
    templateUrl: '/views/landing/signUp.html'
  })

  .state('buyerWebApp', {
    url: '/webapp/buyer',
    templateUrl: '/views/buy-side/buyerWebApp.html'
  })

  .state('sellerWebApp', {
    url: '/webapp/seller',
    templateUrl: '/views/sell-side/sellerWebApp.html'
  })

  //  $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
  //    return {
  //      'request': function (config) {
  //        config.headers = config.headers || {};
  //        if ($localStorage.token) {
  //          config.headers.Authorization = 'Bearer ' + $localStorage.token;
  //        }
  //        return config;
  //      },
  //      'responseError': function (response) {
  //        if (response.status === 401 || response.status === 403) {
  //          $location.path('/signin');
  //        }
  //        return $q.reject(response);
  //      }
  //    }
  //    }]);


});


// Controllers

app.controller('authCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Main', function ($rootScope, $scope, $location, $localStorage, Main) {
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
        console.log($localStorage.token);

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
  $scope.token = $localStorage.token;
}]);

app.controller('MeCtrl', ['$rootScope', '$scope', '$location', 'Main', function ($rootScope, $scope, $location, Main) {
  Main.me(function (res) {
    $scope.myDetails = res;
  }, function () {
    $rootScope.error = 'Failed to fetch details';
  })
}]);


// Services

app.factory('Main', ['$http', '$localStorage', function ($http, $localStorage) {
    var baseUrl = "http://localhost:3000";

    function changeUser(user) {
      angular.extend(currentUser, user);
    }

    function urlBase64Decode(str) {
      var output = str.replace('-', '+').replace('_', '/');
      switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
      }
      return window.atob(output);
    }

    function getUserFromToken() {
      var token = $localStorage.token;
      var user = {};
      if (typeof token !== 'undefined') {
        var encoded = token.split('.')[1];
        user = JSON.parse(urlBase64Decode(encoded));
      }
      return user;
    }

    var currentUser = getUserFromToken();

    return {
      save: function (data, success, error) {
        $http.post(baseUrl + '/signin', data).success(success).error(error)
      },

      signUpBuyer: function (data, success, error) {
        $http.post(baseUrl + '/users/signUp/buyer', data).success(success).error(error)
      },

      signUpSeller: function (data, success, error) {
        var response = $http.post(baseUrl + '/users/signUp/seller', data).success(success).error(error)
        console.log(response);
      },

      login: function (data, success, error) {
        $http.post(baseUrl + '/users/login', data).success(success).error(error)
      },
      me: function (success, error) {
        $http.get(baseUrl + '/me').success(success).error(error)
      },
      logout: function (success) {
        changeUser({});
        delete $localStorage.token;
        success();
      }
    };
    }
  ]);