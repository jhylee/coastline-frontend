angular.module('coastlineWebApp.dashboard.services', ['ngStorage'])

.factory('DashboardService', ['$http', '$localStorage', function ($http, $localStorage) {
    var baseUrl = "http://localhost:3000";
    var token = "";

    return {
      accountDetails: function () {
        $http.get(baseUrl + '/api/seller/account/details')

        .success(function (res) {
          console.log ("res: " + res.firstName);
          return res;
        })

        .error(function (err) {
          console.log ("err: " + err);

          // TODO - account for error connecting

          return err;
        })


      },
    };

  }
]);
