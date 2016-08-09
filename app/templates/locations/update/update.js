angular.module('eventManager')
    .controller('updateLocationCtrl', ['$scope', 'locationModel', '$state',
      function($scope, locationModel, $state) {
        console.info('updateLocationCtrl');
        $scope.header = 'Update location';
        $scope.labelButton = 'update';
        $scope.location = {};
        $scope.coords = null;

        locationModel.getOne($scope.stateParams.locationId, function(data) {
          $scope.location.id = data.model.id;
          $scope.location.locationName = data.model.name;
          if(data.model.longitude) {
            $scope.coords = {
              longitude: data.model.longitude,
              latitude: data.model.latitude
            };
          }
          $scope.location.link = data.model.link;
        });

        $scope.map = {
          center: {
            latitude: 49.58712289778923,
            longitude: 34.54994201660156
          },
          zoom: 2,
          events: {
            click: function(map, eventName, originalEventArgs) {
              var e = originalEventArgs[0];
              var lat = e.latLng.lat(), lon = e.latLng.lng();
              $scope.coords = {
                latitude: lat,
                longitude: lon
              };
              $scope.$apply();
            }
          }
        };

        $scope.deleteCoords = function() {
          $scope.coords = null;
        };

        $scope.saveLocation = function(location) {
          locationModel.update(
              location.id,
              location.locationName,
              ($scope.coords) ? $scope.coords.latitude : null,
              ($scope.coords) ? $scope.coords.longitude : null,
              location.link,
              function(data) {
                $state.go('oneLocation', {locationId: data.id});
              }
          )
        };
      }
    ]);