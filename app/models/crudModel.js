angular.module('model.crud', [])
    .service('crudModel', ['url', 'api', 'toast', '$q',
      function(url, api, toast, $q) {
      	this.Read = function(readUrl, req, callback) {
          api.get(
          url.baseMailerUrl + readUrl + '/view',
          req,
          function(res) {
            callback(res);
          })
        }

      	this.Create = function(readUrl, req, callback) {
          api.post(
          url.baseMailerUrl + readUrl + '/create',
          req,
          function(res) {
            callback(res);
          })
        }

      	this.Update = function(readUrl, req, callback) {
          api.put(
          url.baseMailerUrl + readUrl + '/update',
          req,
          function(res) {
            callback(res);
          })
        }

      	this.Delete = function(readUrl, req, callback) {
          api.delete(
          url.baseMailerUrl + readUrl + '/delete',
          req,
          function(res) {
            callback(res);
          })
        }

        this.Index = function(readUrl, req, callback) {
        	api.get(
        		url.baseMailerUrl + readUrl + '/index',
        		req,
        		function(res) {
        			callback(res);
        		}
        	)
        }

        this.IndexV = function(readUrl, req, callback) {
          api.get(
            url.baseUrl + readUrl + '/index',
            req,
            function(res) {
              callback(res);
            }
          )
        }

        this.CreateV = function(readUrl, req, callback) {
          api.post(
          url.baseUrl + readUrl + '/create',
          req,
          function(res) {
            callback(res);
          })
        }

        this.UpdateV = function(readUrl, req, callback) {
          api.put(
          url.baseUrl + readUrl + '/update',
          req,
          function(res) {
            callback(res);
          })
        }

        this.DeleteV = function(readUrl, req, callback) {
          api.delete(
          url.baseUrl + readUrl + '/delete',
          req,
          function(res) {
            callback(res);
          })
        }

      }])