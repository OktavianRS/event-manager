angular.module('model.role', [])
    .service('roleModel', ['url', 'api', 'toast', '$q',
      function(url, api, toast, $q) {
      	this.setRole = function(req, callback) {
          api.post(
          url.role.setRole,
          req,
          function(res) {
            callback(res);
          })
        }

        this.getRole = function(req, callback) {
          api.get(
          url.role.getRole,
          req,
          function(res) {
            callback(res);
          })
        }

      }])