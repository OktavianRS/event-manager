angular.module('components.stepModelGenerator', [])
    .directive('stepModelGenerator', [function() {
      return {
        restrict: 'E',
        templateUrl: 'components/stepModelGenerator/stepModelGenerator.html'
      }
    }])
    .controller('stepModelGenerator', ['$scope', 'stepModel', function($scope, stepModel){

            alert(true)
        $scope.$on('get-model-info', function(event, data) {
            $scope.stepInfo = data;
            $scope.modelRelations = data.additional_value.relations;
            $scope.modelTemplates = data.additional_value.templates;
            $scope.datas = data.value.ModelGenerator;
        });

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