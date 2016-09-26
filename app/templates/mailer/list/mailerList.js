angular.module('eventManager')
    .controller('mailerListCtrl', ['$scope', 'listModel', '$mdDialog', 'toast', '$stateParams', 'crudModel', 'eventModel', '$q',
      function($scope, listModel, $mdDialog, toast, $stateParams, crudModel, eventModel, $q) {
        $scope.tabSelect = 0;
        $scope.tabSelectSm = 0;
        $scope.changed = [];
        $scope.changeAllFlag = false;
        $scope.uploadFlag = true;
        $scope.targetEvevnt_id = '';
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

        $scope.Chart = {};
        $scope.labelsChart = [
          "Created",
          "Updated",
          "Error"
        ];
        $scope.dataChart = [];
        $scope.colorChart = [
          '#FF9800',
          '#8BC34A',
          '#00BCD4',
        ];

    $scope.limitOptions = [5, 10, 15];


// Pagination configs for subs
    $scope.querySubs = {
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

    $scope.logPaginationSubs = function (page, limit) {
        $scope.querySubs = {
          limit: limit,
          page: page
        };
        $scope.getList();
    }

/// end of subs configs

// list pagination configs
    $scope.mergeChanged = [];

    $scope.logPaginationList = function (page, limit) {
        $scope.queryList = {
          limit: limit,
          page: page
        };
        $scope.getIndex();
    }

    $scope.queryList = {
        limit: 15,
        page: 1
    };

    // end of list configs

    // Event pagination configs
    $scope.logPaginationEvent = function (page, limit) {
        $scope.queryEvent = {
          limit: limit,
          page: page
        };
        $scope.getEvents();
    }

    $scope.queryEvent = {
        limit: 15,
        page: 1
    };

    // end of Event configs

        $scope.listSortBy = '-created_at';
        $scope.listSetting = {
          show: 10,
          attr: 'created_at',
          order: 'desc',
          current: 1,
          total: 0,
          totalPage: 0
        };
        $scope.pageSetting = {
          show: 10,
          attr: 'created_at',
          order: 'desc',
          current: 1,
          total: 0,
          totalPage: 0
        };

        $scope.lists = [];
        $scope.subscribers = [];
        $scope.importSubscribers = [];

        $scope.getEvents = function() {
          var deferred = $q.defer();
          $scope.promise = deferred.promise;
          eventModel.getAllForMailer(
              {
                list_id: $scope.stateParams.id,
                page: $scope.queryEvent.page-1,
                size: $scope.queryEvent.limit
              },
              function(data) {
                data.model = data.model.map(function(v) {
                  v.date = moment(parseInt(v.date), 'X').format('MMMM DD, YYYY hh:mm a');
                  return v;
                });
                $scope.events = data.model;
                $scope.eventSetting.total = data.count;
                deferred.resolve();
              }
          );
        };
        $scope.getEvents();

        $scope.getList = function() {
          var deferred = $q.defer();
          $scope.promise = deferred.promise;
          listModel.getOne(
              {
                list_id: $scope.stateParams.id,
                page: $scope.querySubs.page-1,
                size: $scope.querySubs.limit
              },
              function(data) {
                data.model = data.model.map(function(v) {
                  v.created_at = moment(parseInt(v.created_at), 'X').format('MMMM DD, YYYY hh:mm a');
                  v.updated_at = moment(parseInt(v.updated_at), 'X').format('MMMM DD, YYYY hh:mm a');
                  return v;
                });
                $scope.list = data.model;
                $scope.subscribers = data.model;
                $scope.subs = data;
                deferred.resolve();
              }
          );
        };
        $scope.getList();

        $scope.getIndex = function() {
          var deferred = $q.defer();
          $scope.promise = deferred.promise;
            crudModel.Index('list', {
              withoutList: $scope.stateParams.id,
              page: $scope.queryList.page-1,
              size: $scope.queryList.limit
            }, function(data) {
              data.model = data.model.map(function(v) {
                v.created_at = moment(parseInt(v.created_at), 'X').format('MMMM DD, YYYY hh:mm a');
                v.updated_at = moment(parseInt(v.updated_at), 'X').format('MMMM DD, YYYY hh:mm a');
                return v;
              });
              $scope.lists = data.model;
              $scope.listPag = data;
              deferred.resolve();
            });
        }
        $scope.getIndex();

        $scope.selectedTab = function(index) {
          $scope.tabSelect = index;
          $scope.tabSelectSm = index;
        };

        $scope.changeOne = function(id) {
          var index = $scope.changed.indexOf(id);
          if(index == -1) {
            $scope.changed.push(id);
          } else {
            $scope.changed.splice(index, 1);
          }
          if($scope.changed.length == $scope.subscribers.length) {
            $scope.changeAllFlag = true;
          } else {
            $scope.changeAllFlag = false;
          }
        };

        $scope.changeAll = function() {
          if($scope.changeAllFlag) {
            $scope.changed = $scope.subscribers.map(function(v) {
              v.changed = $scope.changeAllFlag;
              return v.id;
            })
          } else {
            $scope.changed = [];
            $scope.subscribers.map(function(v) {
              v.changed = $scope.changeAllFlag;
            })
          }
        };

        $scope.addSubsFromEvent = function(id) {
          listModel.addSubsFromEvent({list_id: $scope.stateParams.id, targetList_id: id}, function(data) {

          })
        }

        $scope.save = function(subscriber) {
          listModel.saveSubscriber(
              $scope.stateParams.id,
              subscriber.email,
              subscriber.firstName,
              subscriber.lastName,
              function() {
                $scope.getList();
                $scope.getIndex();
                subscriber.email = null;
                subscriber.firstName = null;
                subscriber.lastName = null;
                $scope.addForm.$setPristine();
                $scope.addForm.$setUntouched();
                $scope.addForm.email.$setUntouched();
                $scope.addForm.firstName.$setUntouched();
                $scope.addForm.lastName.$setUntouched();
                if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') $scope.$apply();
              }
          );
        };

        $scope.delete = function() {
          console.log($scope.changed);
          listModel.deleteSubscriber({id: $scope.changed}, function() {
            $scope.getList();
            $scope.getIndex();
            $scope.changed = [];
            $scope.changeAllFlag = false;
          })
        };

        $scope.export = function() {
          listModel.export($scope.stateParams.id, function(data) {
            document.location.href = data;
          });
        };


        $scope.addedNewFile = function(file, event, flow) {
          if(!(file.file.type == 'application/vnd.ms-excel' || file.file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
            toast('error', 'File must be format .csv, .xls or .xlsx');
            event.preventDefault();
            return false;
          }
          var fd = new FormData();
          fd.append('file', file.file);
          fd.append('list_id', $scope.stateParams.id);
          listModel.import(fd, function(data) {
            $scope.importSubscribers = data;
            $scope.Chart.sent = {
              color: ['#009688', '#363641'],
              labels: ["Created", "Updated", "Error"],
              data: [
                data.create,
                data.update,
                data.error
              ]
            };
            flow.files = [];
            $scope.uploadFlag = false;
            $scope.getList();
          });
        };

        $scope.saveImport = function(){
          listModel.saveImport(
              $scope.stateParams.id,
              $scope.importSubscribers,
              function(){
                $scope.tabSelect = 0;
                $scope.tabSelectSm = 0;
                $scope.uploadFlag = true;
                $scope.importSubscribers = [];
                $scope.getList();
                $scope.getIndex();
              }
          )
        };

        $scope.cancelImport = function(){
          $scope.importSubscribers = [];
          $scope.uploadFlag = true;
        };

        $scope.removeImportSubscribers = function(index){
          $scope.importSubscribers.splice(index, 1);
          if(!$scope.importSubscribers.length){
            $scope.uploadFlag = true;
          }
        };

        $scope.changeMerge = function(id) {
          var index = $scope.mergeChanged.indexOf(id);
          if(index == -1) {
            $scope.mergeChanged.push(id);
          } else {
            $scope.mergeChanged.splice(index, 1);
          }
        };

        $scope.merge = function() {
          listModel.merge($scope.stateParams.id, $scope.mergeChanged, function() {
            $scope.getList();
            $scope.getIndex();
            $scope.tabSelect = 0;
            $scope.tabSelectSm = 0;
            $scope.mergeChanged = [];
          })
        };

        $scope.copy = function(ev) {
          $mdDialog.show({
            controller: "listsModalCtrl",
            templateUrl: 'components/listsModal/listsModal.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
              listId: $scope.stateParams.id
            }
          }).then(function(targetListId) {
            listModel.copySubscriber(
                {
                  targetList_id: targetListId,
                  ids: $scope.changed
                },
                function(){
                  $scope.getList();
                  $scope.getIndex();
                  $scope.changed = [];
                  $scope.changeAllFlag = false;
                }
            )
          });
        };

        $scope.move = function(ev) {
          $mdDialog.show({
            controller: "listsModalCtrl",
            templateUrl: 'components/listsModal/listsModal.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
              listId: $scope.stateParams.id
            }
          }).then(function(targetListId) {
            listModel.moveSubscriber({
                  targetList_id: targetListId,
                  ids: $scope.changed
                },
                function(){
                  $scope.getList();
                  $scope.getIndex();
                  $scope.changed = [];
                  $scope.changeAllFlag = false;
                }
            )
          });
        };

        $scope.onReorder = function(sort) {
          if(sort[0] == '-') {
            $scope.pageSetting.attr = sort.slice(1);
            $scope.pageSetting.order = 'desc';
          } else {
            $scope.pageSetting.attr = sort;
            $scope.pageSetting.order = 'asc';
          }
          $scope.getList();
          $scope.getIndex();
        };

        $scope.onPaginate = function(page, pageSize) {
          $scope.pageSetting.currentPage = page;
          $scope.pageSetting.show = pageSize;
          $scope.getList();
          $scope.getIndex();
        }
      }
    ]);