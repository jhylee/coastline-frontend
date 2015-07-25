var app = angular.module('coastlineShop', ['ui.router',
    'ngStorage',
    'coastlineShop.auth.controllers',
    'coastlineShop.auth.services',
    'coastlineShop.dashboard.controllers',
    'coastlineShop.dashboard.services'
]);


app.config(function ($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {

  $urlRouterProvider.otherwise('/dashboard');

  $stateProvider

  // HOME STATES AND NESTED VIEWS ========================================
  //   .state('home', {
  //   url: '/',
  //   templateUrl: '/sell-side/views/login.html'
  // })

  // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================

  .state('dashboard', {
    url: '/dashboard',
  //  templateUrl: '/sell-side/views/dashboard.html',
    data : {requireLogin : true },
    views: {

      'nav-top': {
        templateUrl: '/sell-side/views/dashboard/nav-top.html'
      },
      'nav-side': {
        templateUrl: '/sell-side/views/dashboard/nav-side.html'
      },
      'body': {
        templateUrl: '/sell-side/views/dashboard/body.html'
      },
      'footer': {
        templateUrl: '/sell-side/views/dashboard/footer.html'
      },
    },

  })


  .state('login', {
    url: '/login',

    views: {

      'nav-top': {
        templateUrl: '/sell-side/views/login/nav-top.html'
      },
      'nav-side': {
        templateUrl: '/sell-side/views/login/nav-side.html'
      },
      'body': {
        templateUrl: '/sell-side/views/login/body.html'
      },
      'footer': {
        templateUrl: '/sell-side/views/login/footer.html'
      },

    }

  })

  .state('signUp', {
    url: '/signUp',
    templateUrl: '/sell-side/views/signUp.html'
  })

  .state('about', {
    url: '/about',
    templateUrl: '/sell-side/views/about.html'
  })

  .state('sellerWebApp', {
    url: '/webapp/seller',
    templateUrl: '/sell-side/views/sell-side/sellerWebApp.html'
  });

  $httpProvider.interceptors.push('HttpInterceptorForToken');


});

app.run(function ($rootScope, $state, $location, AuthService) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

      console.log("beginning redirect logic");

      var shouldLogin = toState.data !== undefined && toState.data.requireLogin && !AuthService.isAuthenticated();

      // NOT authenticated - wants any private stuff
      if(shouldLogin)
      {
        console.log(AuthService.isAuthenticated());
        console.log("should login");
        $state.go('login');
        event.preventDefault();
        return;
      }


      // authenticated (previously) comming not to root main
      if(AuthService.isAuthenticated())
      {
        var shouldGoToMain = fromState.name === "" && toState.name !== "dashboard" ;

        if (shouldGoToMain)
        {
            $state.go('dashboard');
            event.preventDefault();
        }
        return;
      }

      // // UNauthenticated (previously) comming not to root public
      // var shouldGoToPublic = fromState.name === ""
      //                   && toState.name !== "login" ;
      //
      // if(shouldGoToPublic)
      // {
      //     $state.go('login');console.log('p')
      //     event.preventDefault();
      // }

      // unmanaged
    });
});

angular.module('coastlineConstants',[])
  .constant('apiUrl', 'http://localhost:3000');

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
