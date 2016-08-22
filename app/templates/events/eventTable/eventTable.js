angular.module('eventManager')
    .controller('eventTableCtrl', ['$scope', 'stepModel', function($scope, stepModel) {
        $scope.getTable = function() {
            stepModel.getPanel({_eventId: $scope.stateParams.eventId},function(data) {
                $scope.tableParams = data;
                console.log(data);
            })
        }
        $scope.getTable();
    }
    ]);
