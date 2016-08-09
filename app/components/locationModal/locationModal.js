angular.module('components.locationModal', [])
    .controller('locationModalCtrl', ['$scope', 'locationModel', '$mdDialog', 'text',
      function($scope, locationModel, $mdDialog, text) {
        $scope.location={
          name: text
        };
        $scope.coords = null;

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
              location.name,
              ($scope.coords)? $scope.coords.latitude : null,
              ($scope.coords)? $scope.coords.longitude : null,
              location.link,
              function(data) {
                $mdDialog.hide(data);
              }
          )
        };

        $scope.close = function() {
          $mdDialog.cancel();
        };
      }
    ]);