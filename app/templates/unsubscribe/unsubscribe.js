angular.module('eventManager')
    .controller('unsubscribeCtrl', ['$scope', 'userModel', '$state', '$location',
      function($scope, userModel, $state, $location) {
        $scope.message = {};
        $scope.message.id = true;
        $scope.unsubscribe = {};
        $scope.hash = $location.hash();

        $scope.checkUnsubscribe = function() {
          userModel.checkUnsubscribe({key: $scope.hash}, function(data) {
            $scope.message = data;
          })
        }
        $scope.checkUnsubscribe();


      	$scope.unsubscribe = function() {
      		userModel.unsubscribe({id: $scope.hash, message: $scope.unsubscribe.message})
      	}



      }
    ]);