angular.module('eventManager')
    .controller('panelSearchCtrl', ['$scope', 'panelModel', '$mdDialog', function($scope, panelModel, $mdDialog) {

        $scope.getIndexSearch = function() {
          panelModel.getIndexSearch({event_id: $scope.stateParams.eventId},function(data) {
                $scope.indexLabels = data;
            })
        }
        $scope.getIndexSearch();

        $scope.getAttributeLabels = function() {
            panelModel.getAttributeLabels({_eventId: $scope.stateParams.eventId},function(data) {
                $scope.attributeLabels = data;
            })
        }
        $scope.getAttributeLabels();

        // $scope.allByEvent = function() {
        //   panelModel.allByEvent({event_id: $scope.stateParams.eventId},function(data) {
                
        //     })
        // }
        // $scope.allByEvent();

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
                indexLabels: $scope.indexLabels,
                attributeLabels: $scope.attributeLabels
              },
              fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
              panelModel.createSearch({event_id: $scope.stateParams.eventId, params: answer.cards, name: answer.name}, function(data) {
                $scope.getIndexSearch();
              })
            }, function() {
              //when close dialog
            });
            };

              function newDialogCtrl($scope, $mdDialog,indexLabels,attributeLabels) {
                $scope.indexLabels = indexLabels;
                $scope.attributeLabels = attributeLabels;
                $scope.answerObject = {
                  name: 'Default name',
                  cards: [
                    {
                      name: 1
                    }
                  ],
                  types: attributeLabels
                };
                $scope.deleteType = function(index) {
                  $scope.answerObject.types.splice(index,1);
                  $scope.nextCard = true;
                }
                $scope.addCard = function() {
                  $scope.answerObject.cards.push({name: $scope.answerObject.cards.length});
                  $scope.nextCard = false;
                }
                $scope.deleteCard = function(index, params) {
                  $scope.answerObject.types.push({name: params.name, label: params.label});
                  $scope.answerObject.cards.splice(index,1);
                  $scope.nextCard = true;
                }
                $scope.showAns = function() {
                console.log($scope.answerObject);
                }
                $scope.quickSearch = {};
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
                indexLabels: $scope.indexLabels
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

              function updateDialogCtrl($scope, $mdDialog,updateField, indexLabels) {
                $scope.updateField = updateField;
                $scope.indexLabels = indexLabels;
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
