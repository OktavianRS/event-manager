angular.module('eventManager')
    .controller('mailerTemplatesCtrl', ['$scope', 'crudModel', '$mdDialog', 'templateModel',
      function($scope, crudModel, $mdDialog, templateModel) {
        $scope.url = 'template';
        $scope.changeAllFlag = false;
        $scope.changed = [];

        $scope.getIndex = function() {
            crudModel.Index($scope.url, {}, function(data) {
                $scope.Index = data;
            });
        }
        $scope.getIndex();

        $scope.deleteSelected = function() {
            crudModel.Delete($scope.url, {id: $scope.changed}, function(data) {
                $scope.changed = [];
                $scope.getIndex();
            });
        }

        $scope.changeOne = function(id) {
          var index = $scope.changed.indexOf(id);
          if(index == -1) {
            $scope.changed.push(id);
          } else {
            $scope.changed.splice(index, 1);
          }
        };

        $scope.getRecipientInsert = function() {
          templateModel.recipientInsert({}, function(data) {
            $scope.recipient = data;
          });
        }
        $scope.getRecipientInsert();

        $scope.deleteItem = function(item) {
            crudModel.Delete($scope.url, {id: item.id}, function(data) {
                $scope.getIndex();
            });
        }

        $scope.showDialog = function(ev, index) {
            $mdDialog.show({
              controller: DialogController,
              templateUrl: 'components/mailer/templatesDialog.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: true,
              locals: {
                data: $scope.Index.model[index]
              }
            })
            .then(function(answer) {
              answer.id ? 
              crudModel.Update($scope.url, {id: answer.id, name: answer.name, user_id: answer.user_id}, function(data) {
                $scope.getIndex();
              }) : 
              crudModel.Create($scope.url, {name: answer.name}, function(data) {
                $scope.getIndex();
              })
            }, function() {
              $scope.status = 'You cancelled the dialog.';
            });
        };

        function DialogController($scope, $mdDialog, data) {
            $scope.data = data;
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