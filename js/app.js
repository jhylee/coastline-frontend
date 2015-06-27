"use strict";

var app = angular.module('coastlineWebApp', ['ui.router',
    'ngStorage',
//    'ngRoute',
//    'angular-loading-bar',
    'coastlineWebApp.controllers',
    'coastlineWebApp.services'
]);


app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider

  // HOME STATES AND NESTED VIEWS ========================================
    .state('home', {
    url: '/',
    templateUrl: '/views/buy-side/buyercomponents.html'
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

  .state('about', {
    url: '/about',
    templateUrl: '/views/landing/about.html'
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


//app.controller('authCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Main', function ($rootScope, $scope, $location, $localStorage, Main) {
//
//  $scope.theToken = Main.getToken();
//  console.log("Main.getToken()" + Main.getToken());
//  console.log($localStorage.token);
//  $scope.login = function () {
//    var formData = {
//      username: $scope.username,
//      password: $scope.password
//    }
//
//    Main.login(formData, function (res) {
//      if (res.type == false) {
//        alert(res.data)
//      } else {
//        $localStorage.token = res.token;
//        console.log($localStorage.token);
//        $scope.token = true;
//        console.log($scope.token);
//        Main.setToken($localStorage.token);
//        window.location = "/";
//      }
//    }, function () {
//      $rootScope.error = 'Failed to signin';
//    })
//  };
//
//  $scope.signUp = function () {
//    var formData = {
//      username: $scope.username,
//      firstName: $scope.firstName,
//      lastName: $scope.lastName,
//      email: $scope.email,
//      password: $scope.password
//    }
//
//    if ($scope.buySell == "buy") {
//
//      console.log("sign up buyer");
//
//      Main.signUpBuyer(formData, function (res) {
//        if (res.type == false) {
//          alert(res.data)
//        } else {
//          //$localStorage.token = res.data.token;
//          window.location = "/"
//        }
//      }, function () {
//        $rootScope.error = 'Failed to signup';
//      })
//    } else if ($scope.buySell == "sell") {
//
//      console.log("sign up seller");
//
//
//      Main.signUpSeller(formData, function (res) {
//        if (res.type == false) {
//          alert(res.data)
//        } else {
//          //$localStorage.token = res.body.token;
//          window.location = "/"
//        }
//      }, function () {
//        $rootScope.error = 'Failed to signup';
//      })
//
//    } else {
//      console.log("neither" + $scope.buySell);
//    }
//  }
//
//  $scope.me = function () {
//    Main.me(function (res) {
//      $scope.myDetails = res;
//    }, function () {
//      $rootScope.error = 'Failed to fetch details';
//    })
//  };
//
//  $scope.logout = function () {
//    Main.logout(function () {
//      window.location = "/"
//    }, function () {
//      alert("Failed to logout!");
//    });
//  };
//
//  $scope.token = false;
//}]);
//
//app.controller('MeCtrl', ['$rootScope', '$scope', '$location', 'Main', function ($rootScope, $scope, $location, Main) {
//  Main.me(function (res) {
//    $scope.myDetails = res;
//  }, function () {
//    $rootScope.error = 'Failed to fetch details';
//  })
//}]);

//app.factory('Main', ['$http', '$localStorage', function ($http, $localStorage) {
//    var baseUrl = "http://localhost:3000";
//    var token = "";
//
//
//
//    return {
//      save: function (data, success, error) {
//        $http.post(baseUrl + '/signin', data).success(success).error(error)
//      },
//
//      signUpBuyer: function (data, success, error) {
//        $http.post(baseUrl + '/users/signUp/buyer', data).success(success).error(error)
//      },
//
//      signUpSeller: function (data, success, error) {
//        var response = $http.post(baseUrl + '/users/signUp/seller', data).success(success).error(error)
//        console.log(response);
//      },
//
//      login: function (data, success, error) {
//        $http.post(baseUrl + '/users/login', data).success(success).error(error)
//      },
//      me: function (success, error) {
//        $http.get(baseUrl + '/me').success(success).error(error)
//      },
//      logout: function (success) {
//        delete $localStorage.token;
//        success();
//      },
//      getToken: function () {
//        console.log("getting token: " + token);
//        return token;
//      },
//      setToken: function (newToken) {
//        console.log("setting token: " + token + ", " + newToken);
//        token = newToken;
//      }
//
//    };
//
//
//
//    //    function getToken() {
//    //      return token;
//    //    };
//
//    //    function setToken(newToken) {
//    //      token = newToken;
//    //    };
//
//  }
//]);