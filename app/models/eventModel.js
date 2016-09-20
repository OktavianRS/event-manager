angular.module('model.event', [])
    .service('eventModel', ['url', 'api', 'toast', '$q',
      function(url, api, toast, $q) {
        /**
         * Get one event
         * @param {int} eventId - event ID
         * @param {function} callback - request callback
         */
        this.getOne = function(eventId, callback) {
          api.get(
              url.event.getOne,
              {
                id: eventId
              },
              function(data) {
                data.model.dateUnix = data.model.date;
                data.model.date = moment(data.model.date, 'X').format('DD/MM/YYYY HH:mm');
                callback(data);
              }
          )
        };

        /**
         * Get all event
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
              url.event.getAll,
              {
                sort: sort,
                page: currentPage - 1,
                size: pageSize,
                name: search.name,
                organization_id: search.company,
                date: ''
              },
              function(data) {
                data.model = data.model.map(function(v) {
                  v.date = moment(v.date, 'X').format('DD/MM/YYYY HH:mm');
                  return v;
                });
                callback(data);
              }
          )
        };

        this.getAllForMailer = function(order, attr, currentPage, pageSize, search, id, callback) {
          var sort = {};
          sort[attr] = order;
          api.get(
              url.list.getAllForMailer,
              {
                sort: sort,
                page: currentPage - 1,
                size: pageSize,
                name: search.name,
                organization_id: search.company,
                date: '',
                list_id: id
              },
              function(data) {
                data.model = data.model.map(function(v) {
                  v.date = moment(v.date, 'X').format('DD/MM/YYYY HH:mm');
                  return v;
                });
                callback(data);
              }
          )
        };

        /**
         * Get list of all event
         * @param {function} callback - request callback
         */
        this.getAllList = function(callback) {
          api.get(
              url.event.getAllList,
              {},
              function(data) {
                callback(data);
              }
          )
        };

        /**
         * Create event
         * @param {string} name - event name
         * @param {timestamp} date - date, time event
         * @param {int} companyId - company Id
         * @param {int[]} languageIds - languages Ids event
         * @param {int[]} locationIds - locations Ids event
         * @param {base64} image - logo event
         * @param {function} callback - request callback
         */
        this.create = function(name, date, companyId, languageIds, locationIds, image, callback) {
          api.post(
              url.event.create,
              {
                name: name,
                date: date,
                organization_id: companyId,
                languageIds: languageIds,
                locationIds: locationIds,
                imageFile: image
              },
              function(data) {
                toast('success', 'Event Created');
                callback(data);
              }
          );
        };

        /**
         * update event
         * @param {int} eventId - event ID
         * @param {string} name - event name
         * @param {timestamp} date - date, time event
         * @param {int} companyId - company Id
         * @param {int[]} languageIds - languages Ids event
         * @param {int[]} locationIds - locations Ids event
         * @param {base64} image - logo event
         * @param {function} callback - request callback
         */
        this.update = function(eventId, name, date, companyId, languageIds, locationIds, image, callback) {
          api.put(
              url.event.update,
              {
                id: eventId,
                name: name,
                date: date,
                organization_id: companyId,
                languageIds: languageIds,
                locationIds: locationIds,
                imageFile: image
              },
              function(data) {
                toast('success', 'Event Updated');
                callback(data);
              }
          );
        };

        /**
         * delete event
         * @param {int} eventId - event ID
         * @param {function} callback - request callback
         */
        this.delete = function(eventId, callback) {
          api.delete(
              url.event.remove,
              {
                id: eventId
              },
              function() {
                toast('success', 'Event Deleted');
                callback();
              }
          );
        };

        this.addComment2 = function(eventId, comment, callback) {
          api.post(
              url.event.addComment,
              {
                text: comment,
                obj_id: eventId,
                attachment: []
              },
              function(data) {
                toast('success', 'Comment sent');
                callback(data);
              }
          )
        };

        this.addComment = function(fd, callback) {
          api.file(
              url.event.addComment,
              fd,
              function(data) {
                data.created_at = moment(data.created_at, 'X').format('DD/MM/YYYY HH:mm');
                toast('success', 'Comment sent');
                callback(data);
              }
          )
        };

        this.getComments = function(eventId, callback) {
          api.get(
              url.event.getComments,
              {
                page: 0,
                size: 10,
                obj_id: eventId
              },
              function(data) {
                data.model = data.model.map(function(v) {
                  v.created_at = moment(v.created_at, 'X').format('DD/MM/YYYY HH:mm');
                  return v;
                });
                callback(data);
              }
          )
        };

        this.getAttachments = function(eventId, page, callback){
          api.get(
              url.event.getAttachments,
              {
                obj_id: eventId,
                page: page-1,
                size: 10,
                name: ''
              },
              function(data){
                callback(data);
              }
          )
        };

        /**
         * Upload one attachment
         * @param {int} attachmentId - Attachment ID
         * @param {function} callback - request callback
         */
        this.uploadOneAttach = function(attachmentId, callback) {
          api.get(
            url.event.uploadOneAttach,
            {
              id: attachmentId
            },
            function(data) {
              callback(data);
            }
          )
        }

        this.uploadAttach = function(attachmentId, callback) {
          api.get(
              url.event.uploadAttach,
              {
                id: attachmentId,
                type: 'all'
              },
              function(data) {
                callback(data);
              }
          )
        }

        this.deleteOneAttach = function(attachmentId, callback) {
          api.delete(
            url.event.removeOne,
            {
              id: attachmentId
            },
            function(data) {
              callback(data);
            }
          )
        }
      }
    ]);