angular.module('model.location', [])
    .service('locationModel', ['url', 'api', 'toast', '$q',
      function(url, api, toast, $q) {
        /**
         * Get one Location
         * @param {int} locationId - Location ID
         * @param {function} callback - request callback
         */
        this.getOne = function(locationId, callback) {
          api.get(
              url.location.getOne,
              {
                id: locationId
              },
              function(data) {
                callback(data);
              }
          )
        };

        /**
         * Get all Location
         * @param {int} order - order sorting(3 - ASC, 4 - DESC)
         * @param {string} attr - sorting attribute
         * @param {int} currentPage - current page
         * @param {int} pageSize - number of records on the page (10|25|50)
         * @param {object} search - search parameters (attribute: text)
         * @param {function} callback - request callback
         */
        this.getAll = function(order, attr, currentPage, pageSize, search, callback) {
          var sort = {};
          sort[attr] = order;
          api.get(
              url.location.getAll,
              {
                sort: sort,
                page: currentPage - 1,
                size: pageSize,
                name: search.name
              },
              function(data) {
                callback(data);
              }
          )
        };

        /**
         * Get list all Location
         * @param {string} text - search text
         */
        this.getAllList = function(text) {
          var deferred = $q.defer();
          api.get(
              url.location.getAllList,
              {
                name: text
              },
              function(data) {
                return deferred.resolve(data)
              }
          );
          return deferred;
        };

        /**
         * Create location
         * @param {string} name - Location name
         * @param {string} latitude - Location latitude
         * @param {string} longitude - Location longitude
         * @param {string} link - Location link
         * @param {function} callback - request callback
         */
        this.create = function(name, latitude, longitude, link, callback) {
          api.post(
              url.location.create,
              {
                name: name,
                latitude: latitude,
                longitude: longitude,
                link: link
              },
              function(data) {
                toast('success', 'Location Created');
                callback(data);
              }
          );
        };

        /**
         * update location
         * @param {int} locationId - Location ID
         * @param {string} name - Location name
         * @param {string} latitude - Location latitude
         * @param {string} longitude - Location longitude
         * @param {string} link - Location link
         * @param {function} callback - request callback
         */
        this.update = function(locationId, name, latitude, longitude, link, callback) {
          api.put(
              url.location.update,
              {
                id: locationId,
                name: name,
                latitude: latitude,
                longitude: longitude,
                link: link
              },
              function(data) {
                toast('success', 'Location Updated');
                callback(data);
              }
          );
        };

        /**
         * delete Location
         * @param {int} locationId - Location ID
         * @param {function} callback - request callback
         */
        this.delete = function(locationId, callback) {
          api.delete(
              url.location.remove,
              {
                id: locationId
              },
              function() {
                toast('success', 'Location Deleted');
                callback();
              }
          );
        }
      }
    ]);