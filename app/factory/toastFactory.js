angular.module('factory.toast', [])
    .factory('toast', ['$mdToast',
      function($mdToast) {
        return function(type, text) {
          $mdToast.show(
              $mdToast.simple()
                  .textContent(text)
                  .position('top right')
                  .theme(type + '-toast')
                  .hideDelay(3000)
          );
        }
      }
    ]);
