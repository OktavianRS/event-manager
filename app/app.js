angular.module('eventManager', [
      'ngMaterial',
      'ui.router',
      'ngMessages',
      'flow',
      'ngImgCrop',
      'md.data.table',
      'datePicker',
      'uiGmapgoogle-maps',
      'materialCalendar',
      'md-steppers',
      'dndLists',
      'froala',
      'ngAnimate',
      'angular-loading-bar',
      'chart.js',
      'mdPickers',
      'angular-sortable-view',

      'factory.url',
      'factory.toast',
      'factory.request',

      'model.user',
      'model.event',
      'model.company',
      'model.language',
      'model.location',
      'model.step',
      'model.panel',
      'model.mailer',
      'model.crud',
      'model.template',
      'model.list',
      'model.campaign',
      'model.role',

      'components.confirm-password',
      'components.lower-case-input',
      'components.validDate',
      'component.previousPage',
      'components.footer',
      'components.sidenav',
      'components.header',
      'components.locationModal',
      'components.languageModal',
      'components.homeEventCard',
      'components.homeAdmin',
      'components.homeCompany',
      'components.stepper',
      'components.stepTableGenerator',
      'components.stepModelGenerator',
      'components.stepControllerGenerator',
      'components.stepTableGeneratorField',
      'components.mailerToolbar',
      'components.templateModal',
      'components.listsModal',

      'components.checkboxesItem',
      'components.checkboxesView',
      'components.formItem',
      'components.formItemsContainer',
      'components.formView',
      'components.inputItem',
      'components.inputView',
      'components.matrixItem',
      'components.matrixView',
      'components.radioButtonItem',
      'components.radioButtonView',
      'components.textareaItem',
      'components.textareaView',


    ])
    //routing config
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('home', {
            url: "/home",
            templateUrl: "templates/home/home.html",
            controller: "homeCtrl"
          })
          .state('login', {
            url: "/login",
            templateUrl: "templates/login/login.html",
            controller: "loginCtrl"
          })
          .state('profile', {
            url: "/profile",
            templateUrl: "templates/profile/profile.html",
            controller: "profileCtrl"
          })
          .state('passwordReset', {
            url: "/reset:token",
            templateUrl: "templates/passwordReset/passwordReset.html",
            controller: "passwordResetCtrl"
          })

          ////////Users
          .state('addUser', {
            url: "/user/add",
            templateUrl: "templates/users/add/add.html",
            controller: "addUserCtrl"
          })
          .state('listUser', {
            url: "/user/list",
            templateUrl: "templates/users/list/list.html",
            controller: "listUserCtrl"
          })
          .state('oneUser', {
            url: "/user/:userId",
            templateUrl: "templates/users/one/one.html",
            controller: "oneUserCtrl"
          })
          .state('updateUser', {
            url: "/user/:userId/update",
            templateUrl: "templates/users/add/add.html",
            controller: "updateUserCtrl"
          })

          ////////Company
          .state('addCompany', {
            url: "/company/add",
            templateUrl: "templates/organizations/add/add.html",
            controller: "addOrganizationCtrl"
          })
          .state('listCompany', {
            url: "/company/list",
            templateUrl: "templates/organizations/list/list.html",
            controller: "listOrganizationCtrl"
          })
          .state('company', {
            url: "/company/:companyId",
            template: "<ui-view></ui-view>",
            controller: "companyCtrl"
          })
          .state('company.oneCompany', {
            url: "/view",
            templateUrl: "templates/organizations/one/one.html",
            controller: "oneOrganizationCtrl"
          })
          .state('company.updateCompany', {
            url: "/update",
            templateUrl: "templates/organizations/add/add.html",
            controller: "updateOrganizationCtrl"
          })

          ////////Event
          .state('addEvent', {
            url: "/event/add",
            templateUrl: "templates/events/add/add.html",
            controller: "addEventCtrl"
          })
          .state('listEvent', {
            url: "/event/list",
            templateUrl: "templates/events/list/list.html",
            controller: "listEventCtrl"
          })
          .state('oneEvent', {
            url: "/event/:eventId",
            templateUrl: "templates/events/one/one.html",
            controller: "oneEventCtrl"
          })
          .state('updateEvent', {
            url: "/event/:eventId/update",
            templateUrl: "templates/events/add/add.html",
            controller: "updateEventCtrl"
          })
          .state('stepsCreator', {
            url: "/event/:eventId/stepsCreator",
            templateUrl: "templates/events/stepsCreator/stepsCreator.html",
            controller: "stepsCreatorCtrl"
          })
          .state('eventTable', {
            url: "/event/:eventId/eventTable",
            templateUrl: "templates/events/eventTable/eventTable.html",
            controller: "eventTableCtrl"
          })
          .state('panelSearch', {
            url: "/event/:eventId/panelSearch",
            templateUrl: "templates/events/panelSearch/panelSearch.html",
            controller: "panelSearchCtrl"
          })
          .state('role', {
            url: '/event/:eventId/role',
            templateUrl: "templates/role/role.html",
            controller: 'roleCtrl'
          })
          .state('formGenerator', {
            url: '/event/:eventId/role/:roleId',
            templateUrl: 'templates/role/formGenerator/formGenerator.html',
            controller: 'formGenerator'
          })
          .state('importTable', {
            url: '/event/:eventId/import',
            templateUrl: "templates/events/importTable/importTable.html",
            controller: 'importTableCtrl'
          })

          ////////Language
          .state('addLanguage', {
            url: "/language/add",
            templateUrl: "templates/languages/add/add.html",
            controller: "addLanguageCtrl"
          })
          .state('listLanguage', {
            url: "/language/list",
            templateUrl: "templates/languages/list/list.html",
            controller: "listLanguageCtrl"
          })
          .state('oneLanguage', {
            url: "/language/:languageId",
            templateUrl: "templates/languages/one/one.html",
            controller: "oneLanguageCtrl"
          })
          .state('updateLanguage', {
            url: "/language/:languageId/update",
            templateUrl: "templates/languages/add/add.html",
            controller: "updateLanguageCtrl"
          })

          ////////Location
          .state('addLocation', {
            url: "/location/add",
            templateUrl: "templates/locations/add/add.html",
            controller: "addLocationCtrl"
          })
          .state('listLocation', {
            url: "/location/list",
            templateUrl: "templates/locations/list/list.html",
            controller: "listLocationCtrl"
          })
          .state('oneLocation', {
            url: "/location/:locationId",
            templateUrl: "templates/locations/one/one.html",
            controller: "oneLocationCtrl"
          })
          .state('updateLocation', {
            url: "/location/:locationId/update",
            templateUrl: "templates/locations/add/add.html",
            controller: "updateLocationCtrl"
          })


          //mailer
          .state('mailerEmails', {
            url: "/mailer/emails",
            templateUrl: "templates/mailer/emails/mailerEmails.html",
            controller: "mailerEmailsCtrl"
          })

          .state('mailerLists', {
            url: "/mailer/Lists",
            templateUrl: "templates/mailer/lists/mailerLists.html",
            controller: "mailerListsCtrl"
          })

          .state('mailerCampaigns', {
            url: "/mailer/campaigns",
            templateUrl: "templates/mailer/campaigns/mailerCampaigns.html",
            controller: "mailerCampaignsCtrl"
          })

          .state('mailerTemplates', {
            url: "/mailer/templates",
            templateUrl: "templates/mailer/templates/mailerTemplates.html",
            controller: "mailerTemplatesCtrl"
          })

          .state('mailerTemplate', {
            url: "/mailer/templates/template/:id/:rec",
            templateUrl: "templates/mailer/template/mailerTemplate.html",
            controller: "mailerTemplateCtrl"
          })

          .state('mailerList', {
            url: "/mailer/lists/list/:id",
            templateUrl: "templates/mailer/list/mailerList.html",
            controller: "mailerListCtrl"
          })

          .state('mailerReports', {
            url: "/mailer/reports/:queueId",
            templateUrl: "templates/mailer/reports/mailerReports.html",
            controller: "mailerReportsCtrl"
          })

          .state('mailer', {
            url: "/mailer",
            templateUrl: "templates/mailer/mailer.html"
          })

          .state('mailerCampaignAdd', {
            url: "/mailer/campaigns/edit/:id",
            templateUrl: "templates/mailer/campaignAdd/campaignAdd.html",
            controller: "campaignAddCtrl"
          })

          .state('mailerQueue', {
            url: '/mailer/queue',
            templateUrl: 'templates/mailer/queue/queueMailer.html',
            controller: 'queueMailerCtrl'
          })

          .state('unsubscribe', {
            url: '/unsubscribe',
            templateUrl: 'templates/unsubscribe/unsubscribe.html',
            controller: 'unsubscribeCtrl'
          })


      //rerouting
      $urlRouterProvider.otherwise('/login');
    }])
    //icon config (aliases)
    .config(['$mdIconProvider', function($mdIconProvider) {
      $mdIconProvider
          .icon('add', 'images/icons/ic_add.svg')
          .icon('addPhoto', 'images/icons/ic_add_photo.svg')
          .icon('addUsers', 'images/icons/ic_person_add.svg')
          .icon('attachment', 'images/icons/ic_attachment.svg')
          .icon('arrowDown', 'images/icons/ic_arrow_down.svg')
          .icon('arrowRight', 'images/icons/ic_arrow_right.svg')
          .icon('arrowLeft', 'images/icons/ic_arrow_left.svg')
          .icon('close', 'images/icons/ic_close.svg')
          .icon('cloudUpload', 'images/icons/ic_cloud_download.svg')
          .icon('data', 'images/icons/ic_no_data.svg')
          .icon('done', 'images/icons/ic_check_circle.svg')
          .icon('delete', 'images/icons/ic_delete.svg')
          .icon('edit', 'images/icons/ic_edit.svg')
          .icon('error', 'images/icons/ic_error.svg')
          .icon('refresh', 'images/icons/refresh.svg')
          .icon('filter', 'images/icons/filter.svg')
          .icon('backup', 'images/icons/backup.svg')
          .icon('expandLess', 'images/icons/expand_less.svg')
          .icon('expandMore', 'images/icons/expand_more.svg')

          .icon('file', 'images/icons/ic_file.svg')
          .icon('filePhoto', 'images/icons/ic_photo_file.svg')
          .icon('filePDF', 'images/icons/ic_pdf_file.svg')
          .icon('fileMusic', 'images/icons/ic_music_file.svg')
          .icon('import_export', 'images/icons/import_export.svg')

          .icon('info', 'images/icons/ic_info.svg')
          .icon('list', 'images/icons/ic_view_list.svg')
          .icon('logout', 'images/icons/ic_exit_to_app.svg')
          .icon('menu', 'images/icons/ic_menu.svg')
          .icon('user', 'images/icons/ic_person.svg')
          .icon('search', 'images/icons/ic_search.svg')
          .icon('view', 'images/icons/ic_eye.svg')
          .icon('warning', 'images/icons/ic_warning.svg')
          .icon('back', 'images/icons/ic_arrow_back.svg')
          .icon('group', 'images/icons/ic_people_black_24px.svg')
          .icon('event', 'images/icons/ic_event_note_black_24px.svg')
          .icon('business', 'images/icons/ic_business_black_24px.svg')
          .icon('language', 'images/icons/ic_language_black_24px.svg')
          .icon('edit-location', 'images/icons/ic_edit_location_black_24px.svg')
          .icon('event-available', 'images/icons/ic_event_available_black_24px.svg')
          .icon('home', 'images/icons/ic_home_white_24px.svg')
          .icon('notifications', 'images/icons/ic_notifications_white_24px.svg')
          .icon('archive', 'images/icons/ic_archive_white_24px.svg')
          .icon('assignment', 'images/icons/ic_assignment_white_24px.svg')
          .icon('copy', 'images/icons/ic_content_copy_black_24px.svg')
          .icon('upload', 'images/icons/ic_file_upload_black_24px.svg')
          .icon('settings', 'images/icons/ic_settings_black_24px.svg')
          .icon('mail', 'images/icons/ic_mail_outline_white_24px.svg')
          .icon('split', 'images/icons/split.svg')
          .icon('date', 'images/icons/date.svg')
          .icon('time', 'images/icons/time.svg')
          .icon('location-city', 'images/icons/location.svg')
          .icon('phone', 'images/icons/iphone.svg')
          .icon('comment', 'images/icons/comment.svg')
          .icon('replyAll', 'images/icons/reply_all.svg')

          //mailer icons

    }])
    //theme config
    .service('Utils', Utils)
    .config(['$mdThemingProvider', function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('cyan');
    }])
    //map config
    .config(['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
      GoogleMapApiProviders.configure({
        china: true
      });
    }])
    //website start
    .run(['$sessionStorage', '$localStorage', '$rootScope', '$state', '$stateParams', 'userModel',
      function($sessionStorage, $localStorage, $rootScope, $state, $stateParams, userModel) {
        //save state params for all states
        $rootScope.stateParams = $stateParams;
        //$sessionStorage.auth_key = '1234567890';
        //load user if user is logged
        if($localStorage.auth_key) {
          $sessionStorage.auth_key = $localStorage.auth_key;
        }
        if($sessionStorage.auth_key) {
          $rootScope.isLogged = true;
          userModel.getCurrent(function() {
          });
        } else {
            $state.go('login');
        }

        $rootScope.$on('$stateChangeStart', function(event, state, params) {
          if(state.name === 'passwordReset' || state.name === 'unsubscribe'){

          } else if(!$sessionStorage.auth_key && state.name !== 'login') {
            event.preventDefault();
            $state.go('login');
          }
        });

        $rootScope.isHeader = false;
        $rootScope.$on('$stateChangeSuccess', function() {
          $rootScope.isHeader = $state.current.name != 'login';
          $state.current.name === 'passwordReset' ? $rootScope.isHeader = false : false;
          $state.current.name === 'unsubscribe' ? $rootScope.isHeader = false : false;
        });
      }
    ]);

    function Utils() {}

    Utils.prototype.extend = function(dest, src) {
      Object.keys(src).forEach(function(key) {
        if(!dest.hasOwnProperty(key)) {
          dest[key] = src[key];
        } else if(typeof src[key] === 'object') {
          this.extend(dest[key], src[key]);
        }
      }.bind(this));

      return dest;
    };