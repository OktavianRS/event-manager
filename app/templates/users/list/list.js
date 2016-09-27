angular.module('eventManager')
    .controller('listUserCtrl', ['$scope', 'userModel', '$state', '$mdDialog', '$mdMedia',
      function($scope, userModel, $state, $mdDialog, $mdMedia) {
        console.info('listUserCtrl');
        $scope.users = [];
        $scope.userSetting = {
          show: 10,
          attr: 'first_name',
          order: 4,
          current: 1,
          total: 0,
          totalPage: 0,
          search: {
            firstName: '',
            lastName: '',
            email: '',
            position: '',
            organization: '',
            role: ''
          }
        };

        $scope.getUsers = function() {
          userModel.getAll(
              $scope.userSetting.order,
              $scope.userSetting.attr,
              $scope.userSetting.current,
              $scope.userSetting.show,
              $scope.userSetting.search,
              function(data) {
                $scope.users = data.model;
                $scope.userSetting.total = data.count;
              }
          );
        };
        $scope.getUsers();

        // $scope.showUserInfo = function(ev, userId) {
        //   userModel.getOne(userId, function(data) {
        //     $mdDialog.show({
        //       controller: DialogController,
        //       templateUrl: 'components/viewCard/viewCard.html',
        //       parent: angular.element(document.body),
        //       targetEvent: ev,
        //       clickOutsideToClose:true,
        //       fullscreen: false,
        //       locals: {
        //         userInfo: data.model
        //       }
        //     });
        //   });
        // }

        function DialogController($scope, $mdDialog, userInfo) {
          $scope.data = userInfo;
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

        $scope.deleteUser = function(id) {
          userModel.delete(id, function() {
            $scope.getUsers();
          })
        };

        $scope.onReorderUser = function(sort) {
          if(sort[0] == '-') {
            $scope.userSetting.attr = sort.slice(1);
            $scope.userSetting.order = 3;
          } else {
            $scope.userSetting.attr = sort;
            $scope.userSetting.order = 4;
          }
          $scope.getUsers();
        };

        $scope.onPaginateUser = function(page, pageSize) {
          $scope.userSetting.currentPage = page;
          $scope.userSetting.show = pageSize;
          $scope.getUsers();
        };

        $scope.searchUser = function(name, searchModel) {
          $scope.userSetting.search[name] = searchModel;
          $scope.getUsers();
        };

      }
    ]);