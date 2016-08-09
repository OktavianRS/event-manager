angular.module('eventManager')
    .controller('stepsCreatorCtrl', ['$scope', 'userModel', function($scope, userModel) {
    	$scope.selected = 0;
    	$scope.steps = [];

        $scope.getCurrentUser = function() {
            userModel.getCurrent(function(res) {
                $scope.user = res;
            })
        }

        $scope.checkNextStep = function(index) {
        	$scope.steps[index + 1].disabled = $scope.checker? !0 : false;
        }

        $scope.completeStep = function(index) {
        	$scope.steps[index].completed = true;
        	$scope.selected = index + 2;
        }

        $scope.getSteps = function() {
        	$scope.steps = [
        		{
        			id: 0,
        			name: 'First step',
        			disabled: false,
        			completed: false,
        			content: 'First step content'
        		},
        		{
        			id: 1,
        			name: 'Second step',
        			disabled: true,
        			completed: false,
        			content: 'Second step content'
        		},
        		{
        			id: 3,
        			name: 'Third step',
        			disabled: true,
        			completed: false,
        			content: 'Third step content'
        		}
        	]
        }
        $scope.getSteps();

    }
    ]);
