angular.module('eventManager')
    .controller('loginCtrl', ['$scope', 'userModel', '$state',
      function($scope, userModel, $state) {
        $scope.login = function(userEmail, userPassword, remember) {
          userModel.login(userEmail, userPassword, remember, function() {
            $state.go('home');
          })
        };
      }
    ]);