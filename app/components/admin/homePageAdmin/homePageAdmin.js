angular.module('components.homeAdmin', [])
    .directive('homeAdmin', [function() {
      return {
        restrict: 'E',
        templateUrl: 'components/admin/homePageAdmin/homePageAdmin.html'
      }
    }])
    .controller('homeAdminCtrl', ['$scope', 'companyModel', function($scope, companyModel){

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

