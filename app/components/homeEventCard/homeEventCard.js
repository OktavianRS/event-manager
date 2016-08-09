angular.module('components.homeEventCard', [])
    .directive('homeEventCard', [function() {
      return {
        restrict: 'E',
        scope: {
            cardTitle: '=title',
            cardIcon: '=icon',
            cardDescription: '=description'
        },
        templateUrl: 'components/homeEventCard/homeEventCard.html'
      }
    }]);