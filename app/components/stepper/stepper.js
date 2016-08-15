angular.module('components.stepper', [])
    .directive('stepper', [function() {
      return {
        restrict: 'E',
        templateUrl: 'components/stepper/stepper.html'
      }
    }])
    .controller('stepperCtrl', ['$scope', 'stepModel', function($scope, stepModel){
    	$scope.table = [];
    	$scope.showInputContainer = false;

        $scope.getStep = function() {
            stepModel.getStep($scope.stateParams.eventId,function(res) {
                $scope.steps = res;
                $scope.steps.model.step -= 1;
                $scope.showme = true;
            });
        }
        $scope.getStep();

        $scope.select = function(type) {
        	console.log(type.params);
        	$scope.showInputContainer = true;
        }
    }])