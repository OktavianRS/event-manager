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
            itemName: 'User',
            itemIcon: 'group',
            itemUrl: 'listUser'
          },
          {
            itemName: 'Event',
            itemIcon: 'event',
            itemUrl: 'listEvent'
          },
          {
            itemName: 'Company',
            itemIcon: 'business',
            itemUrl: 'listCompany'
          },
          {
            itemName: 'Language',
            itemIcon: 'language',
            itemUrl: 'listLanguage'
          },
          {
            itemName: 'Location',
            itemIcon: 'edit-location',
            itemUrl: 'listLocation'
          }
        ];

      }
    ]);
