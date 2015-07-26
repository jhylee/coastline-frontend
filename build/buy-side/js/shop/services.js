angular.module('coastlineShop.shop.services', ['ngStorage','coastlineConstants'])

.factory('DashboardService', ['$http', '$localStorage', 'apiUrl', function ($http, $localStorage, apiUrl) {
    var baseUrl = apiUrl;
    var selection = 0;
    var currentOrderRef = null;


    return {
      // get: function (success, error) {
      //   $http.get(baseUrl + '/api/sell-side/account/details').success(success).error(error);
      // },
      // get: function (success, error) {
      //   $http.get(baseUrl + '/api/sell-side/products').success(success).error(error);
      // },
      // post: function (formData, success, error) {
      //   $http.post(baseUrl + '/api/sell-side/get-order', formData).success(success).error(error);
      // },
      // getCurrentOrderRef: function () {
      //   return currentOrderRef;
      // },
      // setCurrentOrderRef: function (ref) {
      //   currentOrderRef = ref;
      // },
      setSelection: function (index) {
        selection = index;
      },
      getSelection: function () {
        return selection;
      },
      // post: function (formData, success, error) {
      //   $http.post(baseUrl + '/api/sell-side/fulfill-order', formData).success(success).error(error);
      // },


    };
  }
]);