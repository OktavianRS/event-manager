angular.module('eventManager')
    .controller('profileCtrl', ['$scope', 'userModel', 'toast', '$state', '$filter',
      function($scope, userModel, toast, $state, $filter) {
        console.info('ProfileCtrl');
        $scope.myImage = '';
        $scope.myCroppedImage = '';
        $scope.loading = false;
        $scope.user = {};

        userModel.getCurrent(function(data) {
          $scope.user.username = data.username;
          $scope.user.image_id = data.image_id;
          $scope.user.first_name = data.first_name;
          $scope.user.last_name = data.last_name;
          $scope.user.email = data.email;
        });

        $scope.update = function(user) {
          userModel.update(
              user.username,
              $scope.myCroppedImage,
              user.first_name,
              user.last_name,
              user.email,
              function(data){
                $scope.myImage = '';
                $scope.loading = false;
                $scope.myCroppedImage = '';
                $scope.user.username = data.username;
                $scope.user.image_id = data.image_id;
                $scope.user.first_name = data.first_name;
                $scope.user.last_name = data.last_name;
                $scope.user.email = data.email;
              }
          );
        };

        $scope.changePassword = function(pass) {
          userModel.changePassword(pass.old, pass.new, function() {
            $state.reload();
          });
        };

        $scope.low = function(email) {
          //$scope.user.email = $scope.user.email.toLowerCase().replace(/\s+/g,'');
          //$scope.user.email;
          console.info('ok google', $scope.user.email)
          console.info('ok email', email)
          $scope.user.email = $filter('lowercase')(email)
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