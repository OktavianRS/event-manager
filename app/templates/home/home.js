angular.module('eventManager')
    .controller('homeCtrl', ['$scope', 'userModel', function($scope, userModel) {

        $scope.getCurrentUser = function() {
            userModel.getCurrent(function(res) {
                $scope.user = res;
            })
        }

    }
    ]);
