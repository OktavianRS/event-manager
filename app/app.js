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

      'factory.url',
      'factory.toast',
      'factory.request',

      'model.user',
      'model.event',
      'model.company',
      'model.language',
      'model.location',
      'model.step',

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
          });

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

          .icon('file', 'images/icons/ic_file.svg')
          .icon('filePhoto', 'images/icons/ic_photo_file.svg')
          .icon('filePDF', 'images/icons/ic_pdf_file.svg')
          .icon('fileMusic', 'images/icons/ic_music_file.svg')

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
    }])
    //theme config
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
          if(!$sessionStorage.auth_key && state.name != 'login') {
            event.preventDefault();
            $state.go('login');
          }
        });

        $rootScope.isHeader = false;
        $rootScope.$on('$stateChangeSuccess', function() {
          console.log('state', $state.current.name);
          $rootScope.isHeader = $state.current.name != 'login';
        });
      }
    ]);