angular.module('eventManager')
    .controller('addEventCtrl', ['$scope', 'eventModel', 'companyModel', 'locationModel', 'languageModel', '$state', '$mdDialog',
      function($scope, eventModel, companyModel, locationModel, languageModel, $state, $mdDialog) {
        console.info('addEventCtrl');
        $scope.myImage = '';
        $scope.myCroppedImage = '';
        $scope.loading = false;
        $scope.header = 'Create new event';
        $scope.labelButton = 'create';
        $scope.locations = [];
        $scope.languages = [];
        $scope.companies = [];
        $scope.event = {};
        $scope.event.date = moment().format('DD/MM/YYYY');

        companyModel.getAllList(function(data) {
          $scope.companies = data;
        });

        $scope.saveEvent = function(event) {
          $scope.date = moment.utc(event.date).format('DD/MM/YYYY')
          eventModel.create(
              event.eventName,
              moment($scope.date + ' ' + event.time, 'DD/MM/YYYY HH:mm', true).format('X'),
              event.company,
              $scope.languages.map(function(v){
                return v.id;
              }),
              $scope.locations.map(function(v){
                return v.id;
              }),
              $scope.myCroppedImage,
              function(data) {
                $state.go('oneEvent', {eventId: data.id});
              }
          )
        };

        $scope.createLocation = function(text, ev, el) {
          $mdDialog.show({
            controller: "locationModalCtrl",
            templateUrl: 'components/locationModal/locationModal.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
              text: text
            }
          }).then(function(location){
            $scope.event.locationId = null;
            $scope.searchTextLocation = null;
            $scope.locations.push(location);
          });
        };

        $scope.createLanguage = function(text, ev) {
          $mdDialog.show({
            controller: "languageModalCtrl",
            templateUrl: 'components/languageModal/languageModal.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
              text: text
            }
          }).then(function(language){
            $scope.event.languageId = null;
            $scope.searchTextLanguage = null;
            $scope.languages.push(language);
          });
        };

        $scope.addLanguage = function(language) {
          $scope.event.languageId = null;
          $scope.searchTextLanguage = null;
          $scope.languages.push(language);
        };

        $scope.deleteLanguage = function(index) {
          $scope.languages.splice(index, 1);
        };

        $scope.addLocation = function(location) {
          $scope.event.locationId = null;
          $scope.searchTextLocation = null;
          $scope.locations.push(location);
        };

        $scope.deleteLocation = function(index) {
          console.info(index);
          $scope.locations.splice(index, 1);
        };

        $scope.querySearchLocation = function(query) {
          return locationModel.getAllList(query).promise;
        };

        $scope.querySearchLanguage = function(query) {
          return languageModel.getAllList(query).promise;
        };

        $scope.deleteImage = function() {
          $scope.myImage = '';
          $scope.myCroppedImage = '';
        };

        $scope.addedNewFile = function(file, event) {
          if(file.file.type.indexOf('image') == -1) {
            toast('error', "File must be image (*.png, *.jpg, *.bmp)");
            event.preventDefault();
            return false;
          }
          $scope.loading = true;
          var reader = new FileReader();
          reader.onloadend = function() {
            $scope.loading = false;
            if($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') $scope.$apply();
          };
          reader.onload = function(evt) {
            $scope.$apply(function($scope) {
              $scope.myImage = evt.target.result;
            });
          };
          reader.readAsDataURL(file.file);
        };
      }
    ]);