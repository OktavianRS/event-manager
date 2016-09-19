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
                res.model = res.model.map(function(v) {
                  v.created_at ? v.created_at = moment(v.created_at, 'X').format('DD/MM/YYYY HH:mm') : false;
                  v.created_by ? v.created_by = moment(v.created_by, 'X').format('DD/MM/YYYY HH:mm') : false;
                  v.updated_at ? v.updated_at = moment(v.updated_at, 'X').format('DD/MM/YYYY HH:mm') : false;
                  v.updated_by ? v.updated_by = moment(v.updated_by, 'X').format('DD/MM/YYYY HH:mm') : false;
                  return v;
                });
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