angular.module('coastlineWebApp.dashboard.services', ['ngStorage','coastlineConstants'])

.factory('DashboardService', ['$http', '$localStorage', 'apiUrl', function ($http, $localStorage, apiUrl) {
    var baseUrl = apiUrl;
    var token = "";

    return {
      accountDetails: function (success, error) {
        $http.get(baseUrl + '/api/seller/account/details').success(success).error(error);
      },
      orders: function (success, error) {
        $http.get(baseUrl + '/api/seller/orders').success(success).error(error);
      }
    };
  }
]);
