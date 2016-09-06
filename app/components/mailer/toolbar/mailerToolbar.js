angular.module('components.mailerToolbar', [])
    .directive('mailerToolbar', [function() {
      return {
        restrict: 'E',
        templateUrl: 'components/mailer/toolbar/mailerToolbar.html',
        controller: 'mailerToolbarCtrl'
      }
    }])
    .controller('mailerToolbarCtrl', ['$scope',
      function($scope) {
        
      }])
