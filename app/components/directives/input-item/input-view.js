(function () {
  'use strict';
  angular.module('components.inputView', [])
    .directive('inputView', InputView);

  /*@ngInject*/
  function InputView($timeout) {
    var directive = {
      restrict: 'E',
      templateUrl: 'components/directives/input-item/input-view.html',
      scope: {
        formItem: '=',
        form: '='
      },
      controller: InputViewCtrl,
      controllerAs: 'InputView',
      bindToController: true,
      link: linker
    };

    function linker(scope, elem, attrs, ctrl) {

      //this timeout is placed here in order to make sure that the creator directive of this view is finished its work
      $timeout(function() {
        ctrl.init();
      }, 50);
    }

    return directive;
  }

  /*@ngInject*/
  function InputViewCtrl(Utils) {
    this.Utils = Utils;
  }

  InputViewCtrl.prototype.init = function () {

    this.Utils.extend(this.formItem, {
      config: {}
    });
  };

})();
