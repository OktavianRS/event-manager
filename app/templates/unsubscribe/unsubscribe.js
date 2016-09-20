angular.module('eventManager')
    .controller('unsubscribeCtrl', ['$scope', 'userModel', '$state', '$location',
      function($scope, userModel, $state, $location) {
        $scope.unsubscribe = {};
        $scope.hash = $location.hash();
        $scope.hideForm = false;


      	$scope.unsubscribe = function() {
      		userModel.unsubscribe({key: $scope.hash, message: $scope.unsubscribe.message}, function(data) {
            $scope.hideForm = true;
            $scope.message = data;
          })
      	}



      }
    ]);