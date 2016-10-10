(function () {
  'use strict';
  angular.module('components.inputItem', [])
    .directive('inputItem', InputItem);

  function InputItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'components/directives/input-item/input-item.html',
      scope: {
        item: '='
      },
      controller: InputItem,
      controllerAs: 'Input',
      bindToController: true
    };

    return directive;
  }

  /*@ngInject*/
  function InputItemCtrl(Utils, $element) {
    this.Element = $element;

    Utils.extend(this.item, {
      config: {
        type: 'text'
      }
    });
  }

})();