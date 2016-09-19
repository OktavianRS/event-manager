angular.module('model.mailer', [])
    .service('mailerModel', ['url', 'api', 'toast', '$q', function(url, api, toast, $q) {
      	this.distribution = function(req, callback) {
          api.get(
          url.baseMailerUrl + 'report/distribution',
          req,
          function(res) {
            callback(res);
          })
        }
    }])