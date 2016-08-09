angular.module('components.lower-case-input', [])
    .directive("lowerCaseInput", ['$browser', function($browser) {
      return {
        restrict: 'A',
        require: "ngModel",
        link: function($scope, $element) {
          $element.bind('keydown', function(event) {

            var key = event.keyCode;
            if(key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
              return;
            }

            $browser.defer(function() {
              var value = $element.val();
              $element.val(value.toLowerCase());
            });
          })
        }
      };
    }]);