angular.module('coastlineWebApp.dashboard.services', ['ngStorage','coastlineConstants'])

.factory('DashboardService', ['$http', '$localStorage', 'apiUrl', function ($http, $localStorage, apiUrl) {
    var baseUrl = apiUrl;
    var token = "";
    var selection = 0;


    return {
      accountDetails: function (success, error) {
        $http.get(baseUrl + '/api/sell-side/account/details').success(success).error(error);
      },
      transactions: function (success, error) {
        $http.get(baseUrl + '/api/sell-side/transactions').success(success).error(error);
      },
      products: function (success, error) {
        $http.get(baseUrl + '/api/sell-side/products').success(success).error(error);
      },
      setSelection: function (index) {
        selection = index;
      },
      getSelection: function (index) {
        return selection;
      },
      addProduct: function (formData, success, error) {
        console.log("service");
        console.log("name: " + formData.name);
        console.log("unitPrice: " + formData.unitPrice);
        console.log("units: " + formData.units);
        console.log("availability: " + formData.availability);
        console.log("featured: " + formData.featured);
        $http.post(baseUrl + '/api/sell-side/add-product', formData).success(success).error(error);
      }

    };
  }
]);
