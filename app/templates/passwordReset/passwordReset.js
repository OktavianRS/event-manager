angular.module('eventManager')
    .controller('passwordResetCtrl', ['$scope', 'userModel', '$state',
      function($scope, userModel, $state) {
      	$scope.emailVerified = false;
      	$scope.loader = false;
      	$scope.user = {};

      	$scope.verifyEmail = function(email) {
      		$scope.loader = true;
      		userModel.verifyEmail({email: email}, function(data) {
      			$scope.loader = false;
      		})
      	}



        $scope.login = function(userEmail, userPassword, remember) {
          userModel.login(userEmail, userPassword, remember, function() {
            $state.go('home');
          })
        };
      }
    ]);