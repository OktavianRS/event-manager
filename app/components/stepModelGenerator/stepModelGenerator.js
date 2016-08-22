angular.module('components.stepModelGenerator', [])
    .directive('stepModelGenerator', [function() {
      return {
        restrict: 'E',
        templateUrl: 'components/stepModelGenerator/stepModelGenerator.html',
        controller: 'stepModelGenerator'
      }
    }])
    .controller('stepModelGenerator', ['$scope', 'stepModel', function($scope, stepModel){
    	$scope.getStepInfo = function() {
            stepModel.getStepInfo($scope.stateParams.eventId,function(data) {
                $scope.stepInfo = data;
                $scope.modelRelations = data.additional_value.relations;
                $scope.modelTemplates = data.additional_value.templates;
                $scope.datas = data.value.ModelGenerator;
            })
        }
        $scope.getStepInfo();

        $scope.sendTableData = function() {
            $scope.dataToSend = {
                _eventId: $scope.stateParams.eventId,
                ModelGenerator: $scope.datas
            };
            stepModel.sendTableData($scope.dataToSend, function(data) {
                $scope.$emit('getStep', 'new step pls');
        	});
        }

    }])