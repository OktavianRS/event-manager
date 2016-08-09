angular.module('eventManager')
    .controller('companyCtrl', ['$scope', 'companyModel', '$state',
      function($scope, companyModel, $state) {
        console.info('companyCtrl');
        $scope.company = null;

        companyModel.getOne($scope.stateParams.companyId, function(data) {
          $scope.company = data.model;
        });

        $scope.deleteCompany = function(id) {
          companyModel.delete(id, function() {
            $state.go('listCompany');
          })
        };
      }
    ]);
