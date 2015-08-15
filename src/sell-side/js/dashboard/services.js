angular.module('coastlineWebApp.dashboard.services', ['ngStorage', 'coastlineConstants', 'ui.router', 'angucomplete-alt'])

.factory('DashboardService', ['$http', '$localStorage', 'apiUrl', '$state', function ($http, $localStorage, apiUrl, $state) {
    var baseUrl = apiUrl;
    var token = "";
    var selection = 1;
    var currentOrderRef = null;


    return {
      accountDetails: function (success, error) {
        $http.get(baseUrl + '/api/sell-side/account/details').success(success).error(error);
      },
      orders: function (success, error) {
        $http.get(baseUrl + '/api/sell-side/orders').success(function (res) {
          console.log("orders success: " + res.status);
          success(res);
        }).error(function (err) {
          console.log("orders error");
          $state.go("login");
          error(err);
        });
      },
      products: function (success, error) {
        $http.get(baseUrl + '/api/sell-side/products').success(success).error(error);
      },
      getCurrentOrder: function (success, error) {
        var formData = {
          ref: currentOrderRef
        };

        $http.post(baseUrl + '/api/sell-side/get-order', formData).success(success).error(error);
      },
      getCurrentOrderRef: function () {
        return currentOrderRef;
      },
      setCurrentOrderRef: function (ref) {
        currentOrderRef = ref;
      },
      setSelection: function (index) {
        selection = index;
      },
      getSelection: function () {
        return selection;
      },

      getSeafoodTypes: function (success, error) {
        $http.get(baseUrl + '/api/sell-side-helper/seafoodTypes').success(success).error(error);
      },

      getImageUrl: function (name, success, error) {
        console.log("service " + name)
        $http.get(baseUrl + '/api/sell-side-helper/imgUrl/abdulkhan/' + name).success(function (res) {
          var url = baseUrl + res;
          console.log(url);
          success(url);
        }).error(function (err) {
          error(err);
        });
      },

      fulfillOrder: function (formData, success, error) {
        $http.post(baseUrl + '/api/sell-side/fulfill-order', formData).success(success).error(error);
      },
      addProduct: function (formData, success, error) {
        console.log("service");
        console.log("name: " + formData.name);
        console.log("unitPrice: " + formData.unitPrice);
        console.log("units: " + formData.units);
        console.log("availability: " + formData.availability);
        console.log("featured: " + formData.featured);
        $http.post(baseUrl + '/api/sell-side/add-product', formData).success(success).error(error);
      },

      deleteProduct: function (formData, success, error) {
        $http.post(baseUrl + '/api/sell-side/delete-product', formData).success(success).error(error);
      }

    };
  }
]);
