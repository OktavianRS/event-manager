angular.module('eventManager')
    .controller('eventTableCtrl', ['$scope', 'panelModel', '$mdDialog', '$timeout', '$q', '$mdEditDialog', function($scope, panelModel, $mdDialog, $timeout, $q, $mdEditDialog) {

/////////////////////
// table configs
/////////////////////
  $scope.selected = [];
  $scope.limitOptions = [5, 10, 15];
  $scope.searchOpened = false;
  $scope.typeSearch = '';

    $scope.query = {
      limit: 15,
      page: 1
    };

  $scope.logPagination = function (page, limit) {
    console.log($scope.selected);
    $scope.query = {
      limit: limit,
      page: page
    };
    $scope.getIndex();
  }

  $scope.options = {
    rowSelection: true,
    multiSelect: true,
    autoSelect: true,
    decapitate: false,
    largeEditDialog: true,
    boundaryLinks: false,
    limitSelect: true,
    pageSelect: true
  };

  $scope.editComment = function (event, cell, label) {
    event.stopPropagation(); // in case autoselect is enabled
    console.log(cell, label);
    var editDialog = {
      modelValue: cell[label.name],
      placeholder: 'update value',
      save: function (input) {
        cell[label.name] = input.$viewValue;
        $scope.storeInputChanges(cell, label.label);
      },
      targetEvent: event,
      title: 'Update value',
      validators: {
        'md-maxlength': 40
      }
    };

    var promise;
    
    if($scope.options.largeEditDialog) {
      promise = $mdEditDialog.large(editDialog);
    } else {
      promise = $mdEditDialog.small(editDialog);
    }
    


  }
$scope.refresh = function() {
  $scope.getAttributeLabels();
  $scope.getFieldSettings();
  $scope.getIndex();
}

$scope.deleteSelected = function() {
  console.log($scope.toDelete);
  console.log($scope.selected);
}

$scope.toggleSearch = function() {
  $scope.searchOpened = !$scope.searchOpened;
}


      $scope.search = '';

      // menu settings
      $scope.menuCtrl = {};
      $scope.menuCtrl.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
      };

      $scope.getSelectedText = function() {
        if ($scope.selectedItem !== undefined) {
          return "Selected: " + $scope.selectedItem.name;
        } else {
          return "Quick search";
        }
      };

      $scope.sortQuick = function(sort) {
            var deferred = $q.defer();
            $scope.promise = deferred.promise;
            panelModel.getIndex({_eventId: $scope.stateParams.eventId, search_id: sort.id},function(data) {
                $scope.index = data;
                deferred.resolve();
            })
      }

      $scope.searchQuick = function(sort) {
        var deferred = $q.defer();
        $timeout(function() {
        $scope.promise = deferred.promise;
        console.log('sending');
            panelModel.getIndex({_eventId: $scope.stateParams.eventId, quick_search: sort},function(data) {
              console.log('resolved');
                $scope.index = data;
                deferred.resolve();
            })
        }, 2000);
      }

      $scope.allByEvent = function() {
          panelModel.allByEvent({event_id: $scope.stateParams.eventId},function(data) {
                $scope.dropdownItems = data;
            })
        }
        $scope.allByEvent();

        $scope.getAttributeLabels = function() {
            panelModel.getAttributeLabels({_eventId: $scope.stateParams.eventId},function(data) {
                $scope.attributeLabels = data.attributes;
                $scope.fixExist = data.fix_exist;
            })
        }
        $scope.getAttributeLabels();

        $scope.getFieldSettings = function() {
          $scope.processing = true;
          panelModel.getFieldSettings({_eventId: $scope.stateParams.eventId}, function(data) {
            $scope.fieldSettings = data;
            $scope.processing = false;
          })
        }
        $scope.getFieldSettings();

        $scope.storeInputChanges = function(cell, label) {
          $scope.processing = true;
            cell._eventId = $scope.stateParams.eventId; 
            panelModel.updateField(cell, function(data) {
              $scope.processing = false;
            })
        }

/////////////////////////////////////////////
//////////////////////////////// data content
/////////////////////////////////////////////

        $scope.getIndex = function() {
          var deferred = $q.defer();
          $scope.promise = deferred.promise;
            panelModel.getIndex({
              _eventId: $scope.stateParams.eventId,
              page: $scope.query.page-1,
              size: $scope.query.limit }, function(data) {
              $scope.index = data;
              deferred.resolve();
            })
        }
        $scope.getIndex();

        $scope.deleteField = function() {
          var deferred = $q.defer();
          $scope.promise = deferred.promise;
          panelModel.deleteField({_eventId: $scope.stateParams.eventId, id: $scope.selected}, function(data) {
            $scope.refresh();
            $scope.selected = [];
            deferred.resolve();
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
              $scope.processing = true;
              var dataToSend = {
                _eventId: $scope.stateParams.eventId,
                fields: answer
              }
              panelModel.updateFieldSettings(dataToSend, function(data) {
                $scope.processing = false;
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
              $scope.processing = true;
              answer._eventId = $scope.stateParams.eventId; 
              panelModel.createField(answer, function(data) {
                $scope.getIndex();
                $scope.processing = false;
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
              $scope.processing = true;
              answer._eventId = $scope.stateParams.eventId; 
              panelModel.updateField(answer, function(data) {
                $scope.getIndex();
                $scope.processing = false;
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
      $scope.fieldSettings = fieldSettings;
      console.log(attributeLabels);
      console.log(fieldSettings);
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

        }
      }

      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.answer = function(answer) {
        angular.forEach($scope.order, (value, key) => {
          answer[Number(value)].order = key;
        })
        console.log(answer);
        $mdDialog.hide(answer);
      };


      // tympanus solution for fixed colums (uses jquery)



    }])