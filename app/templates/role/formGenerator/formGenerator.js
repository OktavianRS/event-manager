angular.module('eventManager')
    .controller('formGeneratorCtrl', ['$scope', 'roleModel',
      function($scope, roleModel) {

        $scope.json = [
          {
            "id":"textbox",
            "component":"textInput",
            "editable":false,"index":0,
            "label":"Name",
            "description":"Your name",
            "placeholder":"Your name",
            "options":[],
            "required":true,
            "validation":"/.*/"
          }
        ];

        $scope.setRole = function() {
          roleModel.setRole({id: $scope.stateParams.roleId, json: {name: 'My awesome json'}}, function(data) {

          })
        }

        // $scope.setRole();

        $scope.getRole = function() {
          roleModel.getRole({id: $scope.stateParams.roleId}, function(data) {
            if(data) {
              $scope.json = data;
            }
          })
        }
        $scope.getRole();

      }
    ]);