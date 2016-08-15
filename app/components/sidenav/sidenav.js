angular.module('components.sidenav', [])
    .directive('eventSidenav', [function() {
      return {
        restrict: 'E',
        templateUrl: 'components/sidenav/sidenav.html',
        controller: 'sidenavCtrl'
      }
    }])
    .controller('sidenavCtrl', ['$scope', '$state', 'userModel',
      function($scope, $state, userModel) {
        $scope.$state = $state;
        $scope.colapse = false;
        $scope.logout = function(){
          $state.go('login');
          userModel.logout();
        }

        $scope.getCurrentUser = function() {
            userModel.getCurrent(function(res) {
                $scope.user = res;
            })
        }

        $scope.colapseMenu = function() {
          $scope.colapse = $scope.colapse ? false : true;
          $scope.class = $scope.colapse ? 'colapsed' : 'nonColapsed';
        }

        $scope.menuCfg = [
          {
            itemName: 'Dashboard',
            itemIcon: 'home',
            itemUrl: 'home'
          },
          {
            itemName: 'Users',
            itemIcon: 'group',
            itemUrl: 'listUser'
          },
          {
            itemName: 'Events',
            itemIcon: 'event',
            itemUrl: 'listEvent'
          },
          {
            itemName: 'Companies',
            itemIcon: 'business',
            itemUrl: 'listCompany'
          },
          {
            itemName: 'Languages',
            itemIcon: 'language',
            itemUrl: 'listLanguage'
          },
          {
            itemName: 'Locations',
            itemIcon: 'edit-location',
            itemUrl: 'listLocation'
          }
        ];

      }
    ]);
