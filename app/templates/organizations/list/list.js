angular.module('eventManager')
    .controller('listOrganizationCtrl', ['$scope', 'companyModel', '$state', '$mdDialog',
      function($scope, companyModel, $state,$mdDialog) {
        console.info('listOrganizationCtrl');
        $scope.companies = [];
        $scope.companySetting = {
          show: 10,
          attr: 'name',
          order: 4,
          current: 1,
          total: 0,
          totalPage: 0,
          search: {
            name: '',
            link: '',
            phone: ''
          }
        };

        $scope.getCompanies = function() {
          companyModel.getAll(
              $scope.companySetting.order,
              $scope.companySetting.attr,
              $scope.companySetting.current,
              $scope.companySetting.show,
              $scope.companySetting.search,
              function(data) {
                $scope.companies = data.model;
                $scope.companySetting.total = data.count;
              }
          );
        };
        $scope.getCompanies();

        $scope.showCompanyInfo = function(ev, companyId) {
          companyModel.getOne(companyId, function(data) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'components/viewCard/viewCard.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: false,
                locals: {
                  companyInfo: data.model
                }
              });
          });
        }

        function DialogController($scope, $mdDialog, companyInfo) {
          $scope.data = companyInfo;
          $scope.hide = function() {
            $mdDialog.hide();
          };
          $scope.cancel = function() {
            $mdDialog.cancel();
          };
          $scope.answer = function(answer) {
            $mdDialog.hide(answer);
          };
        }

        $scope.deleteCompany = function(id) {
          companyModel.delete(id, function() {
            $scope.getCompanies();
          })
        };

        $scope.onReorderCompany = function(sort) {
          if(sort[0] == '-') {
            $scope.companySetting.attr = sort.slice(1);
            $scope.companySetting.order = 3;
          } else {
            $scope.companySetting.attr = sort;
            $scope.companySetting.order = 4;
          }
          $scope.getCompanies();
        };

        $scope.onPaginateCompany = function(page, pageSize) {
          $scope.companySetting.currentPage = page;
          $scope.companySetting.show = pageSize;
          $scope.getCompanies();
        };

        $scope.searchCompany = function(name, searchModel) {
          $scope.companySetting.search[name] = searchModel;
          $scope.getCompanies();
        };
      }
    ]);