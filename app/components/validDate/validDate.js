angular.module('components.validDate', [])
    .directive("validDate", [function() {
      return {
        restrict: 'A',
        require: "ngModel",
        scope: {
          validDate: '='
        },
        link: function($scope, $element, $attrs, ngModel) {
          ngModel.$validators.date = function(modelValue) {
            if($scope.validDate == 'date') {
              return moment(modelValue, 'DD/MM/YYYY', true).isValid();
            }else{
              return moment(modelValue, 'HH:mm', true).isValid();
            }
          };
        }
      };
    }]);