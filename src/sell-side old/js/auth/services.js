angular.module('coastlineWebApp.auth.services', ['ngStorage','coastlineConstants'])


//.factory("AuthService", function ($http, $q, $window) {
//  var userInfo;
//
//  function login(username, password) {
//    var deferred = $q.defer();
//
//    $http.post("/users/login", {
//      username: username,
//      password: password
//    }).then(function (res) {
//      userInfo = {
//        accessToken: res.data.token,
//      };
//      $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
//      deferred.resolve(userInfo);
//    }, function (error) {
//      deferred.reject(error);
//    });
//
//    return deferred.promise;
//  }
//
//  function getUserInfo() {
//    return userInfo;
//  }
//
//  return {
//    login: login,
//
//    getUserInfo: getUserInfo
//
//  };
//})

.factory('AuthService', ['$http', '$localStorage', 'apiUrl', function ($http, $localStorage, apiUrl) {
    var baseUrl = apiUrl;
    var token = "";

    return {
      isAuthenticated: function() {
        if ($localStorage.token === undefined || $localStorage.token === null) {
          return false;
        } else {
          return true;
        }
      },

      signUpBuyer: function (data, success, error) {
        $http.post(baseUrl + '/users/signUp/buyer', data).success(success).error(error);
      },

      signUpSeller: function (data, success, error) {
        var response = $http.post(baseUrl + '/users/signUp/seller', data).success(success).error(error);
        console.log(response);
      },

      login: function (data, success, error) {
        $http.post(baseUrl + '/users/login', data).success(success).error(error);
      },

      logout: function (success) {
        $localStorage.token = null;
        success();
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



    //    function getToken() {
    //      return token;
    //    };

    //    function setToken(newToken) {
    //      token = newToken;
    //    };

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
