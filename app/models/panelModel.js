angular.module('model.panel', [
      'ngStorage'
    ])
    .service('panelModel', ['url', 'api', 'toast',
      function(url, api, toast) {

        this.getAttributeLabels = function(req, callback) {
          api.get(
            url.panel.getAttributeLabels,
            req,
            function(res) {
              callback(res);
            }
          )
        }

        this.getIndex = function(req, callback) {
        	api.get(
        		url.panel.getIndex,
        		req,
        		function(res) {
        			callback(res);
        		}
        	)
        }

        this.createField = function(req, callback) {
          api.post(
            url.panel.createField,
            req,
            function(res) {
              callback(res);
            }
          )
        }

        this.updateField = function(req, callback) {
          api.put(
            url.panel.updateField,
            req,
            function(res) {
              callback(res);
            }
          )
        }

        this.deleteField = function(req, callback) {
          api.delete(
            url.panel.deleteField,
            req,
            function(res) {
              res === 1 ? toast('success', 'Removed ' + res + ' item.') : toast('success', 'Removed ' + res + ' items.')
              callback(res);
            }
          )
        }

        this.getIndexSearch = function(req, callback) {
          api.get(
            url.panel.getIndexSearch,
            req,
            function(res) {
              callback(res);
            }
          )
        }

        this.createSearch = function(req, callback) {
          api.post(
            url.panel.createSearch,
            req,
            function(res) {
              callback(res);
            }
          )
        }

        this.updateSearch = function(req, callback) {
          api.put(
            url.panel.updateSearch,
            req,
            function(res) {
              callback(res);
            }
          )
        }

        this.deleteSearch = function(req, callback) {
          api.delete(
            url.panel.deleteSearch,
            req,
            function(res) {
              callback(res);
            }
          )
        }

        this.getFieldSettings = function(req, callback) {
          api.get(
            url.panel.getFieldSettings,
            req,
            function(res) {
              callback(res);
            }
          )
        }

        this.updateFieldSettings = function(req, callback) {
          api.put(
            url.panel.updateFieldSettings,
            req,
            function(res) {
              callback(res)
            }
          )
        }

        this.export = function(eventId, callback) {
          api.get(
              url.panel.export,
              {
                _eventId: eventId
              },
              function(data) {
                callback(data);
              }
          )
        };

        this.import = function(fd, callback) {
          api.file(
              url.panel.import,
              fd,
              function(data) {
                callback(data);
              }
          )
        };

        this.allByEvent = function(req, callback) {
          api.get(
            url.panel.allByEvent,
            req,
            function(res) {
              callback(res);
            }
          )
        }

      }]);