angular.module('eventManager')
    .controller('updateUserCtrl', ['$scope', 'userModel', 'companyModel', '$state',
      function($scope, userModel, companyModel, $state) {
        console.info('updateUserCtrl');
        $scope.myImage = '';
        $scope.myCroppedImage = '';
        $scope.loading = false;
        $scope.header = 'Update user';
        $scope.labelButton = 'update';
        $scope.newUser = {};

        $scope.userRoles = [];
        $scope.companies = [];

        companyModel.getAllList(function(data) {
          $scope.companies = data;
        });

        userModel.getRoleList(function(data) {
          $scope.userRoles = data;
        });

        userModel.getOne($scope.stateParams.userId, function(data){
          $scope.newUser.id = data.model.id;
          $scope.newUser.oldImage = data.model.image;
          $scope.newUser.firstName = data.model.first_name;
          $scope.newUser.lastName = data.model.last_name;
          $scope.newUser.position = data.model.position;
          $scope.newUser.email = data.model.email;
          $scope.newUser.role = data.model.role.id;
          $scope.newUser.organizationId = data.model.organization_id.id;
        });

        $scope.saveUser = function(newUser){
          console.info('user', newUser);
          userModel.update(
          {
              id: newUser.id,
              first_name: newUser.firstName,
              last_name: newUser.lastName,
              position: newUser.position,
              email: newUser.email,
              imageFile: $scope.myCroppedImage,
              role: newUser.role,
              organization_id: newUser.organizationId
            },
              function(data){
                $state.go('listUser', {userId: data.id});
              }
          )
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