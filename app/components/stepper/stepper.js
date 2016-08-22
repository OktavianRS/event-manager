angular.module('components.stepper', [])
    .directive('stepper', [function() {
      return {
        restrict: 'E',
        templateUrl: 'components/stepper/stepper.html'
      }
    }])
    .controller('stepperCtrl', ['$scope', 'stepModel', function($scope, stepModel){
    	$scope.table = [];

        $scope.getStep = function() {
            stepModel.getStep($scope.stateParams.eventId,function(res) {
                $scope.steps = res;
                $scope.steps.model.step = --res.model.step;
                $scope.showme = true;
            });
        }
        $scope.getStep();

        $scope.$on('getStep', function(event, data) {
            $scope.getStep();
        });

    }])