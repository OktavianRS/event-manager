angular.module('factory.url', [])
    .factory('url', [
      function() {

        //dev
        // var domainConfig = 'http://192.168.0.109';
        // var domainConfig = 'http://event.vt-host.co.ua/backend';
        var domainConfig = 'http://28302e37.ngrok.io';


        var baseUrl = domainConfig + '/api/web/v1/';
        var baseMailerUrl = domainConfig + '/api/web/mailer/';


        return {
          baseUrl: baseUrl,
          baseMailerUrl: baseMailerUrl,
          user: {
            current: baseUrl + 'site/auth',
            login: baseUrl + 'site/login',
            create: baseUrl + 'user/create',
            update: baseUrl + 'user/update',
            getOne: baseUrl + 'user/view',
            getAll: baseUrl + 'user/index',
            remove: baseUrl + 'user/delete',
            getRoleList: baseUrl + 'user/role',
            verifyEmail: baseMailerUrl + 'site/request-password-reset',
            resetPassword: baseMailerUrl + 'site/reset-password',
            unsubscribe: baseMailerUrl + 'report/unsubscribe',
            checkUnsubscribe: baseMailerUrl + 'report/check-unsubscribe'
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
            generateTable: baseUrl + 'event-generate/generate',
            rollBack: baseUrl + 'event-generate/roll-back'
          },
          panel: {
            getAttributeLabels: baseUrl + 'panel/attribute-labels',
            getIndex: baseUrl + 'panel/index',
            createField: baseUrl + 'panel/create',
            updateField: baseUrl + 'panel/update',
            deleteField: baseUrl + 'panel/delete',
            getIndexSearch: baseUrl + 'panel-search/index',
            createSearch: baseUrl + 'panel-search/create',
            updateSearch: baseUrl + 'panel-search/update',
            deleteSearch: baseUrl + 'panel-search/delete',
            allByEvent: baseUrl + 'panel-search/all-by-event',
            getFieldSettings: baseUrl + 'field-setting/index',
            updateFieldSettings: baseUrl + 'field-setting/update',
            export: baseUrl + 'panel/export',
            import: baseUrl + 'panel/import'
          },
          template: {
            recipientInsert: baseMailerUrl + 'template/recipient-insert',
            uploadImage: baseMailerUrl + 'template/upload-image'
          },
          list: {
            create: baseMailerUrl + 'subscriber/create',
            delete: baseMailerUrl + 'subscriber/delete',
            getAll: baseMailerUrl + 'subscriber/index',
            addSubscriber: baseMailerUrl + 'subscriber/create',
            getOne: baseMailerUrl + 'subscriber/index',
            deleteSubscriber: baseMailerUrl + 'subscriber/delete',
            export: baseMailerUrl + 'list/export',
            import: baseMailerUrl + 'list/import',
            merge: baseMailerUrl + 'subscriber/add-from-list',
            copySubscriber: baseMailerUrl + 'subscriber/copy-to-list',
            moveSubscriber: baseMailerUrl + 'subscriber/move-to-list',
            addSubsFromEvent: baseMailerUrl + 'subscriber/add-from-event',
            getAllForMailer: baseMailerUrl + 'list/event-list'
          },
          campaign: {
            getAll: baseMailerUrl + 'campaign/all',
            create: baseMailerUrl + 'campaign/create',
            delete: baseMailerUrl + 'campaign/delete',
            getOne: baseMailerUrl + 'campaign/view',
            update: baseMailerUrl + 'campaign/update',
            send: baseMailerUrl + 'campaign/send',
            unsubscribe: baseMailerUrl + 'unsubscribe/save',
            geAllReports: baseMailerUrl + 'campaign/get-distributions',
            deleteReports: baseMailerUrl + 'campaign/delete-distributions',
            getOneReports: baseMailerUrl + 'campaign/distribution'
          },
          role: {
            setRole: baseUrl + 'step/set-role-step',
            getRole: baseUrl + 'step/get-role-step'
          },
          roleStep: {
            create: baseUrl + 'step/create',
            getAll: baseUrl + 'step/index',
            getCurrent: baseUrl + 'role-step/index',
          },
        }
      }
    ]);