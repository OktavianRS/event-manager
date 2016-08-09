angular.module('eventManager')
    .controller('oneEventCtrl', ['$scope', 'eventModel', '$state',
      function($scope, eventModel, $state) {
        console.info('oneEventCtrl');
        $scope.event = null;
        $scope.addFlag = false;

        $scope.configComments = {
          currentPage: 1,
          total: 0
        };

        $scope.configAttachments = {
          currentPage: 1,
          totalPages: 0
        };

        $scope.comments = [];
        $scope.attachments = [];

        eventModel.getOne($scope.stateParams.eventId, function(data) {
          $scope.event = data.model;
        });

        eventModel.getComments($scope.stateParams.eventId, function(data) {
          $scope.comments = data.model;
        });

        var getAttach = function() {
          eventModel.getAttachments($scope.stateParams.eventId, $scope.configAttachments.currentPage, function(data) {
            $scope.attachments = data.model;
            $scope.configAttachments.totalPages = data.pages;
          });
        };
        getAttach();


        $scope.addButton = function() {
          $scope.addFlag = true;
        };

        $scope.cancelComment = function(flow) {
          flow.files = [];
          $scope.addFlag = false;
        };

        $scope.saveComment = function(comment, flow) {

          //TODO: comment loader
          var fd = new FormData();
          for(var i = 0; i < flow.files.length; i++) {
            fd.append('file' + i, flow.files[i].file);
          }
          fd.append('text', comment);
          fd.append('obj_id', $scope.stateParams.eventId);

          eventModel.addComment(
              fd,
              function(data) {
                $scope.comments.unshift(data);
                flow.files = [];
                $scope.addFlag = false;
              }
          )
        };

        $scope.deleteEvent = function(id) {
          eventModel.delete(id, function() {
            $state.go('listEvent');
          })
        };

        $scope.uploadAttach = function(attachmentId) {
          eventModel.uploadAttach(attachmentId, function(data) {
            console.info('upload', data);
          })
        };

        $scope.addedNewFile = function(files, event, flow) {
          console.info('f', files);

          files = files.map(function(v) {
            v.file.qqqqq = 'qqqqqqqq';
            return v;
          });
          console.info('flow', flow);
          $scope.loading = true;
          //var reader = new FileReader();
          //reader.onloadend = function() {
          //  $scope.loading = false;
          //  if($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') $scope.$apply();
          //};
          //reader.onload = function(evt) {
          //  $scope.$apply(function($scope) {
          //    $scope.myImage = evt.target.result;
          //  });
          //};
          //reader.readAsDataURL(file.file);
        };

        $scope.deleteAttachment = function(index, flow) {
          flow.files.splice(index, 1);
        };

        $scope.prevAttach = function() {
          $scope.configAttachments.currentPage--;
          console.info($scope.configAttachments);
          getAttach();
        };

        $scope.nextAttach = function() {
          $scope.configAttachments.currentPage++;
          console.info($scope.configAttachments);
          getAttach();
        };
      }
    ]);
