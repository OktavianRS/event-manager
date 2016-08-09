angular.module('eventManager')
    .controller('addLanguageCtrl', ['$scope', 'languageModel', '$state',
      function($scope, languageModel, $state) {
        console.info('addLanguageCtrl');
        $scope.header = 'Create new language';
        $scope.labelButton = 'create';

        $scope.saveLanguage = function(language){
          languageModel.create(
              language.languageName,
              language.code,
              function(data){
                $state.go('oneLanguage', {languageId: data.id});
              }
          )
        };
      }
    ]);