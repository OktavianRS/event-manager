angular.module('model.company', [])
    .service('companyModel', ['url', 'api', 'toast',
      function(url, api, toast) {
        /**
         * Get one Company
         * @param {int} companyId - Company ID
         * @param {function} callback - request callback
         */
        this.getOne = function(companyId, callback) {
          api.get(
              url.company.getOne,
              {
                id: companyId
              },
              function(data) {
                callback(data);
              }
          )
        };

        /**
         * Get all Company
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
              url.company.getAll,
              {
                sort: sort,
                page: currentPage - 1,
                size: pageSize,
                name: search.name,
                link: search.link,
                phone: search.phone
              },
              function(data) {
                callback(data);
              }
          )
        };

        /**
         * Get list all Company
         * @param {function} callback - request callback
         */
        this.getAllList = function(callback) {
          api.get(
              url.company.getAllList,
              {},
              function(data) {
                callback(data);
              }
          )
        };

        /**
         * Create company
         * @param {string} name - Company name
         * @param {string} description - Company description
         * @param {string} address - Company address
         * @param {string} phone - Company phone
         * @param {string} email - Company email
         * @param {string} site - Company site
         * @param {base64} image - Company image
         * @param {function} callback - request callback
         */
        this.create = function(name, description, address, phone, email, site, image, callback) {
          api.post(
              url.company.create,
              {
                name: name,
                description: description,
                address: address,
                phone: phone,
                email: email,
                link: site,
                imageFile: image
              },
              function(data) {
                toast('success', 'Company Created');
                callback(data);
              }
          );
        };

        /**
         * update company
         * @param {int} companyId - Company ID
         * @param {string} name - Company name
         * @param {string} description - Company description
         * @param {string} address - Company address
         * @param {string} phone - Company phone
         * @param {string} email - Company email
         * @param {string} site - Company site
         * @param {base64} image - Company image
         * @param {function} callback - request callback
         */
        this.update = function(companyId, name, description, address, phone, email, site, image, callback) {
          api.put(
              url.company.update,
              {
                id: companyId,
                name: name,
                description: description,
                address: address,
                phone: phone,
                email: email,
                link: site,
                imageFile: image
              },
              function(data) {
                toast('success', 'Company Updated');
                callback(data);
              }
          );
        };

        /**
         * delete Company
         * @param {int} companyId - Company ID
         * @param {function} callback - request callback
         */
        this.delete = function(companyId, callback) {
          api.delete(
              url.company.remove,
              {
                id: companyId
              },
              function() {
                toast('success', 'Company Deleted');
                callback();
              }
          );
        }
      }
    ]);