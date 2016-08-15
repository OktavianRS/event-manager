angular.module('eventManager')
    .controller('addUserCtrl', ['$scope', 'userModel', 'companyModel', '$state', '$mdDialog',
      function($scope, userModel, companyModel, $state, $mdDialog) {
        console.info('addUserCtrl');
        $scope.myImage = '';
        $scope.myCroppedImage = '';
        $scope.loading = false;
        $scope.header = 'Create new user';
        $scope.labelButton = 'create';

        $scope.userRoles = [];
        $scope.companies = [];

        companyModel.getAllList(function(data) {
          $scope.companies = data;
        });

        userModel.getRoleList(function(data) {
          $scope.userRoles = data;
        });

        $scope.deleteImage = function(){
          $scope.myImage = '';
          $scope.myCroppedImage = '';
        };

        $scope.saveUser = function(newUser) {
          console.info('user', newUser);
          userModel.create(
              newUser.firstName,
              newUser.lastName,
              newUser.position,
              newUser.email,
              $scope.myCroppedImage,
              newUser.role,
              newUser.organizationId,
              newUser.userPassword,
              function(data) {
                $state.go('listUser');
              }
          )
        };

        $scope.addedNewFile = function(file, event, flow) {
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