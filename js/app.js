var app = angular.module("coastlineWebApp", ['ui.router', 'ngStorage', 'coastlineWebApp.login', 'coastlineWebApp.sign-up']);

app.config(function ($stateProvider, $urlRouterProvider) {

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
    url: '/buyer',
    templateUrl: '/views/buy-side/buyerWebApp.html'
  })

  .state('sellerWebApp', {
    url: '/seller',
    templateUrl: '/views/sell-side/sellerWebApp.html'
  })


});

$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
  return {
    'request': function (config) {
      config.headers = config.headers || {};
      if ($localStorage.token) {
        config.headers.Authorization = 'Bearer ' + $localStorage.token;
      }
      return config;
    },
    'responseError': function (response) {
      if (response.status === 401 || response.status === 403) {
        $location.path('/signin');
      }
      return $q.reject(response);
    }
  };
}]);
