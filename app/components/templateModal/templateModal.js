angular.module('components.templateModal', [])
    .controller('templateModalCtrl', ['$scope', 'templateModel', '$mdDialog', 'templateId', '$sce',
      function($scope, templateModel, $mdDialog, templateId, $sce) {
        $scope.template = null;
        $scope.sce = $sce;

        templateModel.getOne(templateId, function(data) {
          $scope.template = data;
        });

        $scope.close = function() {
          $mdDialog.cancel();
        };
      }
    ])
    .controller('templatePreviewModalCtrl', ['$scope', '$mdDialog', 'template', '$sce',
      function($scope, $mdDialog, template, $sce) {
        $scope.template = template;
        $scope.sce = $sce;

        $scope.close = function() {
          $mdDialog.cancel();
        };
      }
    ]);