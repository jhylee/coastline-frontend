angular.module('coastlineWebApp.visualizations.services', [])

// for creation of the VisDataSet
.factory('VisDataSet', function() {
    'use strict';
    return function(data, options) {
        // Create the new dataSets
        return new vis.DataSet(data, options);
    };
})

.factory('DashboardNavigation', function() {
    var view = 'home';

    return {
        getView: function () {
            return view;
        },
        setView: function (newView) {
            view = newView;
        }
    }
})


// for management of the supply chain builder
.factory('SupplyChainSet', function() {
    'use strict';

    // farthest x point to the right
    var furthestRight = -150;

    // set inital stage object
    var stages = [];

    // stage currently selected on display
    var selectedStage = null;

    // find a stage by id
    var findStage = function (stageId) {
        for (var i = 0; i < stages.length; i++) {
            if (stages[i].id == stageId) {
                return i;
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
        for (var i = 0; i < stages.length; i ++) {
            if (stages[i].x > furthestRight) furthestRight = stages[i].x;
        }
    }

    // public methods
    return {

        // get all stages
        getStages: function () {
            return stages;
        },

        // get stage by id
        getStage: function (id) {
            return stages[findStage(id)];
        },

        // select stage by id
        selectStage: function (stageId) {
            selectedStage = stageId;
        },

        // deselect the current selected stage
        deselectStage: function (stageId) {
            selectedStage = null;
        },

        // get the current selected stage
        getSelectedStage: function () {
            return selectedStage;
        },

        // move the stage to a new (x, y) coordinate
        moveStage: function (id, x, y) {
            var index = findStage(id);
            stages[index].x = x;
            stages[index].y = y;
            console.log(stages[index]);
        },

        // add a new stage
        addStage: function (name, prev) {
            var id = Date.now();
            var x;
            refreshStageFurthestRight();
            console.log(furthestRight);

            if (furthestRight == null) x = 0;
            else x = furthestRight + 150;

            if (prev) stages.push({ name: name, id: id, prev: [prev], next: [], x: x, y: 0 });
            else stages.push({ name: name, id: id, prev: [], next: [], x: x, y: 0 });
        },

        // reconstructs the graph and returns nodes and edges for graphical display
        getDisplayData: function () {
            var data = {
                nodes: [],
                edges: []
            };

            for (var i = 0; i < stages.length; i ++) {
                var node = {};
                node.label = stages[i].name;
                node.id = stages[i].id;
                node.scaling = { min: 10, max: 10, label: { min: 10, max: 24} };
                node.value = 25;
                node.size = 25;
                node.color = "#93D276"
                node.shape = "box";
                node.shadow = false;
                node.x = stages[i].x;
                node.y = stages[i].y;
                data.nodes.push(node);
            }

            // link nodes
            for (var i = 0; i < stages.length; i ++) {
                for (var j = 0; j < stages[i].prev.length; j ++) {
                    if (data.edges.indexOf({from: stages[i].prev[j], to: stages[i].id}) == -1 &&
                        stages[i].prev[j] != null && stages[i].prev[j] != [] &&
                        stages[i].id != null && stages[i].id != []) {
                            data.edges.push({from: stages[i].prev[j], to: stages[i].id});
                    }
                };
            }

            return data;
        },
    };
});
