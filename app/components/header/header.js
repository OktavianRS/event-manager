angular.module('components.header', [])
    .directive('eventHeader', [function() {
      return {
        restrict: 'E',
        templateUrl: 'components/header/header.html',
        controller: 'headerCtrl'
      }
    }])
    .controller('headerCtrl', ['$scope', '$state', 'userModel',
      function($scope, $state, userModel) {

        $scope.events = [
          {
            id: 0,
            Name: 'Event 1'
          },
          {
            id: 1,
            Name: 'Event 2'
          }
        ]

        $scope.getCurrentUser = function() {
            userModel.getCurrent(function(res) {
                $scope.user = res;
            })
        }

        $scope.logout = function(){
          $state.go('login');
          userModel.logout();
        }
      }
    ]);
