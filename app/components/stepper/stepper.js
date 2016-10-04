angular.module('components.stepper', [])
    .directive('stepper', [function() {
      return {
        restrict: 'E',
        templateUrl: 'components/stepper/stepper.html'
      }
    }])
    .controller('stepperCtrl', ['$scope', 'stepModel', '$q', '$timeout', '$mdEditDialog', function($scope, stepModel, $q, $timeout, $mdEditDialog) {
        $scope.table = [];
        $scope.grade = 1;
        $scope.showme = false;
        $scope.selected = 0;
        $scope.fullSize = false;

        $scope.getStep = function() {
            stepModel.getStep($scope.stateParams.eventId,function(res) {
                $scope.steps = res;
                $scope.showme = true;
                $scope.selected = res.model.step;
            });
        }
        $scope.getStep();

        $scope.$on('getStep', function (event, data) {
          getStep(); 
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

        $scope.navigateStep = function(direction) {
            if (direction) {
                $scope.selected = $scope.selected + 1;
            } else {
                $scope.selected = $scope.selected - 1;
            }
        }

        $scope.rollBack = function() {
            $scope.showme = false;
            stepModel.rollBack({
                _eventId: $scope.stateParams.eventId,
                step: $scope.steps.model.step
            }, function(res) {
                $scope.getStep();
            })
        }

        $scope.sendTableData = function(config) {
            $scope.showme = false;
            if(config === 0) {
                var dataToSend = {
                    _eventId: $scope.stateParams.eventId,
                    step: 1,
                    TableGenerator: { tables: [$scope.tableTemplateStp.data] }
                }
            } if(config === 1) {
                var dataToSend = {
                    _eventId: $scope.stateParams.eventId,
                    step: 2,
                    ModelGenerator: $scope.modelTemplateStp.data
                }
            } if(config === 2) {
                var dataToSend = {
                    _eventId: $scope.stateParams.eventId,
                    step: 3,
                    CrudGenerator: $scope.controllerTemplateStp.data
                }
            }
            stepModel.sendTableData(dataToSend, function(res) {
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

        $scope.editFieldName = function(event, index) {
            var editDialog = {
              modelValue: $scope.tableTemplateStp.data.fields[index].name,
              placeholder: 'New value',
              save: function (input) {
                    $scope.tableTemplateStp.data.fields[index].name = input.$modelValue;
              },
              targetEvent: event,
              title: 'New value',
              validators: {
                'md-maxlength': 50
              }
            };
            $scope.editField(editDialog)
        }

        $scope.editFieldParamOne = function(event, index) {
            var editDialog = {
              modelValue: $scope.tableTemplateStp.data.fields[index].type.value[0],
              placeholder: 'New value',
              save: function (input) {
                    $scope.tableTemplateStp.data.fields[index].type.value[0] = input.$modelValue;
              },
              targetEvent: event,
              title: 'New value',
              validators: {
                'md-maxlength': 50
              }
            };
            $scope.editField(editDialog)
        }

        $scope.editFieldParamTwo = function(event, index) {
            var editDialog = {
              modelValue: $scope.tableTemplateStp.data.fields[index].type.value[1],
              placeholder: 'New value',
              save: function (input) {
                    $scope.tableTemplateStp.data.fields[index].type.value[1] = input.$modelValue;
              },
              targetEvent: event,
              title: 'New value',
              validators: {
                'md-maxlength': 50
              }
            };
            $scope.editField(editDialog)
        }

        $scope.editComment = function(event, index) {
            if(!$scope.tableTemplateStp.data.fields[index].params.comment.value) {
                $scope.tableTemplateStp.data.fields[index].params.comment.value = [];
                $scope.tableTemplateStp.data.fields[index].params.comment.value[0] = '';
            }
            var editDialog = {
              modelValue: $scope.tableTemplateStp.data.fields[index].params.comment.value[0],
              placeholder: 'New value',
              save: function (input) {
                    $scope.tableTemplateStp.data.fields[index].params.comment.value[0] = input.$modelValue;
              },
              targetEvent: event,
              title: 'New value',
              validators: {
                'md-maxlength': 50
              }
            };
            $scope.editField(editDialog)
        }

        $scope.editDefaultValue = function(event, index) {
            if(!$scope.tableTemplateStp.data.fields[index].params.defaultValue.value) {
                $scope.tableTemplateStp.data.fields[index].params.defaultValue.value = [];
                $scope.tableTemplateStp.data.fields[index].params.defaultValue.value[0] = '';
            }
            var editDialog = {
              modelValue: $scope.tableTemplateStp.data.fields[index].params.defaultValue.value[0],
              placeholder: 'New value',
              save: function (input) {
                    $scope.tableTemplateStp.data.fields[index].params.defaultValue.value[0] = input.$modelValue;
              },
              targetEvent: event,
              title: 'New value',
              validators: {
                'md-maxlength': 50
              }
            };
            $scope.editField(editDialog)
        }

        $scope.editField = function (config) {
          config.targetEvent.stopPropagation(); // in case autoselect is enabled

          var promise;
          
            promise = $mdEditDialog.large(config);
          
          promise.then(function (ctrl) {
            var input = ctrl.getInput();
            
            input.$viewChangeListeners.push(function () {
              input.$setValidity('test', input.$modelValue !== 'test');
            });
          });
        };

        //////////////////////
        //# Model generator funcs
        //////////////////////

        //////////////////////
        //# Controller generator funcs
        //////////////////////

    }])