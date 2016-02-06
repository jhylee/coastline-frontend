angular.module('coastlineWebApp.dashboard.services', ['ngStorage'])

.factory('NavTop', ['$http', 'apiUrl', function($http, apiUrl) {
    var view = 'menu';
    var baseUrl = apiUrl

    return {
        getFisheryName: function(success, error) {
            $http.get(baseUrl + '/api/fisheries').success(success).error(error);
        }
    }
}])


.factory('Fishery', ['$http', '$localStorage', 'apiUrl', function($http, $localStorage, apiUrl) {
    'use strict';
    var fishery = {name: $localStorage.fisheryName, _id: $localStorage.user.fishery};
    var fisheryName;
    var baseUrl = apiUrl;

    return  {
        getFishery: function (success) {
            $http.get(baseUrl + '/api/fisheries').success(function (res) {
                for (var i = 0; i < res.length; i ++) {
                    if (res[i]._id == $localStorage.user.fishery) {
                        $localStorage.fisheryName = res[i].name;
                        $localStorage.$save();
                        fishery = {name: res[i].name, _id: res[i]._id};
                        fisheryName = $localStorage.fisheryName;
                        console.log("fisheryName " + fisheryName);
                    }
                }
                success(fishery);
            }).error(function (err) {
                console.log("Error getting fishery. " + err)
            });
        }
    };
}])

.factory('DashboardNavigation', ['$rootScope', 'SupplyChainMenuNavigation', function($rootScope, SupplyChainMenuNavigation) {
    var view = 'home';

    return {
        getView: function () {
            return view;
        },
        setView: function (newView) {
            view = newView;
        },
        checkForUnsavedChanges: function (newView) {
            if (view == "home") {
                return true;
            } else if (view == "products") {
                return true;
            } else if (view == "supply-chain") {
                if (SupplyChainMenuNavigation.getView() == "builder") {
                    var switchEvent = {
                        type: "dashboardSwitch",
                        to: newView
                    }
                    $rootScope.$broadcast("dashboardSwitch", newView);
                    return false;
                // on home of SC component and trying to go home
                } else {
                    return true;
                }
            } else if (view == "inventory") {
                return true;
            } else if (view == "orders") {
                return true;
            } else if (view == "e-commerce") {
                return true;
            }
        }
    }
}])


.factory('SupplyChainMenuNavigation', ['$http', 'apiUrl', function($http, apiUrl) {
    var view = 'home';
    var baseUrl = apiUrl;

    return {
        getView: function () {
            return view;
        },
        setView: function (newView) {
            view = newView;
        },
        getSupplyChains: function (fisheryId, success, error) {
            $http.get(baseUrl + '/api/fisheries/' + fisheryId + '/supplychains').success(success).error(error);
        }
    }
}])

// for creation of the VisDataSet
.factory('VisDataSet', ['$http', 'apiUrl', function($http, apiUrl) {
    'use strict';
    return function(data, options) {
        // Create the new dataSets
        return new vis.DataSet(data, options);
    };
}])

