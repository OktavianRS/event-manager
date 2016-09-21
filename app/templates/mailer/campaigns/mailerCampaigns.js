angular.module('eventManager')
    .controller('mailerCampaignsCtrl', ['$scope', 'crudModel', '$mdDialog', '$q',
      function($scope, crudModel, $mdDialog, $q) {
        $scope.url = 'campaign';
        $scope.changeAllFlag = false;

/// table configs

    $scope.selected = [];
    $scope.limitOptions = [5, 10, 15];

    $scope.query = {
        limit: 15,
        page: 1
    };

    $scope.options = {
        rowSelection: true,
        multiSelect: true,
        autoSelect: false,
        decapitate: false,
        largeEditDialog: true,
        boundaryLinks: false,
        limitSelect: true,
        pageSelect: true
    };

    $scope.logPagination = function (page, limit) {
        $scope.query = {
          limit: limit,
          page: page
        };
        $scope.getIndex();
    }

// end of table configs

        $scope.getIndex = function() {
          var deferred = $q.defer();
          $scope.promise = deferred.promise;
            crudModel.Index($scope.url, {
                page: $scope.query.page-1,
                size: $scope.query.limit 
            }, function(data) {
                $scope.Index = data;
                deferred.resolve();
            });
        }
        $scope.getIndex();

        $scope.deleteSelected = function() {
            crudModel.Delete($scope.url, {id: $scope.selected}, function(data) {
                $scope.selected = [];
                $scope.getIndex();
            });
        }

        $scope.deleteItem = function(item) {
            crudModel.Delete($scope.url, {id: item.id}, function(data) {
                $scope.getIndex();
            });
        }
      }
    ]);