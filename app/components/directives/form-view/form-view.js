(function () {
  'use strict';
  angular.module('components.formView', [])
    .directive('formView', FormView);

  function FormView() {
    var directive = {
      restrict: 'E',
      templateUrl: 'components/directives/form-view/form-view.html',
      scope: {
        form: '='
      },
      controller: FormViewCtrl,
      controllerAs: 'FormView',
      bindToController: true,
      link: linker
    };

    function linker(scope, elem, attrs, ctrl) {
      ctrl.init();
    }

    return directive;
  }

  /*@ngInject*/
  function FormViewCtrl($scope) {
    this.Scope = $scope;
  }

  FormViewCtrl.prototype.init = function () {
  };

})();