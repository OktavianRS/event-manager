angular.module('components.stepTableGenerator', [])
    .directive('stepTableGenerator', [function() {
      return {
        restrict: 'E',
        templateUrl: 'components/stepTableGenerator/stepTableGenerator.html',
        controller: 'stepContentRowCtrl'
      }
    }])
    .controller('stepContentRowCtrl', ['$scope', 'stepModel', function($scope, stepModel){
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
            $scope.datas = {tables: [$scope.datas]};
            stepModel.sendTableData($scope.stateParams.eventId, $scope.datas, function(data) {
                if(data.model) {
                    // $scope.stepperCtrl.steps.model.step += 1;
                }
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