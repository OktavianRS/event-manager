angular.module('model.user', [
      'ngStorage'
    ])
    .service('userModel', ['url', 'api', 'toast', '$sessionStorage', '$localStorage', '$rootScope',
      function(url, api, toast, $sessionStorage, $localStorage, $rootScope) {
        /**
         * Get current user
         * @param {function} callback - request callback
         */
        this.getCurrent = function(callback) {
          api.get(
              url.user.current,
              {},
              function(data) {
                delete data['auth_key'];
                $rootScope.user = data;
                $rootScope.isLogged = true;

                callback(data);
              }
          )
        };

        /**
         * Login user
         * @param {string} email - user email
         * @param {string} password - user password
         * @param {boolean} remember - user password
         * @param {function} callback - request callback
         */
        this.login = function(email, password, remember, callback) {
          api.post(
              url.user.login,
              {
                email: email,
                password: password
              },
              function(data) {
                $sessionStorage.auth_key = data['auth_key'];
                if(remember) {
                  $localStorage.auth_key = data['auth_key'];
                }
                delete data['auth_key'];
                $rootScope.user = data;
                $rootScope.isLogged = true;

                callback();
              }
          );
        };

        /**
         * Logout user
         */
        this.logout = function() {
          $rootScope.isLogged = false;
          delete $rootScope.user;
          delete $sessionStorage.auth_key;
          delete $localStorage.auth_key;
        };

        /**
         * Get list of user roles
         * @param {function} callback - request callback
         */
        this.getRoleList = function(callback) {
          api.get(
              url.user.getRoleList,
              {},
              function(data) {
                callback(data);
              }
          )
        };

        /**
         * Get one user
         * @param {int} userId - user ID
         * @param {function} callback - request callback
         */
        this.getOne = function(userId, callback) {
          api.get(
              url.user.getOne,
              {
                id: userId
              },
              function(data) {
                callback(data);
              }
          )
        };

        /**
         * Get all user
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
              url.user.getAll,
              {
                sort: sort,
                page: currentPage - 1,
                size: pageSize,

                first_name: search.firstName,
                last_name: search.lastName,
                position: search.position,
                email: search.email,
                organization_id: search.organization,
                role: search.role
              },
              function(data) {
                callback(data);
              }
          )
        };

        /**
         * Create user
         * @param {string} firstName - user first name
         * @param {string} lastName - user last name
         * @param {string} position - user position
         * @param {string} email - user email
         * @param {base64} image - user avatar
         * @param {int} role - user role
         * @param {int} company - user company
         * @param {string} password - user password
         * @param {function} callback - request callback
         */
        this.create = function(firstName, lastName, position, email, image, role, company, password, callback) {
          api.post(
              url.user.create,
              {
                first_name: firstName,
                last_name: lastName,
                position: position,
                email: email,
                imageFile: image,
                role: role,
                eventIds: [],
                organization_id: company,
                password: password
              },
              function(data) {
                toast('success', 'User Created');
                callback(data);
              }
          );
        };

        /**
         * Update user
         * @param {int} userId - user ID
         * @param {string} firstName - user first name
         * @param {string} lastName - user last name
         * @param {string} position - user position
         * @param {string} email - user email
         * @param {base64} image - user avatar
         * @param {int} role - user role
         * @param {int} company - user company
         * @param {function} callback - request callback
         */
        this.update = function(req, callback) {
          api.put(
              url.user.update,
              req,
              function(data) {
                toast('success', 'User Updated');
                callback(data);
              }
          );
        };

        /**
         * delete user
         * @param {int} userId - user password
         * @param {function} callback - request callback
         */
        this.delete = function(userId, callback) {
          api.delete(
              url.user.remove,
              {
                id: userId
              },
              function() {
                toast('success', 'User Deleted');
                callback();
              }
          );
        }

        this.verifyEmail = function(req, callback) {
          api.post(
              url.user.verifyEmail,
              req,
              function(res) {
                toast('success', 'Check your email');
                callback(res);
              }
          );
        }

        this.changePassword = function(req, callback) {
          api.post(
            url.user.resetPassword,
            req,
            function(res) {
              toast('success', 'Password changed');
              callback(res);
            }
          )
        }

        this.unsubscribe = function(req, callback) {
          api.get(
            url.user.unsubscribe,
            req,
            function(res) {
              toast('success', res.error);
              callback(res);
            }
          )
        }

        this.checkUnsubscribe = function(req, callback) {
          api.get(
            url.user.checkUnsubscribe,
            req,
            function(res) {
              callback(res);
            }
          )
        }

      }
    ]);