angular.module('model.campaign', [])
    .service('campaignModel', ['url', 'api', 'toast', '$q', function(url, api, toast, $q) {

        /**
         * Get all campaigns
         * @param {string} attribute - sorting attribute
         * @param {int} pageSize - number of records on the page (10|25|50|all)
         * @param {int} currentPage  - current page
         * @param {string} order - order sorting
         * @param {function} callback - request callback
         */
        this.get = function(attribute, pageSize, currentPage, order, callback) {
          api.get(
              url.campaign.getAll,
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
         * Create campaign
         * @param {string} campaignName - campaign name
         * @param {string} subject - subject text
         * @param {string} fromName - from name
         * @param {string} fromEmail - from email
         * @param {int} templateId - template ID
         * @param {int} listId - list ID
         * @param {function} callback - request callback
         */
        this.create = function(req, callback) {
          api.post(
              url.campaign.create,
              req,
              function(data) {
                toast('success', 'Campaign created');
                callback(data);
              }
          )
        };

        /**
         * Get one campaign
         * @param {int} campaignId - campaign ID
         * @param {function} callback - request callback
         */
        this.getOne = function(campaignId, callback) {
          api.get(
              url.campaign.getOne,
              {
                id: campaignId
              },
              function(data) {
                callback(data);
              }
          );
        };

        /**
         * Update campaign
         * @param {int} campaignId - campaign ID
         * @param {string} campaignName - campaign name
         * @param {string} subject - subject text
         * @param {string} fromName - from name
         * @param {string} fromEmail - from email
         * @param {int} templateId - template ID
         * @param {int} listId - list ID
         * @param {function} callback - request callback
         */
        this.update = function(req, callback) {
          api.put(
              url.campaign.update,
              req,
              function(data) {
                toast('success', 'Campaign updated');
                callback();
              }
          )
        };

        /**
         * Delete campaigns
         * @param {array.int} campaignIds - campaigns ids
         * @param {function} callback - request callback
         */
        this.delete = function(campaignIds, callback) {
          api.delete(
              url.campaign.delete,
              {
                ids: campaignIds
              },
              function() {
                toast('success', 'Campaigns deleted');
                callback();
              }
          )
        };

        this.getReports = function(attribute, pageSize, currentPage, order, callback) {
          api.get(
              url.campaign.geAllReports,
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

        this.deleteReports = function(reportsIds, callback) {
          api.delete(
              url.campaign.deleteReports,
              {
                ids: reportsIds
              },
              function() {
                toast('success', 'Reports deleted');
                callback();
              }
          )
        };

        this.unsubscribe = function(email, key, message, callback) {
          api.post(
              url.campaign.unsubscribe,
              {
                key: key,
                email: email,
                message: message
              },
              function() {
                toast('success', 'You unsubscribed');
                callback();
              }
          )
        };

        this.getOneReport = function(reportId, pageSize, currentPage, attribute, order, callback) {
          api.get(
              url.campaign.getOneReports,
              {
                id: reportId,
                size: pageSize,
                page: currentPage,
                order_attr: attribute,
                sort: order

              },
              function(data) {
                data.distribution.created_at = moment(parseInt(data.distribution.created_at), 'X').format('MMMM DD, YYYY hh:mm a');
                data.distribution.updated_at = moment(parseInt(data.distribution.updated_at), 'X').format('MMMM DD, YYYY hh:mm a');
                callback(data);
              }
          )
        };

        /**
         * Send campaign
         * @param {int} campaignId - campaign ID
         * @param {function} callback - request callback
         */
        this.send = function(campaignId, callback) {
          api.get(
              url.campaign.send,
              {
                id: campaignId
              },
              function(data) {
                callback();
                toast('success', 'Campaign sent');
              }
          )
        };
    }])