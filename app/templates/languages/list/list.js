angular.module('eventManager')
    .controller('listLanguageCtrl', ['$scope', 'languageModel', '$state', '$mdDialog',
      function($scope, languageModel, $state, $mdDialog) {
        console.info('listLanguageCtrl');
        $scope.languages = [];
        $scope.languageSetting = {
          show: 10,
          attr: 'name',
          order: 4,
          current: 1,
          total: 0,
          totalPage: 0,
          search: {
            name: '',
            code: ''
          }
        };

        $scope.getLanguages = function() {
          languageModel.getAll(
              $scope.languageSetting.order,
              $scope.languageSetting.attr,
              $scope.languageSetting.current,
              $scope.languageSetting.show,
              $scope.languageSetting.search,
              function(data) {
                $scope.languages = data.model;
                $scope.languageSetting.total = data.count;
              }
          );
        };
        $scope.getLanguages();

        $scope.showLanguageInfo = function(ev, languageId) {
          languageModel.getOne(languageId, function(data) {
            $mdDialog.show({
              controller: DialogController,
              templateUrl: 'components/viewCard/viewCard.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: false,
              locals: {
                languageInfo: data.model
              }
            });
          });
        }

        function DialogController($scope, $mdDialog, languageInfo) {
          $scope.data = languageInfo;
          $scope.hide = function() {
            $mdDialog.hide();
          };
          $scope.cancel = function() {
            $mdDialog.cancel();
          };
          $scope.answer = function(answer) {
            $mdDialog.hide(answer);
          };
        }

        $scope.deleteLanguage = function(id) {
          languageModel.delete(id, function() {
            $scope.getLanguages();
          })
        };

        $scope.onReorderLanguage = function(sort) {
          if(sort[0] == '-') {
            $scope.languageSetting.attr = sort.slice(1);
            $scope.languageSetting.order = 3;
          } else {
            $scope.languageSetting.attr = sort;
            $scope.languageSetting.order = 4;
          }
          $scope.getLanguages();
        };

        $scope.onPaginateLanguage = function(page, pageSize) {
          $scope.languageSetting.currentPage = page;
          $scope.languageSetting.show = pageSize;
          $scope.getLanguages();
        };

        $scope.searchLanguage = function(name, searchModel) {
          $scope.languageSetting.search[name] = searchModel;
          $scope.getLanguages();
        };
      }
    ]);