angular.module('eventManager')
    .controller('listEventCtrl', ['$scope', 'eventModel',
      function($scope, eventModel) {
        console.info('listEventCtrl');
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
        
        $scope.deleteEvent = function(id) {
          eventModel.delete(id, function() {
            $scope.getEvents();
          })
        };
        
        $scope.onReorderEvent = function(sort) {
          if(sort[0] == '-') {
            $scope.eventSetting.attr = sort.slice(1);
            $scope.eventSetting.order = 3;
          } else {
            $scope.eventSetting.attr = sort;
            $scope.eventSetting.order = 4;
          }
          $scope.getEvents();
        };
        
        $scope.onPaginateEvent = function(page, pageSize) {
          $scope.eventSetting.currentPage = page;
          $scope.eventSetting.show = pageSize;
          $scope.getEvents();
        };
        
        $scope.searchEvent = function(name, searchModel) {
          $scope.eventSetting.search[name] = searchModel;
          $scope.getEvents();
        };
      }
    ]);