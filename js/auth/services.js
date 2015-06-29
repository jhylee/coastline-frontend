angular.module('coastlineWebApp.auth.services', ['ngStorage'])


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

.factory('AuthService', ['$http', '$localStorage', function ($http, $localStorage) {
    var baseUrl = "http://localhost:3000";
    var token = "";

    return {
      signUpBuyer: function (data, success, error) {
        $http.post(baseUrl + '/users/signUp/buyer', data).success(success).error(error)
      },

      signUpSeller: function (data, success, error) {
        var response = $http.post(baseUrl + '/users/signUp/seller', data).success(success).error(error)
        console.log(response);
      },

      login: function (data, success, error) {
        $http.post(baseUrl + '/users/login', data).success(success).error(error)
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
      }

    };



    //    function getToken() {
    //      return token;
    //    };

    //    function setToken(newToken) {
    //      token = newToken;
    //    };

  }
]);