var app = angular.module('coastlineWebApp.dashboard.controllers', ['ui.bootstrap', 
  'coastlineWebApp.dashboard.services', 
  'coastlineWebApp.dashboard.directives']);

app.controller('supplyChainMenuCtrl', ['$scope', 'SupplyChainMenuNavigation', 
    function ($scope, SupplyChainMenuNavigation) {
      SupplyChainMenuNavigation.setView('menu');

      $scope.getView = function (view) {
        return SupplyChainMenuNavigation.getView();
      }

      $scope.createNewSupplyChain = function () {
        SupplyChainMenuNavigation.setView('builder');
      }

}]);




app.controller('supplyChainCtrl', ['$scope', '$uibModal', 'VisDataSet', 'SupplyChainSet', 
  function ($scope, $uibModal, VisDataSet, SupplyChainSet) {

    // get initial supply chain data
    $scope.data = SupplyChainSet.getDisplayData();

    // initialize events object
    $scope.events = {};

    // callback for selectNode events
    $scope.events.selectNode = function (items) {
      console.log('selectNode');
      SupplyChainSet.selectStage(items.nodes[0]);
    };

    // callback for deselectNode events
    $scope.events.deselectNode = function (items) {
      console.log('deselectNode');
      SupplyChainSet.deselectStage();
    };

    $scope.events.dragEnd = function (items) {
      console.log(items);
      if (items.nodes.length > 0) SupplyChainSet.moveStage(items.nodes[0], items.pointer.canvas.x, items.pointer.canvas.y);
    }

    // refresh the graph display - done when changes are made
    $scope.refreshGraph = function () {
        $scope.data = SupplyChainSet.getDisplayData();
    }

    // parameters for the graph display
    $scope.options = {
      autoResize: true,
      height: '100%',
      width: '100%',
      physics: {enabled: false},
      edges: {arrows: {to: {enabled: true, scaleFactor: 1}},
              smooth: {enabled: false}}
    };

    // add a stage - linked to the add button    
    $scope.addStage = function() {
      console.log("addStage");

      // modal setup and preferences
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'addModalContent.html',
        controller: 'addStageCtrl',
        size: 'lg',
        resolve: {}
      });

      // called when modal is closed
      modalInstance.result.then(
        // OK callback
        function (stage) {
          // add the stage to the supply chain
          SupplyChainSet.addStage(stage.name, stage.prev);

          // refresh the graph to show the changes
          $scope.refreshGraph();

          // CANCEL callback
      }, function () {});
    };

    // edit a stage - linked to the edit button
    $scope.editStage = function() {
      console.log("addStage");

      // modal setup and preferences
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'editModalContent.html',
        controller: 'editStageCtrl',
        size: 'lg',
        resolve: {}
      });

      // called when modal is closed
      modalInstance.result.then(
        // OK callback
        function (res) {
          // retrieve the stage based on the selected id
          var stage = SupplyChainSet.getStage(res.id);

          // set the stage name to the new name
          stage.name = res.name;
          
          // refresh the graph to show the changes
          $scope.refreshGraph();

          // CANCEL callback
      }, function () {});
    };



  } 
    
]);
    


app.controller('addStageCtrl', ['$scope', 'VisDataSet', 'SupplyChainSet', '$uibModalInstance', 
    function ($scope, VisDataSet, SupplyChainSet, $uibModalInstance) {
        
        // var prev = SupplyChainSet.getSelectedStage();

        // get stages - for option display
        $scope.getStages = function () {
            return SupplyChainSet.getStages();
        };

        // tied to ok button
        $scope.ok = function () {
          if ($scope.prev) $uibModalInstance.close({name: $scope.name, prev: $scope.prev.id});
          else $uibModalInstance.close({name: $scope.name});
        };

        // tied to cancel button
        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
}]);

app.controller('editStageCtrl', ['$scope', 'VisDataSet', 'SupplyChainSet', '$uibModalInstance', 
    function ($scope, VisDataSet, SupplyChainSet, $uibModalInstance) {
        
        // get stages - for option display
        $scope.getStages = function () {
            return SupplyChainSet.getStages();
        };

        // tied to ok button
        $scope.ok = function () {
          var res = {
            name: $scope.name,
            id: $scope.selectedStage.id
          };
          $uibModalInstance.close(res);
        };

        // tied to cancel button
        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
}]);


app.controller('sideNavCtrl', ['$scope', 'DashboardNavigation', 
    function ($scope, DashboardNavigation) {

      $scope.setView = function (view) {
        DashboardNavigation.setView(view);
      }

}]);

app.controller('navTopCtrl', ['$scope', 'NavTop', 
    function ($scope, NavTop) {

      $scope.getFisheryName = function () {
        return NavTop.getFisheryName;
      }

}]);

app.controller('dashboardDisplayCtrl', ['$scope', 'DashboardNavigation', 
    function ($scope, DashboardNavigation) {

      $scope.getView = function (view) {
        return DashboardNavigation.getView();
      }

}]);


