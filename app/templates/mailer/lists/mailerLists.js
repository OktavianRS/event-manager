angular.module('eventManager')
    .controller('mailerListsCtrl', ['$scope', 'crudModel', '$mdDialog', 'mailerModel',
      function($scope, crudModel, $mdDialog, mailerModel) {
        $scope.url = 'list';

        $scope.getIndex = function() {
            crudModel.Index($scope.url, {}, function(data) {
                $scope.Index = data;
            });
        }
        $scope.getIndex();

        $scope.deleteItem = function(item) {
            crudModel.Delete($scope.url, {id: item.id}, function(data) {
                $scope.getIndex();
            });
        }

        $scope.showDialog = function(ev, index) {
            $mdDialog.show({
              controller: DialogController,
              templateUrl: 'components/mailer/addSubscriberDialog.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: true,
              locals: {
                data: {}
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