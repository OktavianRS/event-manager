angular.module('eventManager')
    .controller('panelSearchCtrl', ['$scope', 'panelModel', '$mdDialog', function($scope, panelModel, $mdDialog) {

        $scope.getIndexSearch = function() {
          panelModel.getIndexSearch({event_id: $scope.stateParams.eventId},function(data) {
                $scope.attributeLabels = data;
            })
        }
        $scope.getIndexSearch();

        $scope.deleteField = function(cell) {
          panelModel.deleteSearch({id: cell.id}, function(data) {
            $scope.getIndexSearch();
          })
        }

        $scope.showAddNewFieldModal = function(ev) {
            $mdDialog.show({
              controller: newDialogCtrl,
              templateUrl: 'components/newItemSearchDialog/newItemSearchDialog.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              locals: {
                attributeLabels: $scope.attributeLabels
              },
              fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
              panelModel.createSearch({event_id: $scope.stateParams.eventId, name: answer}, function(data) {
                $scope.getIndexSearch();
              })
            }, function() {
              //when close dialog
            });
            };

              function newDialogCtrl($scope, $mdDialog,attributeLabels) {
                $scope.attributeLabels = attributeLabels;
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
    ]);
