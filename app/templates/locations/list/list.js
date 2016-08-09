angular.module('eventManager')
    .controller('listLocationCtrl', ['$scope', 'locationModel', '$state', '$mdDialog', '$mdMedia',
      function($scope, locationModel, $state, $mdDialog, $mdMedia) {
        console.info('listLocationCtrl');
        $scope.locations = [];
        $scope.locationSetting = {
          show: 10,
          attr: 'name',
          order: 4,
          current: 1,
          total: 0,
          totalPage: 0,
          search: {
            name: ''
          }
        };

        $scope.getLocations = function() {
          locationModel.getAll(
              $scope.locationSetting.order,
              $scope.locationSetting.attr,
              $scope.locationSetting.current,
              $scope.locationSetting.show,
              $scope.locationSetting.search,
              function(data) {
                $scope.locations = data.model;
                $scope.locationSetting.total = data.count;
              }
          );
        };
        $scope.getLocations();

        $scope.showLocationInfo = function(ev, locationId) {
          locationModel.getOne(locationId, function(data) {
            $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
              controller: DialogController,
              templateUrl: 'components/viewCard/viewCard.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: useFullScreen,
              locals: {
                locationInfo: data.model,
                coordsInfo: {
                  longitude: data.model.longitude,
                  latitude: data.model.latitude
                },
                mapInfo: {
                  center: {
                    longitude: data.model.longitude,
                    latitude: data.model.latitude
                  },
                  zoom: 11
                }
              }
            });
          });
        }

        function DialogController($scope, $mdDialog, locationInfo, coordsInfo, mapInfo) {
          $scope.data = locationInfo;
          $scope.coords = coordsInfo;
          $scope.map = mapInfo;
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

        $scope.deleteLocation = function(id) {
          locationModel.delete(id, function() {
            $scope.getLocations();
          })
        };

        $scope.onReorderLocation = function(sort) {
          if(sort[0] == '-') {
            $scope.locationSetting.attr = sort.slice(1);
            $scope.locationSetting.order = 3;
          } else {
            $scope.locationSetting.attr = sort;
            $scope.locationSetting.order = 4;
          }
          $scope.getLocations();
        };

        $scope.onPaginateLocation = function(page, pageSize) {
          $scope.locationSetting.currentPage = page;
          $scope.locationSetting.show = pageSize;
          $scope.getLocations();
        };

        $scope.searchLocation = function(name, searchModel) {
          $scope.locationSetting.search[name] = searchModel;
          $scope.getLocations();
        };
      }
    ]);