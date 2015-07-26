var app = angular.module('coastlineShop', ['ui.router',
    'ngStorage',
    'coastlineShop.shop.controllers',
    'coastlineShop.shop.services'
]);


app.config(function ($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {

  $urlRouterProvider.otherwise('/shop');

  $stateProvider

  // HOME STATES AND NESTED VIEWS ========================================
  //   .state('home', {
  //   url: '/',
  //   templateUrl: '/sell-side/views/login.html'
  // })

  // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================

  .state('shop', {
    url: '/shop',
  //  templateUrl: '/sell-side/views/dashboard.html',
    data : { requireLogin : true },
    views: {
      'nav-top': {
        templateUrl: '/buy-side/views/shop/nav-top.html'
      },
      'body': {
        templateUrl: '/buy-side/views/shop/body.html'
      },
      'footer': {
        templateUrl: '/buy-side/views/shop/footer.html'
      },
    },

  })


});


angular.module('coastlineConstants',[])
  .constant('apiUrl', '@@apiUrl');
