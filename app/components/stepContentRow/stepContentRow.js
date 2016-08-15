angular.module('components.stepContentRow', [])
    .directive('stepContentRow', [function() {
      return {
        restrict: 'E',
        templateUrl: 'components/stepContentRow/stepContentRow.html',
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

        $scope.getTableType = function() {
            stepModel.getTableType(function(res) {
            	$scope.tableType = res;
            });
        }
        $scope.getTableType();

        $scope.getTableParams = function() {
            stepModel.getTableParams(function(res) {
            	$scope.tableParams = res;
            });
        }
        $scope.getTableParams();

        $scope.sendTableData = function() {
            $scope.datas = {tables: [$scope.datas]};
            console.log($scope.datas);
        	stepModel.sendTableData($scope.stateParams.eventId, $scope.datas, function(data) {
                $scope.datas = [];
        	});
        }


    }])