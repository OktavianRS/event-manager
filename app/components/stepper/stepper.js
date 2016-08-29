angular.module('components.stepper', [])
    .directive('stepper', [function() {
      return {
        restrict: 'E',
        templateUrl: 'components/stepper/stepper.html'
      }
    }])
    .controller('stepperCtrl', ['$scope', 'stepModel', function($scope, stepModel){
        $scope.table = [];
        $scope.grade = 1;
        $scope.showme = false;

        $scope.getStep = function() {
            stepModel.getStep($scope.stateParams.eventId,function(res) {
                res.model.steps.push({ id: res.model.steps.length, name: 'Done', required: 1});
                $scope.steps = res;
                $scope.steps.model.step = res.model.step;
                $scope.showme = true;
                
            });
        }
        $scope.getStep();

        $scope.checkStep = function(data) {
            if(data.value.TableGenerator) {
                $scope.tableType = data.additional_value.type;
                $scope.tableParams = data.additional_value.param;
                $scope.datas = data.value.TableGenerator.tables[0];
            }
            if(data.value.ModelGenerator) {
                $scope.stepInfo = data;
                $scope.modelRelations = data.additional_value.relations;
                $scope.modelTemplates = data.additional_value.templates;
                $scope.datas = data.value.ModelGenerator;
            }
            if(data.value.CrudGenerator) {
                $scope.stepInfo = data;
                $scope.controllerTemplates = data.additional_value.templates;
                $scope.datas = data.value.CrudGenerator;
            }
        }

        $scope.getStepInfo = function(req) {
            stepModel.getStepInfo(req ,function(data) {
                $scope.checkStep(data);
            })
        }
        $scope.getStepInfo({_eventId: $scope.stateParams.eventId});

        $scope.navigateStep = function(order) {
        $scope.steps.model.step = order;
            $scope.dataToSend = {
                _eventId: $scope.stateParams.eventId,
                step: order
            }
            $scope.getStepInfo($scope.dataToSend);
        }

        $scope.rollBack = function() {
            stepModel.rollBack({_eventId: $scope.stateParams.eventId, step: $scope.steps.model.step}, function(data) {
                $scope.steps.model.step = data.step;
                $scope.checkStep(data.info);
                console.log($scope.steps.model.steps);
            })
        }

        $scope.sendTableData = function(config) {
            if(config === 'table') {
                var dataToSend = {
                    _eventId: $scope.stateParams.eventId,
                    TableGenerator: { tables: [$scope.datas] }
                }
            } if(config === 'model') {
                var dataToSend = {
                    _eventId: $scope.stateParams.eventId,
                    ModelGenerator: $scope.datas
                }
            } if(config === 'controller') {
                var dataToSend = {
                    _eventId: $scope.stateParams.eventId,
                    CrudGenerator: $scope.datas
                }
            }
            stepModel.sendTableData(dataToSend, function(data) {
                $scope.getStep();
            });
        }

        //////////////////////
        //# Table generator funcs
        //////////////////////

                $scope.datas = [];
        $scope.datas.fields = [{}];

        // Interaction with View


        // Interaction with model and data

        $scope.addNewField = function() {
            $scope.datas.fields.push({});
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

        //////////////////////
        //# Model generator funcs
        //////////////////////

        //////////////////////
        //# Controller generator funcs
        //////////////////////

    }])