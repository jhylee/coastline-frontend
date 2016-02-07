var app = angular.module('coastlineWebApp.trackInventory.services', ['ui.bootstrap', 'ngStorage',
  'coastlineWebApp.auth.services',
  'ui.router']);

app.factory('TrackInventoryMenuNavigation', ['$http', 'apiUrl', '$localStorage', function($http, apiUrl, $localStorage) {
    var view = 'menu';
    var baseUrl = apiUrl;

    return {
        getView: function () {
            return view;
        },
        setView: function (newView) {
            view = newView;
        },
        getSupplyChains: function (success, error) {
            $http.get(baseUrl + '/api/fisheries/' + $localStorage.user.fishery + '/supplychains').success(success).error(error);
        }
    }
}]);

app.factory('TrackInventoryManager', ['$http', 'apiUrl', '$localStorage', function($http, apiUrl, $localStorage) {
    var view = 'menu';
    var baseUrl = apiUrl;
    var _supplyChain;

    return {
        getSupplyChain: function () {
            return _supplyChain;
        },
        setSupplyChain: function (supplyChain) {
            _supplyChain = supplyChain;
        },
        getSupplyChains: function (success, error) {
            $http.get(baseUrl + '/api/fisheries/' + $localStorage.user.fishery + '/supplychains').success(success).error(error);
        },

        // reconstructs the graph and returns nodes and edges for graphical display
        getDisplayData: function () {
            console.log("_supplyChain");
            console.log(_supplyChain);
            var data = {
                nodes: [],
                edges: []
            };

            if (_supplyChain) {
                for (var i = 0; i < _supplyChain.stages.length; i ++) {
                    var node = {};
                    node.label = _supplyChain.stages[i].name;
                    node.id = _supplyChain.stages[i].self;
                    node.scaling = { min: 10, max: 10, label: { min: 10, max: 24} };
                    node.value = 25;
                    node.size = 25;
                    node.color = "#93D276"
                    node.shape = "box";
                    node.shadow = false;
                    node.x = _supplyChain.stages[i].x;
                    node.y = _supplyChain.stages[i].y;
                    data.nodes.push(node);
                }

                // link nodes
                for (var i = 0; i < _supplyChain.stages.length; i ++) {
                    for (var j = 0; j < _supplyChain.stages[i].prev.length; j ++) {
                        if (data.edges.indexOf({from: _supplyChain.stages[i].prev[j], to: _supplyChain.stages[i].self}) == -1 &&
                            _supplyChain.stages[i].prev[j] && _supplyChain.stages[i].prev[j] != [] &&
                            _supplyChain.stages[i].self && _supplyChain.stages[i].self != []) {
                                data.edges.push({from: _supplyChain.stages[i].prev[j], to: _supplyChain.stages[i].self});
                        }
                    };
                }
            }

            return data;
        },
    }
}]);