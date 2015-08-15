angular.module('coastlineWebApp.auth.services', ['ngStorage','coastlineConstants', 'ui.router'])


.factory('AuthService', ['$http', '$window', '$localStorage', 'apiUrl', function ($http, $window, $localStorage, apiUrl) {
    var baseUrl = apiUrl;
    var token = $localStorage.token;

    var parseJwt = function(token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse($window.atob(base64));
    }

    return {


      isAuthenticated: function() {
        if ($localStorage.token === undefined || $localStorage.token === null) {
          // console.log("token not present");

          return false;
        } else {
          var params = parseJwt($localStorage.token);
          // console.log("is token expired? " + Math.round(new Date().getTime() / 1000) <= params.exp);

          return Math.round(new Date().getTime() / 1000) <= params.exp;
        }
      },

      signUp: function (data, success, error) {
        $http.post(baseUrl + '/users/sell-side/sign-up', data).success(success).error(error);
      },

      login: function (data, success, error) {
        $http.post(baseUrl + '/users/login', data).success(function (res) {
          $localStorage.token = res.token;
          console.log("on login");
          console.log("localStorage: " + $localStorage.token);
          // console.log("scope storage: " + $scope.  $storage.token);
          $localStorage.$save();

          success(res);

        }).error(function (err) {

          error(err);

        });
      },

      logout: function (done) {
        delete $localStorage.token;
        $localStorage.$save();
        // console.log("token: " + $localStorage.token);
        done();
      },
      getToken: function () {
        // console.log("getting token: " + token);
        return token;
      },
      setToken: function (newToken) {
        // console.log("setting token: " + token + ", " + newToken);
        token = newToken;
        // console.log("token now: " + token);
      },


    };
  }
])

.factory('HttpInterceptorForToken', ['$rootScope', '$localStorage', '$state', function ($rootScope, $localStorage, $state) {
    return {
      // request : function(config) {
      //     console.log("intercepting");
      //     var access_token = $localStorage.token;
      //
      //     if (access_token !== null && access_token !== undefined && access_token !== "") {
      //         config.headers.Authorization = "Bearer " + access_token;
      //     }
      //     return config;
      // },
      //
      // responseError : function(response) {
      //     if (response.status === 401) {
      //         $rootScope.$broadcast('unauthorized');
      //     }
      //     return response;
      // },

      request: function (config) {
        config.headers = config.headers || {};
        // console.log("attaching token: " + $localStorage.token);
        if ($localStorage.token) {
          // console.log("attaching token now");
          config.headers.Authorization = 'Bearer ' + $localStorage.token;
          // console.log(config.headers.Authorization);
        }
        return config;
      },

      response: function (response) {
        if (response.status === 401) {
          // delete $localStorage.token;
          // $localStorage.$save();
          // $state.go("login");
        }
        return response || $q.when(response);
      }

    };
}]);
