angular.module('eventManager')
    .controller('roleCtrl', ['$scope', 'crudModel', '$mdDialog', '$mdEditDialog',
      function($scope, crudModel, $mdDialog, $mdEditDialog) {
        $scope.url = 'role';
        $scope.changeAllFlag = false;
        $scope.query = {
          limit: 15,
          page: 1
        };
        $scope.selected = [];

        $scope.options = {
          rowSelection: true,
          multiSelect: true,
          autoSelect: true,
          decapitate: false,
          largeEditDialog: false,
          boundaryLinks: false,
          limitSelect: true,
          pageSelect: true
        };

        $scope.logPagination = function (page, limit) {
          $scope.getIndex();
        }

        $scope.getIndex = function() {
            crudModel.IndexV($scope.url, {
              event_id: $scope.stateParams.eventId,
              page: $scope.query.page-1,
              size: $scope.query.limit
            }, function(data) {
                $scope.Index = data;
            });
        }
        $scope.getIndex();

        $scope.create = function(name) {
            crudModel.CreateV($scope.url, {
              event_id: $scope.stateParams.eventId,
              name: name
            }, function(data) {
                $scope.Index = data;
                $scope.getIndex();
            });
        }

        $scope.update = function(id, value) {
            crudModel.UpdateV($scope.url, {
              id: id,
              event_id: $scope.stateParams.eventId,
              name: value
            }, function(data) {
              console.clear()
              console.log(data);
            });
        }

        $scope.addRole = function(ev) {
          // Appending dialog to document.body to cover sidenav in docs app
          var confirm = $mdDialog.prompt()
            .title('Create a new Role')
            .textContent('')
            .placeholder('Role name')
            .ariaLabel('Role name')
            .initialValue('')
            .targetEvent(ev)
            .ok('Okay!')
            .cancel('Cancel');

          $mdDialog.show(confirm)
            .then(function(result) {
              $scope.create(result);
            }, function() {
              // nothing to do here
            });
        };

        $scope.editField = function (event, index) {
          event.stopPropagation(); // in case autoselect is enabled
          
          var editDialog = {
            modelValue: $scope.Index.model[index].name,
            placeholder: 'Add a comment',
            save: function (input) {
              $scope.update($scope.Index.model[index].id,input.$modelValue);
              $scope.Index.model[index].name = input.$modelValue;
            },
            targetEvent: event,
            title: 'Add a comment',
            validators: {
              'md-maxlength': 30,
              'aria-label': 'Role',
              'required' : ''
            }
          };

          var promise;

            promise = $mdEditDialog.small(editDialog);

          promise.then(function (ctrl) {
            var input = ctrl.getInput();
            
            input.$viewChangeListeners.push(function () {
              input.$setValidity('test', input.$modelValue !== 'test');
            });
          });
        };

        $scope.deleteSelected = function() {
            crudModel.DeleteV($scope.url, {id: $scope.selected}, function(data) {
                $scope.selected = [];
                $scope.getIndex();
            });
        }

        $scope.deleteItem = function(item) {
            crudModel.DeleteV($scope.url, {id: 1}, function(data) {
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