// for management of the supply chain builder
.factory('SupplyChainData', ['$http', 'apiUrl', 'Fishery', '$localStorage', function($http, apiUrl, Fishery, $localStorage) {
    'use strict';

    var baseUrl = apiUrl;

    // farthest x point to the right
    var furthestRight = -150;

    // set initial stage object
    var stages = [];

    // stage currently selected on display
    var selectedStageId = null;

    var supplyChain;

    // HELPER FUNCTIONS

    // find a stage by id
    var findStage = function (stageId) {
        if (supplyChain) {
            for (var i = 0; i < supplyChain.stages.length; i++) {
                if (supplyChain.stages[i].self == stageId) {
                    return i;
                }
            }
        }
        return null;
    };

    // find an edge given the to and from values
    var findEdge = function (fromId, toId, edges) {
        for (var i = 0; i < edges.length; i++) {
            if (edges[i].fromId == fromId && edges[i].to == toId) {
                return i;
            }
        };
        return null;
    };

    // get the stage furthest right
    var refreshStageFurthestRight = function () {
        if (supplyChain) {
            for (var i = 0; i < supplyChain.stages.length; i ++) {
                if (supplyChain.stages[i].x > furthestRight) furthestRight = supplyChain.stages[i].x;
            }
        }
    };

    // public methods
    return {

        // get all stages
        getStages: function () {
            if (supplyChain) {
                return supplyChain.stages;
            }
        },

        postSupplyChain: function(fisheryId, data, success, error) {
            $http.post(baseUrl + '/api/fisheries/' + fisheryId + '/supplychains', data).success(success).error(error);
        },

        saveSupplyChain: function (success, error) {
            Fishery.getFishery(function (fishery) {
                $http.put(baseUrl + '/api/fisheries/' + $localStorage.user.fishery + '/supplychains/' + supplyChain._id, supplyChain).success(
                    function (res) {
                        supplyChain = res;

                        // TODO - make a backend route to easily get the name of the stage
                        for (var i = 0; i < supplyChain.stages.length; i ++) {

                            $http.get(baseUrl + '/api/fisheries/' + fishery._id + '/stages/' + supplyChain.stages[i].self).success(function (stage) {
                                var index = findStage(stage._id);
                                if (index != null) {
                                    supplyChain.stages[index].name = stage.name;
                                }
                                success(res);

                            }).error(function (err) {
                                console.log(err)
                            });
                        };
                    }).error(function (err) {
                        console.log(err);
                        error(err);
                    });
            })

        },

        // get stage by id
        getStage: function (id) {
            if (supplyChain) {
                return stages[findStage(id)];
            }
        },

        // select stage by id
        selectStage: function (stageId) {
            selectedStageId = stageId;
        },

        // deselect the current selected stage
        deselectStage: function (stageId) {
            selectedStageId = null;
        },

        // get the current selected stage
        getSelectedStage: function () {
            return supplyChain.stages[findStage(selectedStageId)];
        },

        // move the stage to a new (x, y) coordinate
        moveStage: function (id, x, y) {
            if (supplyChain) {
                var index = findStage(id);
                supplyChain.stages[index].x = x;
                supplyChain.stages[index].y = y;
            }
        },

        setSupplyChain: function (newSupplyChain) {
            supplyChain = newSupplyChain;
        },

        // add a new stage
        addStage: function (name, prev, success) {
            if (supplyChain) {
                var id = Date.now();
                var x;
                refreshStageFurthestRight();

                if (furthestRight == null) x = 0;
                else x = furthestRight + 150;

                Fishery.getFishery(function (fishery) {
                    var fisheryId = fishery._id;
                    var stageData = {name: name};
                    $http.post(baseUrl + '/api/fisheries/' + fisheryId + '/stages', stageData).success(
                        function (stage) {
                            stage.x = x;
                            stage.y = 0;
                            stage.self = stage._id;
                            stage.prev = [];
                            if (prev) {
                                stage.prev.push(prev);
                            }
                            stage.next = [];
                            stage.isHead = (stage.prev.length == 0);
                            stage.isTail = (stage.next.length == 0);
                            supplyChain.stages.push(stage);
                            success();
                        }).error(function (error) {
                            console.log(error);
                        });
                })
                // if (prev) supplyChain.stages.push({ name: name, id: id, prev: [prev], next: [], x: x, y: 0 });
                // else supplyChain.stages.push({ name: name, id: id, prev: [], next: [], x: x, y: 0 });
            }
        },

        getSupplyChain: function () {
            if (supplyChain) {
                return supplyChain;
            }
        },

        // reconstructs the graph and returns nodes and edges for graphical display
        getDisplayData: function () {
            var data = {
                nodes: [],
                edges: []
            };

            if (supplyChain) {
                for (var i = 0; i < supplyChain.stages.length; i ++) {
                    var node = {};
                    node.label = supplyChain.stages[i].name;
                    node.id = supplyChain.stages[i].self;
                    node.scaling = { min: 10, max: 10, label: { min: 10, max: 24} };
                    node.value = 25;
                    node.size = 25;
                    node.color = "#93D276"
                    node.shape = "box";
                    node.shadow = false;
                    node.x = supplyChain.stages[i].x;
                    node.y = supplyChain.stages[i].y;
                    data.nodes.push(node);
                }

                // link nodes
                for (var i = 0; i < supplyChain.stages.length; i ++) {
                    for (var j = 0; j < supplyChain.stages[i].prev.length; j ++) {
                        if (data.edges.indexOf({from: supplyChain.stages[i].prev[j], to: supplyChain.stages[i].self}) == -1 &&
                            supplyChain.stages[i].prev[j] && supplyChain.stages[i].prev[j] != [] &&
                            supplyChain.stages[i].self && supplyChain.stages[i].self != []) {
                                data.edges.push({from: supplyChain.stages[i].prev[j], to: supplyChain.stages[i].self});
                        }
                    };
                }
            }

            return data;
        },
    };
}]);
