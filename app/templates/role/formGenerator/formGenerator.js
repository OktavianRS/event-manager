(function (angular) {
  'use strict';

  angular
    .module('eventManager')
    .controller('formGenerator', ['roleModel', '$scope', '$mdSidenav', MainController]);

  var vm;
  /** @ngInject */
  function MainController(roleModel, $scope, $mdSidenav) {
    vm = this;
    vm.form = {
      items: []
    };
    vm.sidenav = $mdSidenav;
    vm.roleModel = roleModel;
    vm.stateParams = $scope.stateParams;
  }

  MainController.prototype.addItem = function (type) {
    this.form.items.push({
      type: type
    });
  };

  MainController.prototype.toggleSidenav = function() {
    vm.sidenav('right').toggle();
  }

  MainController.prototype.getJson = function () {
      this.roleModel.getRole({id: this.stateParams.roleId}, function(data) {
        vm.form.items = data.items;
    })
  };

  MainController.prototype.done = function () {
      this.roleModel.setRole({id: this.stateParams.roleId, json: this.form}, function(data) {
    })
  };

  MainController.prototype.delete = function(item, index) {
    vm.form.items.splice(index, 1);
  };

  MainController.prototype.up = function(item, index) {
    if(index !== 0) {
      var prevItem = vm.form.items[index - 1];
      vm.form.items[index] = prevItem;
      vm.form.items[index - 1] = item;
    }
  };

  MainController.prototype.down = function(item, index) {
    if(index !== vm.form.items.length - 1) {
      var nextItem = vm.form.items[index + 1];
      vm.form.items[index] = nextItem;
      vm.form.items[index + 1] = item;
    }
  };

})(angular);