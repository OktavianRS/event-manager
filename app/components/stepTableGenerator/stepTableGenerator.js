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
            $scope.dataToSend = {
                _eventId: $scope.stateParams.eventId,
                TableGenerator: { tables: [$scope.datas] }
            };
            stepModel.sendTableData($scope.dataToSend, function(data) {
                $scope.$emit('getStep', 'new step pls');
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

        $scope.get = function() {
            console.log($scope.datas.fields);
        }

        $scope.deleteProperty = function(index, param) {
            delete $scope.datas.fields[index].params[param];
        }

        $scope.createProperty = function(index, param, val) {
            $scope.datas.fields[index].params[param].name = param;
            $scope.datas.fields[index].params[param].value = val;
        }

        $scope.deleteField = function(index) {
            $scope.datas.fields.splice(index, 1);
        }

    }])