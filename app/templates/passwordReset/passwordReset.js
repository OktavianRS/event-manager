angular.module('eventManager')
    .controller('passwordResetCtrl', ['$scope', 'userModel', '$state', '$location',
      function($scope, userModel, $state, $location) {
      	$scope.emailVerified = false;
      	$scope.loader = false;
      	$scope.user = {};
      	$scope.hash = $location.hash();
      	$scope.disableButton = false;
        console.log($location.hash());

      	$scope.compareStr = function() {
      		$scope.user.userPassword === $scope.user.userPasswordAgain ? 
      			$scope.disableButton = false :
      			$scope.disableButton = true
      	}

      	$scope.changePassword = function() {
      		userModel.changePassword({token: $scope.hash, password: $scope.user.userPassword}, function(data) {
      			data === 'New password was saved.' ? $state.go('home') : false;
      		})
      	}

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