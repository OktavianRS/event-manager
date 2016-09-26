angular.module('eventManager')
    .controller('importTableCtrl', ['$scope', 'panelModel',
      function($scope, panelModel) {
        $scope.addedNewFile = function(file, event, flow) {
          if(!(file.file.type == 'application/vnd.ms-excel' || file.file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
            toast('error', 'File must be format .csv, .xls or .xlsx');
            event.preventDefault();
            return false;
          }
          var fd = new FormData();
          fd.append('file', file.file);
          fd.append('_eventId', $scope.stateParams.eventId);
          panelModel.import(fd, function(data) {
            $scope.importSubscribers = data;
            flow.files = [];
            $scope.uploadFlag = false;
          });
        };
      }])