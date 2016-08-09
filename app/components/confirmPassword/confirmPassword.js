angular.module('components.confirm-password', [])
    .directive("confirmPassword", [function() {
      return {
        restrict: 'A',
        require: "ngModel",
        scope: {
          originalPassword: '=originalPassword'
        },
        link: function($scope, $element, $attrs, ngModel) {
          ngModel.$validators.repeat = function(modelValue) {
            return modelValue == $scope.originalPassword;
          };
          $scope.$watch("originalPassword", function() {
            ngModel.$validate();
          });
        }
      };
    }]);