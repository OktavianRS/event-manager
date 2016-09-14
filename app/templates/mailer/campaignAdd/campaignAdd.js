angular.module('eventManager')
    .controller('campaignAddCtrl', ['$scope', 'campaignModel', 'listModel', 'templateModel', 'userModel', 'crudModel', '$state', '$mdDialog',
      function($scope, campaignModel, listModel, templateModel, userModel, crudModel, $state, $mdDialog) {
        if(!$scope.stateParams.id) {
          $scope.modePage = "create";
        } else {
          $scope.modePage = "edit";
        }

        $scope.errorEmail = true;
        $scope.fromEmail = null;

        $scope.lists = [];
        $scope.templates = [];

        $scope.listSortBy = '-created_at';
        $scope.templateSortBy = '-created_at';
        $scope.listSetting = {
          show: 10,
          attr: 'created_at',
          order: 'desc',
          current: 1,
          total: 0,
          totalPage: 0
        };
        $scope.templateSetting = {
          show: 10,
          attr: 'created_at',
          order: 'desc',
          current: 1,
          total: 0,
          totalPage: 0
        };

        $scope.campaign = {
          listId: null,
          subject: null,
          fromName: null,
          fromEmail: null,
          templateId: null,
          campaignName: null
        };

        if($scope.modePage == "edit") {
          campaignModel.getOne($scope.stateParams.id, function(data) {
            data = data.model;
            $scope.campaign = {
              templateId: data.template_id,
              listId: data.list_id,
              subject: data.subject,
              fromName: data.from_name,
              fromEmail: data.from_email,
              campaignName: data.name
            };
            $scope.fromEmail = data.from_email;
            if(data.list) {
              $scope.campaign.listId = data.list.id;
              $scope.campaign.count = data.list.count;
            }
            if(data.template) {
              $scope.campaign.templateId = data.template.id;
            }
            console.log($scope.campaign);
          })
        }

        $scope.changeSort = function(sort, array) {
          if(sort[0] == '-') {
            $scope[array].attr = sort.slice(1);
            $scope[array].order = 'desc';
          } else {
            $scope[array].attr = sort;
            $scope[array].order = 'asc';
          }
          if(array == 'listSetting') {
            $scope.getLists();
          } else {
            $scope.getTemplates();
          }
        };

        $scope.prev = function(array) {
          $scope[array].current--;
          if(array == 'listSetting') {
            $scope.getLists();
          } else {
            $scope.getTemplates();
          }
        };

        $scope.next = function(array) {
          $scope[array].current++;
          if(array == 'listSetting') {
            $scope.getLists();
          } else {
            $scope.getTemplates();
          }
        };

        $scope.getLists = function() {
          crudModel.Index('list', {},
              function(data) {
                $scope.lists = data.model;
              }
          )
        };
        $scope.getLists();

        $scope.getTemplates = function() {
          crudModel.Index('template', {},
              function(data) {
                $scope.templates = data.model;
              }
          )
        };
        $scope.getTemplates();

        $scope.getEmails = function() {
          crudModel.Index('email', {},
              function(data) {
                $scope.emails = data.model;
              }
          )
        };
        $scope.getEmails();

        $scope.querySearch = function(query) {
          return userModel.getUsedEmails(query).promise;
        };
        $scope.viewTemplate = function(templateId, ev) {
          $mdDialog.show({
            controller: "templateModalCtrl",
            templateUrl: 'components/templateModal/templateModal.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
              templateId: templateId
            }
          });

        };

        $scope.view = function(listId, ev){

          $mdDialog.show({
            controller: "listModalCtrl",
            templateUrl: 'components/listModal/listModal.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
              listId: listId
            }
          });
        };

        $scope.save = function() {
          console.log($scope.campaign);
          if($scope.modePage == "create") {
            campaignModel.create(
                {
                  name: $scope.campaign.campaignName,
                  list_id: $scope.campaign.listId,
                  email_id: $scope.campaign.fromEmail.id,
                  template_id: $scope.campaign.templateId,
                  from_name: $scope.campaign.fromName,
                  from_email: $scope.campaign.fromEmail.name,
                  subject: $scope.campaign.subject
                },
                function(data) {
                  $state.go('mailerCampaignAdd', {id: data.id});
                }
            )
          } else {
            campaignModel.update(
                {
                  id: $scope.stateParams.id,
                  name: $scope.campaign.campaignName,
                  list_id: $scope.campaign.listId,
                  email_id: $scope.campaign.fromEmail.id,
                  template_id: $scope.campaign.templateId,
                  from_name: $scope.campaign.fromName,
                  from_email: $scope.campaign.fromEmail.name,
                  subject: $scope.campaign.subject
                },
                function() {
                }
            )
          }
        };

        $scope.send = function() {
          campaignModel.update(
                {
                  id: $scope.stateParams.id,
                  name: $scope.campaign.campaignName,
                  list_id: $scope.campaign.listId,
                  email_id: $scope.campaign.fromEmail.id,
                  template_id: $scope.campaign.templateId,
                  from_name: $scope.campaign.fromName,
                  from_email: $scope.campaign.fromEmail.name,
                  subject: $scope.campaign.subject
                },
              function() {
                campaignModel.send($scope.stateParams.id, function() {
                  $state.go('reports');
                })
              }
          )

        }
      }
    ]);