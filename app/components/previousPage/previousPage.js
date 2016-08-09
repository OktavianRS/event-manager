angular.module('component.previousPage', [
      'ui.router',
      'ngStorage'
    ])
    .directive('previousPageSet', function($state, $stateParams, $sessionStorage) {
      return {
        restrict: 'A',
        link: function($scope, $element) {
          $element.on('click', function() {
            $sessionStorage.pps = $state.current.name;
            $sessionStorage.ppp = $state.params;
          })
        }
      }
    })
    .directive('previousPageGet', function($state, $stateParams, $sessionStorage) {
      return {
        restrict: 'A',
        link: function($scope, $element) {
          if(!$sessionStorage.pps) {
            $element.remove();
          }
          $element.on('click', function() {
            if($sessionStorage.pps) {
              $state.go($sessionStorage.pps, $sessionStorage.ppp);
              delete $sessionStorage.pps;
              delete $sessionStorage.ppp;
            }
          })
        }
      }
    });