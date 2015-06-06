angular.module('coastlineWebApp.services', [])

// Services

.factory('Main', ['$http', '$localStorage', function ($http, $localStorage) {
    var baseUrl = "http://localhost:3000";
    var token = "";



    return {
      save: function (data, success, error) {
        $http.post(baseUrl + '/signin', data).success(success).error(error)
      },

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
      me: function (success, error) {
        $http.get(baseUrl + '/me').success(success).error(error)
      },
      logout: function (success) {
        delete $localStorage.token;
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