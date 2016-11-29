(function () {
  'use strict';
  angular.module('components.submitItem', [])
    .directive('submitItem', SubmitItem);

  function SubmitItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'components/directives/submit-button-item/submit-button-item.html',
      scope: {
        item: '='
      },
      controller: SubmitItem,
      controllerAs: 'Submit',
      bindToController: true
    };

    return directive;
  }

  /*@ngInject*/
  function SubmitItemCtrl(Utils, $element) {
    this.Element = $element;

    Utils.extend(this.item, {
      config: {
        type: 'submit'
      }
    });
  }

})();