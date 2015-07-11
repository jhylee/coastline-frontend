angular.module('coastlineWebApp.dashboard.services', ['ngStorage'])

.factory('NavTopService', ['$http', '$localStorage', function ($http, $localStorage) {
    var baseUrl = "http://localhost:3000";
    var token = "";

    return {
      firstName: function (success, error) {
        var response = $http.get(baseUrl + '/api/seller/account/firstName').success(success).error(error)
        console.log(response);
      },
    };

  }
]);
