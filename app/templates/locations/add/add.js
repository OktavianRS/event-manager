angular.module('eventManager')
    .controller('addLocationCtrl', ['$scope', 'locationModel', '$state',
      function($scope, locationModel, $state) {
        console.info('addLocationCtrl');
        $scope.header = 'Create new location';
        $scope.labelButton = 'create';
        $scope.coords = null;
        $scope.show = false;

        $scope.showMap = function() {
          $scope.show = true;
        }

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
          locationModel.create(
              location.locationName,
              ($scope.coords)? $scope.coords.latitude : null,
              ($scope.coords)? $scope.coords.longitude : null,
              location.link,
              function(data) {
                $state.go('listLocation');
              }
          )
        };
      }
    ]);