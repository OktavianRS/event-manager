angular.module('components.homeCompany', [])
    .directive('homeCompany', [function() {
      return {
        restrict: 'E',
        templateUrl: 'components/company/homePageCompany/homePageCompany.html'
      }
    }])
    .controller('homeCompanyCtrl', ['$scope', 'companyModel', function($scope, companyModel){
        $scope.companyEvent = [
            {
                name: 'Event name',
                icon: 'event',
                description: 'Some description'
            },
            {
                name: 'Another event',
                icon: 'event',
                description: 'Some description'
            },
            {
                name: 'Another event',
                icon: 'event',
                description: 'Some description'
            },
            {
                name: 'Another event',
                icon: 'event',
                description: 'Some description'
            }
        ]
    	$scope.events = [
    		{
    			eventName: 'Company name',
    			eventSubName: 'Event name',
    			eventDescription: 'Description event card'
    		},
    		{
    			eventName: 'Company name',
    			eventSubName: 'Event name',
    			eventDescription: 'Description event card'
    		},
    		{
    			eventName: 'Company name',
    			eventSubName: 'Event name',
    			eventDescription: 'Description event card'
    		},
    		{
    			eventName: 'Company name',
    			eventSubName: 'Event name',
    			eventDescription: 'Description event card'
    		},
            {
                eventName: 'Company name',
                eventSubName: 'Event name',
                eventDescription: 'Description event card'
            },
            {
                eventName: 'Company name',
                eventSubName: 'Event name',
                eventDescription: 'Description event card'
            }
    	];
    }])