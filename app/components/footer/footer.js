angular.module('components.footer', [])
    .directive('eventFooter', [function() {
      return {
        restrict: 'E',
        templateUrl: 'components/footer/footer.html'
      }
    }]);