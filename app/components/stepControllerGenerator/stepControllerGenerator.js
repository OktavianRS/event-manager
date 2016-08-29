angular.module('components.stepControllerGenerator', [])
    .directive('stepControllerGenerator', [function() {
      return {
        restrict: 'E',
        templateUrl: 'components/stepControllerGenerator/stepControllerGenerator.html'
      }
    }])
    .controller('stepControllerGenerator', ['$scope', 'stepModel', function($scope, stepModel){
alert(true)
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

        $scope.$on('get-controller-info', function(event, data) {
            $scope.stepInfo = data;
            $scope.controllerTemplates = data.additional_value.templates;
            $scope.datas = data.value.CrudGenerator;
        });

    }])