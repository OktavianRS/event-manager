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
                $scope.steps = res;
                $scope.showme = true;
                $scope.steps.model.step = res.model.step+1;
            });
        }
        $scope.getStep();

        $scope.$on('getStep', function (event, data) {
          getStep(); // Данные, которые нам прислали
        });

        $scope.checkStep = function(data) {
                $scope.tableTemplateStp = {
                    tableType: data[1].additional_value.type,
                    tableParams: data[1].additional_value.param,
                    data: data[1].value.TableGenerator.tables[0]
                }
                $scope.modelTemplateStp = {
                    modelRelations: data[2].additional_value.relations,
                    modelTemplates: data[2].additional_value.templates,
                    data: data[2].value.ModelGenerator
                }
                $scope.controllerTemplateStp = {
                    controllerTemplates: data[3].additional_value.templates,
                    data: data[3].value.CrudGenerator
                }
        }

        $scope.getStepInfo = function(req) {
            stepModel.getStepInfo(req ,function(data) {
                $scope.stepInfoData = data;
                $scope.checkStep($scope.stepInfoData);
            })
        }
        $scope.getStepInfo({_eventId: $scope.stateParams.eventId});

        $scope.navigateStep = function(order) {
            $scope.steps.model.step = order;
        }

        $scope.rollBack = function() {
            $scope.showme = false;
            stepModel.rollBack({_eventId: $scope.stateParams.eventId, step: $scope.steps.model.step}, function(res) {
                $scope.steps.model.steps[$scope.steps.model.step-1].check = false;
                $scope.steps.model.step -= 1;
            })
        }

        $scope.sendTableData = function(config) {
            $scope.showme = false;
            if(config === 'table') {
                var dataToSend = {
                    _eventId: $scope.stateParams.eventId,
                    TableGenerator: { tables: [$scope.tableTemplateStp.data] }
                }
            } if(config === 'model') {
                var dataToSend = {
                    _eventId: $scope.stateParams.eventId,
                    ModelGenerator: $scope.modelTemplateStp.data
                }
            } if(config === 'controller') {
                var dataToSend = {
                    _eventId: $scope.stateParams.eventId,
                    CrudGenerator: $scope.controllerTemplateStp.data
                }
            }
            stepModel.sendTableData(dataToSend, function(res) {
                config === 'model' ? $scope.getStepInfo({_eventId: $scope.stateParams.eventId}) : false;
                config === 'table' ? $scope.steps.model.steps[$scope.steps.model.step].check = true : $scope.steps.model.steps[$scope.steps.model.step-1].check = true;
                $scope.steps.model.step += 1;
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