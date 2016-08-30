angular.module('eventManager')
    .controller('eventTableCtrl', ['$scope', 'panelModel', '$mdDialog', function($scope, panelModel, $mdDialog) {
        $scope.getAttributeLabels = function() {
            panelModel.getAttributeLabels({_eventId: $scope.stateParams.eventId},function(data) {
                $scope.attributeLabels = data;
            })
        }
        $scope.getAttributeLabels();

        $scope.getFieldSettings = function() {
          panelModel.getFieldSettings({_eventId: $scope.stateParams.eventId}, function(data) {
            $scope.fieldSettings = data;
          })
        }
        $scope.getFieldSettings();

        $scope.getIndex = function() {
            panelModel.getIndex({_eventId: $scope.stateParams.eventId}, function(data) {
                $scope.index = data;
            })
        }
        $scope.getIndex();

        $scope.deleteField = function(cell) {
          panelModel.deleteField({_eventId: $scope.stateParams.eventId, id: cell.id}, function(data) {
            $scope.getIndex();
          })
        }

        $scope.shewFieldSettings = function(ev) {
            $mdDialog.show({
              controller: 'openFieldSettingsCtrl',
              templateUrl: 'components/openFieldSettings/openFieldSettings.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              locals: {
                attributeLabels: $scope.attributeLabels,
                fieldSettings: $scope.fieldSettings
              },
              fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
              var dataToSend = {
                _eventId: $scope.stateParams.eventId,
                fields: answer
              }
              panelModel.updateFieldSettings(dataToSend, function(data) {
                $scope.getFieldSettings();
                $scope.getAttributeLabels();
              })
            }, function() {
              //when close dialog
            });
        };

        $scope.showAddNewFieldModal = function(ev) {
            $mdDialog.show({
              controller: newDialogCtrl,
              templateUrl: 'components/newItemTableDialog/newItemTableDialog.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              locals: {
                attributeLabels: $scope.attributeLabels
              },
              fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
              answer._eventId = $scope.stateParams.eventId; 
              panelModel.createField(answer, function(data) {
                $scope.getIndex();
              })
            }, function() {
              //when close dialog
            });
            };

            function newDialogCtrl($scope, $mdDialog,attributeLabels) {
              $scope.attributeLabels = attributeLabels;
              $scope.newField = {};
              $scope.hide = function() {
                $mdDialog.hide();
              };
              $scope.cancel = function() {
                $mdDialog.cancel();
              };
              $scope.answer = function(answer) {
                $mdDialog.hide(answer);
              };
            }

        $scope.showUpdateNewFieldModal = function(ev, field) {
            $mdDialog.show({
              controller: updateDialogCtrl,
              templateUrl: 'components/updateItemTableDialog/updateItemTableDialog.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              locals: {
                updateField: field,
                attributeLabels: $scope.attributeLabels
              },
              fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
              answer._eventId = $scope.stateParams.eventId; 
              panelModel.updateField(answer, function(data) {
                $scope.getIndex();
              })
            }, function() {
              //when close dialog
            });
            };

              function updateDialogCtrl($scope, $mdDialog,updateField, attributeLabels) {
                $scope.updateField = updateField;
                $scope.attributeLabels = attributeLabels;
                console.log(updateField);
                $scope.hide = function() {
                  $mdDialog.hide();
                };
                $scope.cancel = function() {
                  $mdDialog.cancel();
                };
                $scope.answer = function(answer) {
                  $mdDialog.hide(answer);
                };
              }
    }
    ])

    .controller('openFieldSettingsCtrl', ['$scope', '$mdDialog', 'attributeLabels', 'fieldSettings', function($scope, $mdDialog, attributeLabels, fieldSettings) {
      $scope.attributeLabels = attributeLabels;
      $scope.fieldSettings = fieldSettings.model;

      $scope.dragndrop = {
        sort: true,
        animation: 150,
        scroll: true, // or HTMLElement
        scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
        scrollSpeed: 10,
        store: {
            get: function (sortable) {
                var order = localStorage.getItem(sortable.options.group.name);
                return order ? order.split('|') : [];
            },
            set: function (sortable) {
              $scope.order = sortable.toArray();
            }
        },
        onUpdate: function (evt) {
          $scope.fieldSettings[evt.oldIndex].order = evt.newIndex;
          $scope.fieldSettings[evt.oldIndex].edited = true;
        }
      }

      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.answer = function(answer) {
        var toSend = [];
        angular.forEach(answer, (value, key) => {
          value.edited ? delete value.edited && toSend.push(value) : false;
        })
        $mdDialog.hide(toSend);
      };
    }])