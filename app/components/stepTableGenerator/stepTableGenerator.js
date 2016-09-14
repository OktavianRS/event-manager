angular.module('components.stepTableGenerator', [])
    .directive('stepTableGenerator', [function() {
      return {
        restrict: 'E',
        templateUrl: 'components/stepTableGenerator/stepTableGenerator.html'
      }
    }])
    .controller('stepTableGenerator', ['$scope', 'stepModel','$timeout', '$q', function($scope, stepModel, $timeout, $q){


    	// Interaction with View

        $scope.deleteField = function(index) {
            $scope.tableTemplateStp.data.fields.splice(index, 1);
        }

        $scope.addNewField = function() {
            $scope.tableTemplateStp.data.fields.push({});
        }

    	// Interaction with model and data

        $scope.sendTableData = function() {
            $scope.dataToSend = {
                _eventId: $scope.stateParams.eventId,
                TableGenerator: { tables: [$scope.tableTemplateStp.data] }
            };
            stepModel.sendTableData($scope.dataToSend, function(data) {
                $scope.$emit('getStep', 'new step pls');
        	});
        }

        $scope.deleteProperty = function(index, param) {
            delete $scope.tableTemplateStp.fields[index].params[param];
        }

        $scope.createProperty = function(index, param, val) {
            $scope.tableTemplateStp.fields[index].params[param].name = param;
            $scope.tableTemplateStp.fields[index].params[param].value = val;
        }

    }])