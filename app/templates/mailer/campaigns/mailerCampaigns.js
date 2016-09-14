angular.module('eventManager')
    .controller('mailerCampaignsCtrl', ['$scope', 'crudModel', '$mdDialog',
      function($scope, crudModel, $mdDialog) {
        $scope.url = 'campaign';
        $scope.changeAllFlag = false;
        $scope.changed = [];

        $scope.getIndex = function() {
            crudModel.Index($scope.url, {}, function(data) {
                $scope.Index = data;
            });
        }
        $scope.getIndex();

        $scope.changeOne = function(id) {
          var index = $scope.changed.indexOf(id);
          if(index == -1) {
            $scope.changed.push(id);
          } else {
            $scope.changed.splice(index, 1);
          }
        };

        $scope.deleteSelected = function() {
            crudModel.Delete($scope.url, {id: $scope.changed}, function(data) {
                $scope.changed = [];
                $scope.getIndex();
            });
        }

        $scope.deleteItem = function(item) {
            crudModel.Delete($scope.url, {id: item.id}, function(data) {
                $scope.getIndex();
            });
        }
      }
    ]);