angular.module('factory.url', [])
    .factory('url', [
      function() {
        var baseUrl = 'http://192.168.0.114/api/web/v1/';
        //var baseUrl = 'http://event.vt-host.co.ua/backend/api/web/v1/';

        return {
          user: {
            current: baseUrl + 'site/auth',
            login: baseUrl + 'site/login',
            create: baseUrl + 'user/create',
            update: baseUrl + 'user/update',
            getOne: baseUrl + 'user/view',
            getAll: baseUrl + 'user/index',
            remove: baseUrl + 'user/delete',
            getRoleList: baseUrl + 'user/role'
          },
          company: {
            create: baseUrl + 'organization/create',
            update: baseUrl + 'organization/update',
            getOne: baseUrl + 'organization/view',
            getAll: baseUrl + 'organization/index',
            getAllList: baseUrl + 'organization/all-organization',
            remove: baseUrl + 'organization/delete'
          },
          event: {
            create: baseUrl + 'event/create',
            update: baseUrl + 'event/update',
            getOne: baseUrl + 'event/view',
            getAll: baseUrl + 'event/index',
            getAllList: baseUrl + 'event/all-event',
            remove: baseUrl + 'event/delete',
            addComment: baseUrl + 'comment/create',
            getComments: baseUrl + 'comment/index',
            getAttachments: baseUrl + 'attachment/index',
            uploadAllAttach: baseUrl + 'attachment/download-all',
            uploadOneAttach: baseUrl + 'attachment/download',
            removeOne: baseUrl + 'attachment/delete'
          },
          language: {
            create: baseUrl + 'language/create',
            update: baseUrl + 'language/update',
            getOne: baseUrl + 'language/view',
            getAll: baseUrl + 'language/index',
            getAllList: baseUrl + 'language/all',
            remove: baseUrl + 'language/delete'
          },
          location: {
            create: baseUrl + 'location/create',
            update: baseUrl + 'location/update',
            getOne: baseUrl + 'location/view',
            getAll: baseUrl + 'location/index',
            getAllList: baseUrl + 'location/all',
            remove: baseUrl + 'location/delete'
          },
          step: {
            getStep: baseUrl + 'event-generate/step',
            getTableType: baseUrl + 'event-generate/table-type',
            getTableParams: baseUrl + 'event-generate/table-param',
            getStepInfo: baseUrl + 'event-generate/step-info',
            generateTable: baseUrl + 'event-generate/generate'
          }
        }
      }
    ]);