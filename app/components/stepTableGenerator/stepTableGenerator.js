angular.module('components.stepTableGenerator', [])
    .directive('stepTableGenerator', [function() {
      return {
        restrict: 'E',
        templateUrl: 'components/stepTableGenerator/stepTableGenerator.html',
        controller: 'stepTableGenerator'
      }
    }])
    .controller('stepTableGenerator', ['$scope', 'stepModel', function($scope, stepModel){
    	// vars
    	$scope.table = [];
    	$scope.fields = [0]
    	$scope.showTypeFields = false;

    	// Interaction with View

    	$scope.addNewField = function() {
    		$scope.fields.push($scope.fields.length)
    	}

    	// Interaction with model and data

        $scope.sendTableData = function() {
            $scope.datas = {
                _eventId: $scope.stateParams.eventId,
                TableGenerator: { tables: [$scope.datas] }
            };
            stepModel.sendTableData($scope.datas, function(data) {
                $scope.datas = {};
        	});
        }

        $scope.getStepInfo = function() {
            stepModel.getStepInfo($scope.stateParams.eventId,function(data) {
                $scope.stepInfo = data;
                $scope.tableType = data.additional_value.type;
                $scope.tableParams = data.additional_value.param; 
            })
        }
        $scope.getStepInfo();


    }])