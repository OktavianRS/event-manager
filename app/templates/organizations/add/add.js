angular.module('eventManager')
    .controller('addOrganizationCtrl', ['$scope', 'companyModel', '$state',
      function($scope, companyModel, $state) {
        console.info('addOrganizationCtrl');
        $scope.myImage = '';
        $scope.myCroppedImage = '';
        $scope.loading = false;
        $scope.header = 'Create new company';
        $scope.labelButton = 'create';

        $scope.createCompany = function(company){
          companyModel.create(
              company.companyName,
              company.description,
              company.address,
              company.phone,
              company.email,
              company.site,
              $scope.myCroppedImage,
              function(data){
                $state.go('listCompany');
              }
          )
        };

        $scope.deleteImage = function(){
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