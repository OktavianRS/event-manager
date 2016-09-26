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
          panelModel.import({
            file: fd,
            _eventId: $scope.stateParams.eventId
          }, function(data) {
            $scope.importSubscribers = data;
            flow.files = [];
            $scope.uploadFlag = false;
          });
        };

        $scope.Chart = {};
        $scope.labelsChart = [
          "Sent",
          "Queued",
          "Failed",
        ];
        $scope.dataChart = [];
        $scope.colorChart = [
          '#9E9E9E',
          '#FF9800',
          '#F44336',
          '#8BC34A',
          '#00BCD4',
          '#212121'
        ];

            $scope.Chart.sent = {
              color: ['#009688', '#363641'],
              labels: ["Sent", "Total"],
              data: [
                data.sent
,                data.total
              ]
            };

      }])