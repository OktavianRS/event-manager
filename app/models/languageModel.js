angular.module('model.language', [])
    .service('languageModel', ['url', 'api', 'toast', '$q',
      function(url, api, toast, $q) {
        /**
         * Get one Language
         * @param {int} languageId - Language ID
         * @param {function} callback - request callback
         */
        this.getOne = function(languageId, callback) {
          api.get(
              url.language.getOne,
              {
                id: languageId
              },
              function(data) {
                callback(data);
              }
          )
        };

        /**
         * Get all Language
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
              url.language.getAll,
              {
                sort: sort,
                page: currentPage - 1,
                size: pageSize,
                name: search.name,
                code: search.code
              },
              function(data) {
                callback(data);
              }
          )
        };

        /**
         * Get list all Language
         * @param {string} text - search text
         */
        this.getAllList = function(text) {
          var deferred = $q.defer();
          api.get(
              url.language.getAllList,
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
         * Create language
         * @param {string} name - Language name
         * @param {string} code - Language code
         * @param {function} callback - request callback
         */
        this.create = function(name, code, callback) {
          api.post(
              url.language.create,
              {
                name: name,
                code: code
              },
              function(data) {
                toast('success', 'Language Created');
                callback(data);
              }
          );
        };

        /**
         * update language
         * @param {int} languageId - Language ID
         * @param {string} name - Language name
         * @param {string} code - Language code
         * @param {function} callback - request callback
         */
        this.update = function(languageId, name, code, callback) {
          api.put(
              url.language.update,
              {
                id: languageId,
                name: name,
                code: code
              },
              function(data) {
                toast('success', 'Language Updated');
                callback(data);
              }
          );
        };

        /**
         * delete Language
         * @param {int} languageId - Language ID
         * @param {function} callback - request callback
         */
        this.delete = function(languageId, callback) {
          api.delete(
              url.language.remove,
              {
                id: languageId
              },
              function() {
                toast('success', 'Language Deleted');
                callback();
              }
          );
        }
      }
    ]);