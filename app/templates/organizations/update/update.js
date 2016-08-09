angular.module('eventManager')
    .controller('updateOrganizationCtrl', ['$scope', 'companyModel', '$state',
      function($scope, companyModel, $state) {
        console.info('updateOrganizationCtrl');
        $scope.myImage = '';
        $scope.myCroppedImage = '';
        $scope.loading = false;
        $scope.header = 'Update company';
        $scope.labelButton = 'update';
        $scope.newCompany = {};

        companyModel.getOne($scope.stateParams.companyId, function(data){
          $scope.newCompany.id = data.model.id;
          $scope.newCompany.oldImage = data.model.image;
          $scope.newCompany.companyName = data.model.name;
          $scope.newCompany.address = data.model.address;
          $scope.newCompany.phone = data.model.phone;
          $scope.newCompany.description = data.model.description;
          $scope.newCompany.email = data.model.email;
          $scope.newCompany.site = data.model.link;
        });

        $scope.createCompany = function(company){
          companyModel.update(
              company.id,
              company.companyName,
              company.description,
              company.address,
              company.phone,
              company.email,
              company.site,
              $scope.myCroppedImage,
              function(data){
                $state.go('^.oneCompany', {companyId: data.id});
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