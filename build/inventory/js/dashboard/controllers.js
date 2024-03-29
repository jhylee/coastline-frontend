var app = angular.module('coastlineWebApp.dashboard.controllers', ['ui.bootstrap',
  'coastlineWebApp.dashboard.services',
  'coastlineWebApp.dashboard.directives',
  'coastlineWebApp.auth.services',
  'ui.router']);



app.controller('NavTopCtrl', ['$scope', 'Fishery', 'AuthService', '$state',
    function ($scope, Fishery, AuthService, $state) {
        $scope.fisheryName = "";

        Fishery.getFishery(function (fishery) {
            $scope.fisheryName = fishery.name;
            console.log("$scope.fisheryName " + fishery);
        });

        $scope.logout = function () {
            AuthService.logout(function () {
                $state.go('login');
            });
        };
}]);


app.controller('SideNavCtrl', ['$scope', 'DashboardNavigation',
    function ($scope, DashboardNavigation) {

      $scope.setView = function (view) {
        console.log("view " + view);
        var nocheck = DashboardNavigation.checkForUnsavedChanges(view);
        console.log(nocheck);
        if (nocheck) {
          DashboardNavigation.setView(view);
        }
      };

}]);




app.controller('DashboardDisplayCtrl', ['$scope', 'DashboardNavigation',
    function ($scope, DashboardNavigation) {

      $scope.getView = function (view) {
        return DashboardNavigation.getView();
      };


      $scope.change = function() {
        console.log("change");
      }

}]);


// PRODUCTS TAB (TODO)




// ADD PRODUCTS TAB (TODO)



// SUPPLY CHAINS TAB

app.controller('SupplyChainMenuCtrl', ['$scope', 'SupplyChainMenuNavigation', 'SupplyChainSet', 'Fishery',
    function ($scope, SupplyChainMenuNavigation, SupplyChainSet, Fishery) {
        SupplyChainMenuNavigation.setView('menu');

        $scope.getView = function (view) {
            return SupplyChainMenuNavigation.getView();
        };

        $scope.createNewSupplyChain = function () {
            SupplyChainMenuNavigation.setView('create');
        };

        $scope.editSupplyChain = function (supplyChain) {
            SupplyChainSet.setSupplyChain(supplyChain);
            SupplyChainMenuNavigation.setView('builder');
        };

        $scope.getSupplyChains = function () {
            Fishery.getFishery(function (fishery) {
                SupplyChainMenuNavigation.getSupplyChains(fishery._id, function (res) {
                    $scope.supplyChains = res;
                    console.log("FDSFAS " + $scope.supplyChains);
                }, function (error) {
                  console.log("Error creating supplyChain.");
                      console.log(error);
                });
            })
        };


        $scope.getSupplyChains();

}]);

app.controller('SupplyChainCreateCtrl', ['$scope', 'VisDataSet', 'SupplyChainSet', 'SupplyChainMenuNavigation', 'Fishery', '$localStorage',
    function ($scope, VisDataSet, SupplyChainSet, SupplyChainMenuNavigation, Fishery, $localStorage) {

        // get stages - for option display
        $scope.createSupplyChain = function () {
            var fisheryId;
            var data = {name: $scope.name};

            Fishery.getFishery(function (fishery) {
                fisheryId = $localStorage.user.fishery;
                console.log("fisheryId " + fishery._id);

                SupplyChainSet.postSupplyChain(fisheryId, data, function (res) {
                    console.log(res);
                    //SupplyChainMenuNavigation.setView('builder');
                    SupplyChainSet.setSupplyChain(res);
                    SupplyChainMenuNavigation.setView('builder');

                }, function (error) {
                    console.log("Error creating supplyChain.");
                    console.log(error);
                });

            });

        };

}]);


app.controller('SupplyChainCtrl', ['$scope', '$uibModal', 'VisDataSet', 'SupplyChainSet', 'SupplyChainMenuNavigation', 'DashboardNavigation',
  function ($scope, $uibModal, VisDataSet, SupplyChainSet, SupplyChainMenuNavigation, DashboardNavigation) {

    $scope.$on("dashboardSwitch", function (event, newView) {
      console.log(newView);
      $scope.dashboardViewChange(newView);
    });

    SupplyChainSet.saveSupplyChain(function (res) {
          console.log("saved");
          $scope.refreshGraph();
      }, function (err) {
          console.log("error saving");
      });

    // initialize events object
    $scope.events = {};

    // parameters for the graph display
    $scope.options = {
      autoResize: true,
      height: '100%',
      width: '100%',
      physics: {enabled: false},
      edges: {arrows: {to: {enabled: true, scaleFactor: 1}},
              smooth: {enabled: false}}
    };

    // get initial supply chain data
    $scope.data = SupplyChainSet.getDisplayData();

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
    };

    // refresh the graph display - done when changes are made
    $scope.refreshGraph = function () {
        $scope.data = SupplyChainSet.getDisplayData();
    };

    // add a stage - linked to the add button
    $scope.addStage = function() {
      console.log("addStage");

      // modal setup and preferences
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'addModalContent.html',
        controller: 'AddStageCtrl',
        size: 'lg',
        resolve: {}
      });

      // called when modal is closed
      modalInstance.result.then(
        // OK callback
        function (stage) {
          // add the stage to the supply chain
          console.log(stage);
          SupplyChainSet.addStage(stage.name, stage.prev, function() {
              // refresh the graph to show the changes
              $scope.refreshGraph();
          });



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
        controller: 'EditStageCtrl',
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

    $scope.saveSupplyChain = function() {
      SupplyChainSet.saveSupplyChain(function (res) {
          console.log("saved");
          $scope.refreshGraph();
      }, function (err) {
          console.log("error saving");
      });
    }

    // edit a stage - linked to the edit button
    $scope.dashboardViewChange = function(dashboardView) {
      // modal setup and preferences
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'exitSupplyChain.html',
        controller: 'ExitSupplyChainCtrl',
        size: 'lg',
        resolve: {}
      });

      // called when modal is closed
      modalInstance.result.then(
        // OK callback
        function (res) {
          DashboardNavigation.setView(dashboardView);
      }, function () {

      });
    };


  }

]);

app.controller('AddStageCtrl', ['$scope', 'VisDataSet', 'SupplyChainSet', '$uibModalInstance',
    function ($scope, VisDataSet, SupplyChainSet, $uibModalInstance) {

        // var prev = SupplyChainSet.getSelectedStage();

        // get stages - for option display
        $scope.stages = SupplyChainSet.getStages();

        // tied to ok button
        $scope.ok = function () {
          if ($scope.prev) {
              console.log('scope.prev._id ' + $scope.prev)
              $uibModalInstance.close({name: $scope.name, prev: $scope.prev.self});
          } else {
              $uibModalInstance.close({name: $scope.name});
          }
        };

        // tied to cancel button
        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
}]);

app.controller('EditStageCtrl', ['$scope', 'VisDataSet', 'SupplyChainSet', '$uibModalInstance',
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

app.controller('ExitSupplyChainCtrl', ['$scope', 'VisDataSet', 'SupplyChainSet', '$uibModalInstance',
    function ($scope, VisDataSet, SupplyChainSet, $uibModalInstance) {

        // get stages - for option display
        $scope.getStages = function () {
            return SupplyChainSet.getStages();
        };

        // tied to ok button
        $scope.ok = function () {
          console.log("ok");
          $uibModalInstance.close(true);
        };

        // tied to cancel button
        $scope.cancel = function () {
          console.log("cancel");
          $uibModalInstance.dismiss(false);
        };
}]);
