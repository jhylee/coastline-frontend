// angular.module('coastlineWebApp.dashboard.services', ['ngStorage'])
//
// .factory('AuthService', ['$http', '$localStorage', function ($http, $localStorage) {
//     var baseUrl = "http://localhost:3000";
//     var token = "";
//
//     return {
//       isAuthenticated: function() {
//         if ($localStorage.token === undefined || $localStorage.token === null) {
//           return false;
//         } else {
//           return true;
//         }
//       },
//
//       signUpBuyer: function (data, success, error) {
//         $http.post(baseUrl + '/users/signUp/buyer', data).success(success).error(error)
//       },
//
//       signUpSeller: function (data, success, error) {
//         var response = $http.post(baseUrl + '/users/signUp/seller', data).success(success).error(error)
//         console.log(response);
//       },
//
//       login: function (data, success, error) {
//         $http.post(baseUrl + '/users/login', data).success(success).error(error)
//       },
//
//       logout: function (success) {
//         $localStorage.token = null;
//         success();
//       },
//       getToken: function () {
//         console.log("getting token: " + token);
//         return token;
//       },
//       setToken: function (newToken) {
//         console.log("setting token: " + token + ", " + newToken);
//         token = newToken;
//         console.log("token now: " + token);
//       },
//
//
//     };
//
//   }
// ]);
