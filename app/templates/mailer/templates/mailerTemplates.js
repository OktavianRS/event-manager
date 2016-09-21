angular.module('eventManager')
    .controller('mailerTemplatesCtrl', ['$scope', 'crudModel', '$mdDialog', 'templateModel', '$q',
      function($scope, crudModel, $mdDialog, templateModel, $q) {
        $scope.url = 'template';
        $scope.changeAllFlag = false;

/// table configs

    $scope.selected = [];
    $scope.limitOptions = [5, 10, 15];

    $scope.query = {
        limit: 15,
        page: 1
    };

    $scope.options = {
        rowSelection: true,
        multiSelect: true,
        autoSelect: false,
        decapitate: false,
        largeEditDialog: true,
        boundaryLinks: false,
        limitSelect: true,
        pageSelect: true
    };

    $scope.logPagination = function (page, limit) {
        $scope.query = {
          limit: limit,
          page: page
        };
        $scope.getIndex();
    }

        $scope.getIndex = function() {
          var deferred = $q.defer();
          $scope.promise = deferred.promise;
            crudModel.Index($scope.url, {
              page: $scope.query.page-1,
              size: $scope.query.limit
            }, function(data) {
              data.model = data.model.map(function(v) {
                v.created_at = moment(parseInt(v.created_at), 'X').format('MMMM DD, YYYY hh:mm a');
                return v;
              });
                $scope.Index = data;
                deferred.resolve();
            });
        }
        $scope.getIndex();

        $scope.deleteSelected = function() {
            crudModel.Delete($scope.url, {id: $scope.selected}, function(data) {
                $scope.selected = [];
                $scope.getIndex();
            });
        }

        $scope.getRecipientInsert = function() {
          templateModel.recipientInsert({}, function(data) {
            $scope.recipient = data;
          });
        }
        $scope.getRecipientInsert();

        $scope.deleteItem = function(item) {
            crudModel.Delete($scope.url, {id: item.id}, function(data) {
                $scope.getIndex();
            });
        }

        $scope.showDialog = function(ev, index) {
            $mdDialog.show({
              controller: DialogController,
              templateUrl: 'components/mailer/templatesDialog.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: true,
              locals: {
                data: $scope.Index.model[index]
              }
            })
            .then(function(answer) {
              answer.id ? 
              crudModel.Update($scope.url, {id: answer.id, name: answer.name, user_id: answer.user_id}, function(data) {
                $scope.getIndex();
              }) : 
              crudModel.Create($scope.url, {name: answer.name}, function(data) {
                $scope.getIndex();
              })
            }, function() {
              $scope.status = 'You cancelled the dialog.';
            });
        };

        function DialogController($scope, $mdDialog, data) {
            $scope.data = data;
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
      }
    ]);