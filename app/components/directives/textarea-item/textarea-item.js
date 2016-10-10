(function () {
  'use strict';
  angular.module('components.textareaItem', [])
    .directive('textareaItem', textareaItem);

  function textareaItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'components/directives/textarea-item/textarea-item.html',
      scope: {
        item: '='
      },
      controller: TextareaItemCtrl,
      controllerAs: 'Textarea',
      bindToController: true
    };

    return directive;
  }

  /*@ngInject*/
  function TextareaItemCtrl(Utils, $element) {
    this.Element = $element;

    Utils.extend(this.item, {
      config: {}
    });
  }

})();