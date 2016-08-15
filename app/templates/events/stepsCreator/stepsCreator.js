angular.module('eventManager')
    .controller('stepsCreatorCtrl', ['$scope', 'userModel', 'stepModel', function($scope, userModel, stepModel) {
        $scope.step = [];
        $scope.tableParams = [];

        $scope.getCurrentUser = function() {
            userModel.getCurrent(function(res) {
                $scope.user = res;
            })
        }

    }
    ]);
