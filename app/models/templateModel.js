angular.module('model.template', [])
    .service('templateModel', ['url', 'api', 'toast', '$q',
      function(url, api, toast, $q) {
      	this.recipientInsert = function(req, callback) {
          api.get(
          url.template.recipientInsert,
          req,
          function(res) {
            callback(res);
          })
        }
      }])