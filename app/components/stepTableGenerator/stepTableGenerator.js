angular.module('components.stepTableGenerator', [])
    .directive('stepTableGenerator', [function() {
      return {
        restrict: 'E',
        templateUrl: 'components/stepTableGenerator/stepTableGenerator.html',
        controller: 'stepTableGenerator'
      }
    }])
    .controller('stepTableGenerator', ['$scope', 'stepModel','$timeout', '$q', function($scope, stepModel, $timeout, $q){
        $scope.datas = [];
        $scope.datas.fields = [{}];

    	// Interaction with View


    	// Interaction with model and data

        $scope.addNewField = function() {
            $scope.datas.fields.push([]);
        }

        $scope.sendTableData = function() {
            $scope.datas = {
                _eventId: $scope.stateParams.eventId,
                TableGenerator: { tables: [$scope.datas] }
            };
            stepModel.sendTableData($scope.datas, function(data) {
                $scope.getStepInfo();
        	});
        }

        $scope.getStepInfo = function() {
            stepModel.getStepInfo($scope.stateParams.eventId,function(data) {
                $scope.tableType = data.additional_value.type;
                $scope.tableParams = data.additional_value.param;
                $scope.datas = data.value.TableGenerator.tables[0];
            })
        }
        $scope.getStepInfo();

        $scope.uniquenessCheck = function() {
            var valueArray = $scope.datas.fields.map(function(item){ return item.name });
            var isDuplicate = valueArray.some(function(item, idx) {
                return valueArray.indexOf(item) != idx
            });
        }

        $scope.initialState = function(index) {
            console.log(index);
            $scope.select = [
                {checked: false},{checked: false},{checked: false},{checked: false},{checked: false}
            ];
            angular.forEach($scope.datas.fields[index].params,function(item, key) {
                    $scope.select[item.id].checked = true;
            });
        }

        $scope.checkState = function(name, index) {
            console.log(index);
        }

    }])