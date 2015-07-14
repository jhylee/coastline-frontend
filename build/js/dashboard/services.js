angular.module('coastlineWebApp.dashboard.services', ['ngStorage'])

.factory('DashboardService', ['$http', '$localStorage', function ($http, $localStorage) {
    var baseUrl = "http://localhost:3000";
    var token = "";

    return {
      accountDetails: function (success, error) {
        $http.get(baseUrl + '/api/seller/account/details').success(success).error(error);
      },
    };
  }
]);
