(function () {
  'use strict';
  angular.module('components.submitView', [])
    .directive('submitView', SubmitView);

  /*@ngInject*/
  function SubmitView($timeout) {
    var directive = {
      restrict: 'E',
      templateUrl: 'components/directives/submit-button-item/submit-button-view.html',
      scope: {
        formItem: '=',
        form: '='
      },
      controller: SubmitViewCtrl,
      controllerAs: 'SubmitView',
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
  function SubmitViewCtrl(Utils) {
    this.Utils = Utils;
  }

  SubmitViewCtrl.prototype.init = function () {

    this.Utils.extend(this.formItem, {
      config: {}
    });
  };

})();
