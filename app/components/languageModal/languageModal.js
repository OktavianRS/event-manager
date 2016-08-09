angular.module('components.languageModal', [])
    .controller('languageModalCtrl', ['$scope', 'languageModel', '$mdDialog', 'text',
      function($scope, languageModel, $mdDialog, text) {
        $scope.language = {
          name: text
        };

        $scope.saveLanguage = function(language) {
          languageModel.create(
              language.name,
              language.link,
              function(data) {
                $mdDialog.hide(data);
              }
          )
        };

        $scope.close = function() {
          $mdDialog.cancel();
        };
      }
    ]);