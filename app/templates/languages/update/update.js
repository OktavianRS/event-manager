angular.module('eventManager')
    .controller('updateLanguageCtrl', ['$scope', 'languageModel', '$state',
      function($scope, languageModel, $state) {
        console.info('updateLanguageCtrl');
        $scope.header = 'Update language';
        $scope.labelButton = 'update';
        $scope.language = {};

        languageModel.getOne($scope.stateParams.languageId, function(data){
          $scope.language.id = data.model.id;
          $scope.language.languageName = data.model.name;
          $scope.language.code = data.model.code;
        });

        $scope.saveLanguage = function(language){
          languageModel.update(
              language.id,
              language.languageName,
              language.code,
              function(data){
                $state.go('oneLanguage', {languageId: data.id});
              }
          )
        };
      }
    ]);