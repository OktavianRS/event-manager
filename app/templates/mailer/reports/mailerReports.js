angular.module('eventManager')
    .controller('mailerReportsCtrl', ['$scope', 'crudModel', '$mdDialog',
      function($scope, crudModel, $mdDialog) {
        $scope.url = 'report';
        $scope.Chart = {};
        $scope.labelsChart = [
          "Sent",
          "Queued",
          "Failed",
          'Clicked',
          'Viewed',
          'Unsubscribed'
        ];
        $scope.dataChart = [];
        $scope.colorChart = [
          '#9E9E9E',
          '#FF9800',
          '#F44336',
          '#8BC34A',
          '#00BCD4',
          '#212121'
        ];

        $scope.getIndex = function() {
            crudModel.Index($scope.url, {queue_id: $scope.stateParams.queueId}, function(data) {
                data.model[0].send_time = moment(parseInt(data.model[0].send_time), 'X').format('MMMM DD, YYYY hh:mm a');
                $scope.Index = data.model;
                $scope.Chart.sent = {
                  color: ['#009688'],
                  labels: ["Sent"],
                  data: [
                    data.model[0].send,
                  ]
                };
            });
        }
        $scope.getIndex();

        $scope.getView = function() {
          crudModel.Read($scope.url, {id: $scope.stateParams.queueId}, function(data) {
            console.log(data);
          })
        }
        $scope.getView();

        $scope.deleteItem = function(item) {
            crudModel.Delete($scope.url, {id: item.id}, function(data) {
                $scope.getIndex();
            });
        }

        $scope.showDialog = function(ev, index) {
            $mdDialog.show({
              controller: DialogController,
              templateUrl: 'components/mailer/emailsDialog.html',
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