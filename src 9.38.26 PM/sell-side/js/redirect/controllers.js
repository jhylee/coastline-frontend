angular.module('coastlineWebApp.redirect.controllers', ['ui.router', 'ngStorage', 'coastlineWebApp.redirect.services'])

.controller('redirectCtrl', ['$rootScope', '$scope', '$state', '$location', '$localStorage', 'RedirectService', function ($rootScope, $scope, $state, $location, $localStorage, RedirectService) {

  // $scope.$storage = $localStorage;
  // $scope.isToken = !($scope.$storage.token === undefined || $scope.$storage.token === null);

  // $scope.logout = function () {
  //   console.log("TEST");
  //   // console.log("token before logout: " + $localStorage.token);
  //
  //
  //   AuthService.logout(function() {
  //     $state.go('login');
  //   });
  //
  //   //    AuthService.logout(function () {
  //   //      window.location = "/"
  //   //    }, function () {
  //   //      alert("Failed to logout!");
  //   //    });
  // };

  console.log(RedirectService.getRedirectState());

  $state.go(RedirectService.getRedirectState());

}]);
