angular.module('components.listsModal', [])
    .controller('listsModalCtrl', ['$scope', 'listModel', '$mdDialog', 'listId', 'crudModel',
      function($scope, listModel, $mdDialog, listId, crudModel) {
        $scope.changeList = null;

        $scope.listSortBy = '-created_at';
        $scope.listSetting = {
          show: 5,
          attr: 'created_at',
          order: 'desc',
          current: 1,
          total: 0,
          totalPage: 0
        };

        $scope.lists = [];

        $scope.getIndex = function() {
            crudModel.Index('list', {withoutList: listId}, function(data) {
              data.model = data.model.map(function(v) {
                v.created_at = moment(parseInt(v.created_at), 'X').format('MMMM DD, YYYY hh:mm a');
                v.updated_at = moment(parseInt(v.updated_at), 'X').format('MMMM DD, YYYY hh:mm a');
                return v;
              });
              $scope.lists = data.model;
            });
        }
        $scope.getIndex();

        $scope.prev = function() {
          $scope.listSetting.current--;
          $scope.getLists();
        };

        $scope.next = function() {
          $scope.listSetting.current++;
          $scope.getLists();
        };

        $scope.changeSort = function(sort) {
          if(sort[0] == '-') {
            $scope.listSetting.attr = sort.slice(1);
            $scope.listSetting.order = 'desc';
          } else {
            $scope.listSetting.attr = sort;
            $scope.listSetting.order = 'asc';
          }
          $scope.getLists();
        };

        $scope.close = function() {
          $mdDialog.cancel();
        };

        $scope.save = function(changeList) {
          $mdDialog.hide(changeList);
        }
      }
    ]);