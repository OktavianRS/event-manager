angular.module('eventManager')
    .controller('oneEventCtrl', ['url', '$scope', 'eventModel', '$state', '$mdBottomSheet', '$mdDialog', '$sessionStorage',
      function(url, $scope, eventModel, $state, $mdBottomSheet, $mdDialog, $sessionStorage) {
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

        $scope.getEvent = function() {
          eventModel.getOne($scope.stateParams.eventId, function(data) {
            $scope.event = data.model;
            $scope.uploadAllUrl = url.event.uploadAllAttach + '?access-token=' + $sessionStorage.auth_key + '&obj_id=' + $scope.stateParams.eventId + '&type=all&obj_type=event_attachment';
          });
        }
        $scope.getEvent();

        $scope.getComments = function() {
          eventModel.getComments($scope.stateParams.eventId, function(data) {
            $scope.comments = data.model;
          });
        }
        $scope.getComments();

        var getAttach = function() {
          eventModel.getAttachments($scope.stateParams.eventId, $scope.configAttachments.currentPage, function(data) {
            $scope.attachments = data.model;
            $scope.configAttachments.totalPages = data.pages;
          });
        };
        getAttach();

        $scope.showBottomListAtachment = function(item) {
          $scope.currentItem = item;
          $mdBottomSheet.show({
            templateUrl: `components/bottomListAtachment/bottomListAtachment.html`,
            controller: 'bottomListAtachmentCtrl',
            locals: {
              currentItem: item,
              uploadUrl: url.event.uploadOneAttach + '?access-token=' + $sessionStorage.auth_key + '&id=' + $scope.currentItem.id
            }
          }).then(function(clickedItem) {
            clickedItem.name === 'View' ? $scope.showAtachmentModal() : false;
            clickedItem.name === 'Upload' ? $scope.uploadOneAtachment() : false;
            clickedItem.name === 'Delete' ? $scope.removeOneAttach() : false;
          });
        }

        $scope.showAtachmentModal = function(ev) {
          $mdDialog.show({
            controller: DialogController,
            templateUrl: 'components/atachmentViewModal/atachmentViewModal.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true,
            locals: {
              item: $scope.currentItem
            }
          })
        }

        function DialogController($scope, $mdDialog, item) {
          $scope.item = item;
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
                getAttach();
                $scope.getEvent();
                $scope.getComments();
              }
          )
        };

        $scope.deleteEvent = function(id) {
          eventModel.delete(id, function() {
            $state.go('listEvent');
          })
        };

        $scope.removeOneAttach = function() {
          eventModel.deleteOneAttach($scope.currentItem.id, function(data) {
            getAttach();
            $scope.getEvent();
            $scope.getComments();
          });
        }

        $scope.uploadAttach = function(attachmentId) {
          eventModel.uploadAttach(attachmentId, function(data) {
            console.info('upload', data);
            $scope.getEvent();
            $scope.getComments();
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

        $scope.deleteOneAttachment = function() {
          eventModel($scope.currentItem.id, function(data) {
            $scope.getEvent();
            $scope.getComments();
          })
        }

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
    ])
    .controller('bottomListAtachmentCtrl', ['$scope', '$mdBottomSheet', 'uploadUrl', 'currentItem',
          function($scope, $mdBottomSheet, uploadUrl, currentItem) {
        $scope.uploadUrl = uploadUrl;
        $scope.currentItem = currentItem;
        $scope.items = [
          { name: 'View', icon: 'view', show: true},
          { name: 'Upload', icon: 'upload', show: true },
          { name: 'Delete', icon: 'delete', show: true }
        ];
        if($scope.currentItem.type !== 'image') {
          $scope.items[0].show = false;
        }
        $scope.listItemClick = function($index) {
          var clickedItem = $scope.items[$index];
          $mdBottomSheet.hide(clickedItem);
        };
      }])