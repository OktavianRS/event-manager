angular.module('components.stepControllerGenerator', [])
    .directive('stepControllerGenerator', [function() {
      return {
        restrict: 'E',
        templateUrl: 'components/stepControllerGenerator/stepControllerGenerator.html',
        controller: 'stepControllerGenerator'
      }
    }])
    .controller('stepControllerGenerator', ['$scope', 'stepModel', function($scope, stepModel){
		$scope.getStepInfo = function() {
            stepModel.getStepInfo($scope.stateParams.eventId,function(data) {
                $scope.stepInfo = data;
                $scope.controllerTemplates = data.additional_value.templates;
                $scope.datas = data.value.CrudGenerator;
            })
        }
        $scope.getStepInfo();

        $scope.sendTableData = function() {
            console.log($scope.stateParams.eventId);
            $scope.dataToSend = {
                _eventId: $scope.stateParams.eventId,
                CrudGenerator: $scope.datas
            };
            stepModel.sendTableData($scope.dataToSend, function(data) {
                $scope.$emit('getStep', 'new step pls');
        	});
        }

    }])