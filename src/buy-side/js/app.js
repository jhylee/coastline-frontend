var app = angular.module('coastlineShop', ['ui.router',
    'ngStorage',
    'coastlineShop.shop.controllers',
    'coastlineShop.shop.services',
    'angularPayments'
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


  .state('thank-you', {
    url: '/thank-you',
  //  templateUrl: '/sell-side/views/dashboard.html',
    data : { requireLogin : true },
    views: {
      'nav-top': {
        templateUrl: '/buy-side/views/thank-you/nav-top.html'
      },

      'body': {
        templateUrl: '/buy-side/views/thank-you/body.html'
      },

      'footer': {
        templateUrl: '/buy-side/views/thank-you/footer.html'
      },

    },

  })


});

app.run( function ($window) {
  $window.Stripe.setPublishableKey('pk_test_Luo0IysTGeDXy8Pbql3sVYZR');
})


angular.module('coastlineConstants',[])
  .constant('apiUrl', '@@apiUrl');
