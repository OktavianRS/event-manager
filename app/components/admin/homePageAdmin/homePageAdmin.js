angular.module('components.homeAdmin', [])
    .directive('homeAdmin', [function() {
      return {
        restrict: 'E',
        templateUrl: 'components/admin/homePageAdmin/homePageAdmin.html'
      }
    }])
    .controller('homeAdminCtrl', ['$scope', 'companyModel', 'eventModel', function($scope, companyModel, eventModel){

        $scope.events = [];

        $scope.eventSetting = {
          show: 10,
          attr: 'name',
          order: 4,
          current: 1,
          total: 0,
          totalPage: 0,
          search: {
            name: '',
            company: '',
            date: ''
          }
        };

        $scope.getEvents = function() {
          eventModel.getAll(
              $scope.eventSetting.order,
              $scope.eventSetting.attr,
              $scope.eventSetting.current,
              $scope.eventSetting.show,
              $scope.eventSetting.search,
              function(data) {
                $scope.events = data.model;
                $scope.eventSetting.total = data.count;
              }
          );
        };
        $scope.getEvents();

    }])

