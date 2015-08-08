angular.module('coastlineWebApp.auth.services', ['ngStorage','coastlineConstants'])


.factory('AuthService', ['$http', '$localStorage', 'apiUrl', function ($http, $localStorage, apiUrl) {
    var baseUrl = apiUrl;
    var token = $localStorage.token;

    return {
      isAuthenticated: function() {
        if ($localStorage.token === undefined || $localStorage.token === null) {
          return false;
        } else {
          return true;
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
        console.log("token: " + $localStorage.token);
        done();
      },
      getToken: function () {
        console.log("getting token: " + token);
        return token;
      },
      setToken: function (newToken) {
        console.log("setting token: " + token + ", " + newToken);
        token = newToken;
        console.log("token now: " + token);
      },


    };
  }
])

.factory('HttpInterceptorForToken', ['$rootScope', '$localStorage', function ($rootScope, $localStorage) {
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
        console.log("attaching token: " + $localStorage.token);
        if ($localStorage.token) {
          console.log("attaching token now");
          config.headers.Authorization = 'Bearer ' + $localStorage.token;
          console.log(config.headers.Authorization);
        }
        return config;
      },

      response: function (response) {
        if (response.status === 401) {
          // handle the case where the user is not authenticated
        }
        return response || $q.when(response);
      }

    };
}]);
