angular.module('model.step', [
      'ngStorage'
    ])
    .service('stepModel', ['url', 'api', 'toast',
      function(url, api, toast) {
        this.getTableType = function(callback) {
          api.get(
          url.step.getTableType,
          {},
          function(res) {
            callback(res);
          })
        }

      	this.getStep = function(eventId, callback) {
      		api.get(
      			url.step.getStep,{
              _eventId: eventId
            },
      			function(res){
      				callback(res);
      			}
      		)
      	}

        this.getStepInfo = function(req, callback) {
        api.get(
          url.step.getStepInfo,
          req,
          function(res) {
            callback(res);
          })
        }

        this.getTableParams = function(callback) {
        api.get(
          url.step.getTableParams,
          {},
          function(res) {
            callback(res);
          })
        }

        this.sendTableData = function(req, callback) {
          api.post(
            url.step.generateTable,
            req,
            function(res) {
              toast('success', 'Step finished successfully');
              callback(res);
            }
          )
        }

        this.rollBack = function(req, callback) {
          api.post(
            url.step.rollBack,
            req,
            function(res) {
              toast('success', 'Step rollback');
              callback(res);
            }
          )
        }
      }]);