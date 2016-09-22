angular.module('model.list', [])
    .service('listModel', ['url', 'api', 'toast',
      function(url, api, toast) {
        /**
         * Get all lists
         * @param {string} attribute - sorting attribute
         * @param {int} pageSize - number of records on the page (10|25|50|all)
         * @param {int} currentPage  - current page
         * @param {string} order - order sorting
         * @param {function} callback - request callback
         */
        this.get = function(attribute, pageSize, currentPage, order, callback) {
          api.get(
              url.list.getAll,
              {
                order_attr: attribute,
                size: pageSize,
                page: currentPage,
                sort: order
              },
              function(data) {
                data.models = data.models.map(function(v) {
                  v.created_at = moment(parseInt(v.created_at), 'X').format('MMMM DD, YYYY hh:mm a');
                  v.updated_at = moment(parseInt(v.updated_at), 'X').format('MMMM DD, YYYY hh:mm a');
                  return v;
                });
                callback(data);
              }
          )
        };

        /**
         * Get all lists without current
         * @param {int} listId  - current list
         * @param {string} attribute - sorting attribute
         * @param {int} pageSize - number of records on the page (10|25|50|all)
         * @param {int} currentPage  - current page
         * @param {string} order - order sorting
         * @param {function} callback - request callback
         */
        this.getAllMerge = function(listId, callback) {
          api.get(
              url.list.getAll,
              {
                list_id: listId,
              },
              function(data) {
                data.model = data.model.map(function(v) {
                  v.created_at = moment(parseInt(v.created_at), 'X').format('MMMM DD, YYYY hh:mm a');
                  v.updated_at = moment(parseInt(v.updated_at), 'X').format('MMMM DD, YYYY hh:mm a');
                  return v;
                });
                callback(data);
              }
          )
        };

        /**
         * Create list
         * @param {string} name - list name
         * @param {function} callback - request callback
         */
        this.create = function(name, callback) {
          api.post(
              url.list.create,
              {
                name: name
              },
              function(data) {
                toast('success', 'List created');
                callback(data);
              }
          )
        };

        /**
         * Delete lists
         * @param {array.int} listsIds - delete lists
         * @param {function} callback - request callback
         */
        this.delete = function(listsIds, callback) {
          api.delete(
              url.list.delete,
              {
                ids: listsIds
              },
              function() {
                toast('success', 'Lists deleted');
                callback();
              }
          )
        };

        /**
         * Get one list
         * @param {int} listId - list ID
         * @param {string} attribute - sorting attribute
         * @param {int} pageSize - number of records on the page (10|25|50|all)
         * @param {int} currentPage  - current page
         * @param {string} order - order sorting
         * @param {function} callback - request callback
         */
        this.getOne = function(req, callback) {
          api.get(
              url.list.getOne,
              req,
              function(data) {
                callback(data);
              }
          )
        };

        /**
         * Create subscriber
         * @param {int} listId - list ID
         * @param {string} firstName - subscriber first name
         * @param {string} lastName - subscriber last name
         * @param {string} email - subscriber email
         * @param {function} callback - request callback
         */
        this.saveSubscriber = function(listId, email, firstName, lastName, callback) {
          api.post(
              url.list.addSubscriber,
              {
                list_id: listId,
                email: email,
                first_name: firstName,
                last_name: lastName
              },
              function(data) {
                toast('success', 'Subscriber added');
                callback(data);
              }
          );
        };

        /**
         * Delete subscribers
         * @param {int} listId - list ID
         * @param {array.int} subscriberIds - array subscribers IDs
         * @param {function} callback - request callback
         */
        this.deleteSubscriber = function(req, callback) {
          api.delete(
              url.list.deleteSubscriber,
              req,
              function() {
                toast('success', 'Subscribers deleted');
                callback();
              }
          )
        };

        /**
         * Export list
         * @param {int} listId - list ID
         * @param {function} callback - request callback
         */
        this.export = function(listId, callback) {
          api.get(
              url.list.export,
              {
                list_id: listId
              },
              function(data) {
                callback(data);
              }
          )
        };

        /**
         * Import list
         * @param {formData} fd - form data
         * @param {function} callback - request callback
         */
        this.import = function(fd, callback) {
          api.file(
              url.list.import,
              fd,
              function(data) {
                callback(data);
              }
          )
        };

        /**
         * save import list
         * @param {int} listId - list ID
         * @param {array.object} emails - array emails
         * @param {function} callback - request callback
         */
        this.saveImport = function(listId, emails, callback) {
          api.post(
              url.list.addSubscriber,
              {
                list_id: listId,
                emails: emails
              },
              function(data) {
                toast('success', 'List imported');
                callback(data);
              }
          );
        };

        /**
         * Merge lists
         * @param {int} listId - current list ID
         * @param {array.int} listsIds - array merge lists
         * @param {function} callback - request callback
         */
        this.merge = function(listId, listsIds, callback) {
          api.put(
              url.list.merge,
              {
                list_id: listId,
                targetList_id: listsIds
              },
              function(data) {
                toast('success', data);
                callback();
              }
          )
        };

        this.addSubsFromEvent = function(req, callback) {
          api.put(
            url.list.addSubsFromEvent,
            req,
            function(data) {
              callback(data);
            }
          )
        }

        /**
         * Copy subscribers
         * @param {int} listId - current list ID
         * @param {int} targetListId - destination list ID
         * @param {array.int} subscriberIds - array subscribers IDs
         * @param {function} callback - request callback
         */
        this.copySubscriber = function(req, callback) {
          api.put(
              url.list.copySubscriber,
              req,
              function() {
                toast('success', 'Subscribers copied');
                callback();
              }
          )
        };

        /**
         * Move subscribers
         * @param {int} listId - current list ID
         * @param {int} targetListId - destination list ID
         * @param {array.int} subscriberIds - array subscribers IDs
         * @param {function} callback - request callback
         */
        this.moveSubscriber = function(req, callback) {
          api.put(
              url.list.moveSubscriber,
              req,
              function() {
                toast('success', 'Subscribers moved');
                callback();
              }
          )
        }
      }
    ]);